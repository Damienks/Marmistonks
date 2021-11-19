import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from '@firebase/auth';
import { app } from '../src/Database'

const auth = getAuth(app);

export const GET_USER = "GET_USER";
export const ADD_USER = "ADD_USER";

export const getUser = () =>{
    return (dispatch:any) =>{
        
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