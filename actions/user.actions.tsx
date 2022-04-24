import { createUserWithEmailAndPassword, EmailAuthProvider, getAuth, reauthenticateWithCredential, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile } from '@firebase/auth';
import { app } from '../src/Database'

const auth = getAuth(app);

export const GET_USER = "GET_USER";
export const ADD_USER = "ADD_USER";
export const UPDATE_USERNAME = "UPDATE_USERNAME";
export const UPDATE_USEREMAIL = "UPDATE_USEREMAIL";
export const UPDATE_USERPASSWORD = "UPDATE_USERPASSWORD";
export const UPDATE_USEREMAIL_ERROR = "UPDATE_USEREMAIL_ERROR";
export const UPDATE_USERPASSWORD_ERROR = "UPDATE_USERPASSWORD_ERROR";
export const CLEAR_USER_MESSAGES = "CLEAR_USER_MESSAGES";

export const getUser = () =>{
    return (dispatch:any) =>{
        // Get current user
        auth.onAuthStateChanged(function(user:any) {
            dispatch({ type: GET_USER, payload: user ? user : 'none' });
        });
    }
}

export const createUser = (name:string, email:string, password:string) =>{
    return (dispatch:any) =>{
        // Create a firestore user using email and password
        if(name.trim() !== '' && email.trim() !== '' && password.trim() !== ''){
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCred) => {
                // Signed in 
                updateProfile(userCred.user, {
                    displayName : name
                }).then(() => {
                    // Sin out then sing back in to get the updated user from auth (with displayName, etc)
                    signOut(auth).then(() => {
                        signInWithEmailAndPassword(auth, email, password)
                        .then(() => {
                            dispatch({ type: ADD_USER, payload: userCred.user});
                        })
                    }).catch((error) => console.log(error.code + ' : ' + error.message))
                    
                }).catch((error) => console.log(error.code + ' : ' + error.message));
            })
            .catch((err) => {
                console.log(err.code + ' : ' + err.message)
            });
        }
    }

}

export const updateUserName = (name:string) =>{
    return (dispatch:any) =>{
        // Update user displayName
        if(name.trim() !== '' && auth.currentUser != null){
            updateProfile(auth.currentUser, {
                displayName : name
            }).then(() => {
                dispatch({ type: UPDATE_USERNAME, payload: name});
            }).catch((error) => console.log(error.code + ' : ' + error.message));
        }
    }
}

// Update User e-mail
export const updateUserEmail = (email:string) =>{
    return (dispatch:any) =>{
        if(email.trim() !== '' && auth.currentUser != null){
            updateEmail(auth.currentUser, email).then(() => {
                // E-mail update
                dispatch({ type: UPDATE_USEREMAIL, payload: email});
            }).catch((error) => dispatch({ type: UPDATE_USEREMAIL_ERROR, payload: error.code }) );
        }
    }
}

// Update user password
export const updateUserPassword = (oldPassword:string, newPassword:string) =>{
    return (dispatch:any) =>{
        // Do we have currently authenticated user ?
        if(auth.currentUser != null && auth.currentUser.email != null){
            // Did the user entered his correct current password ?
            const credential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword);
            reauthenticateWithCredential(auth.currentUser, credential).then((userCred) =>{
                // If yes, we update his password
                updatePassword(userCred.user, newPassword).then(() => {
                    // Password updated
                    dispatch({ type: UPDATE_USERPASSWORD, payload: "Le mot de passe a bien été mis à jour."});
                }).catch((error) => dispatch({ type: UPDATE_USERPASSWORD_ERROR, payload: error.code }) );
            }).catch((error) => dispatch({ type: UPDATE_USERPASSWORD_ERROR, payload: error.code }) );
        }else{
            dispatch({ type: UPDATE_USERPASSWORD_ERROR, payload: "Password not updated - Correct user credentials couldn't be fetched." })
        }
    }
}

// Clear user errors
export const clearUserMessages = () =>{ return (dispatch:any) => dispatch({ type: CLEAR_USER_MESSAGES, payload: true }) };