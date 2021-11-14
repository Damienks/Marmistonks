import { createUserWithEmailAndPassword, getAuth, updateProfile } from '@firebase/auth';
import { app } from '../src/Database'

const auth = getAuth(app);

export const GET_USER = "GET_USER";

export const getUser = () =>{
    return (dispatch:any) =>{
        
        auth.onAuthStateChanged(function(user:any) {
            if (user)
                dispatch({ type: GET_USER, payload: user });
        });
    }

}

export const createUser = (name:string, email:string, password:string) =>{
    return (dispatch:any) =>{
        // Create a firestore user using email and password
        if(email.trim() !== '' && password.trim() !== ''){
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCred) => {
                // Signed in 
                updateProfile(userCred.user, {
                    displayName : name
                }).then(() => {
                    // Dispatch GET_USER
                    dispatch({ type: GET_USER, payload: userCred.user });
                }).catch((error) => console.log(error.code + ' : ' + error.message));
            })
            .catch((err) => {
                console.log(err.code + ' : ' + err.message)
            });
        }
    }

}