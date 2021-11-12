import React, { FC, Fragment, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { app } from '../src/Database'

interface FormProps{
    formType:string,
    setLoggedUseridEvent: (userId:string) => void
}

const Form:FC<FormProps> = ({ formType, setLoggedUseridEvent }) =>{

    const [UserPseudo, setUserPseudo] = useState('')
    const [UserEmail, setUserEmail] = useState('')
    const [UserPassword, setUserPassword] = useState('')
    const [IsLoading, setIsLoading] = useState<boolean>(false)

    const isLoginFormType = formType === 'login'

    const handleSubmit:React.FormEventHandler<HTMLFormElement> | undefined = event => event.preventDefault()

    const handleUser = (userName:string) =>{
        setIsLoading(true);
        getAuth(app).onAuthStateChanged(function(user:any) {
          if (user) {
            if(userName != null && userName.trim() !== ""){
              updateProfile(user, {
                  displayName : userName
              }).then(() => {
                setLoggedUseridEvent(user.auth.currentUser.uid)
                console.log(user.auth.currentUser.displayName)
              }).catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  alert(errorCode + ' : ' + errorMessage)
              });
              setIsLoading(false)
            }
            else{
                setLoggedUseridEvent(user.auth.currentUser.uid)
                setIsLoading(false)
            }
          } else {
            console.log('Aucun utilisateur connecté...')
            setIsLoading(false)
          }
        });
      }

    const handleLoginProcess = (loginType:string) =>{
        if(loginType !== "createAnAccount"){
            if(loginType === 'mail'){
                // Connexion via E-mail
                if(UserEmail.trim() !== '' && UserPassword.trim() !== ''){
                    const auth = getAuth(app);
                    signInWithEmailAndPassword(auth, UserEmail, UserPassword)
                    .then(() => {
                        handleUser('')
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        alert(errorCode + ' : ' + errorMessage)
                    });
                }
            }else{
                // Connexion via Facebook
                alert('Facebook')
            }
        }
    }

    const handleAccountCreationProcess = () =>{
        // Todo : création de compte
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, UserEmail, UserPassword)
        .then(() => {
            // Signed in 
            handleUser(UserPseudo)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode + ' : ' + errorMessage)
        });
    }

    const handleUserPseudoChange:React.ChangeEventHandler<HTMLInputElement> | undefined = event => setUserPseudo(event.target.value)

    const handleUserMailChange:React.ChangeEventHandler<HTMLInputElement> | undefined = event => setUserEmail(event.target.value)

    const handleUserPasswordChange:React.ChangeEventHandler<HTMLInputElement> | undefined = event => setUserPassword(event.target.value)

    return (
        !IsLoading &&
        <div className='text-center'>
            <h3 className='signika'>
                {
                    isLoginFormType 
                    ? 'Connectez-vous en un clic avec Facebook !'
                    : 'Créez un compte'
                }
            </h3>
            {
                isLoginFormType &&
                <form className="form" onSubmit={ handleSubmit }>
                    <div className='m-top-20 m-bottom-20'>
                        <button className='col btn btn-primary w-100-p' onClick={ () => handleLoginProcess("fb") } type="submit"> Se connecter avec Facebook</button>
                    </div>
                </form>
            }
            <form className='form' onSubmit={ handleSubmit }>
                {
                    isLoginFormType &&
                    <Fragment>
                        <p className='no-margin'>ou</p>
                        <h3 className='signika'>connectez-vous avec vos identifiants <br/><strong>Ma Boîte à Recettes</strong></h3>
                    </Fragment>
                }
                <div className='m-top-20 m-bottom-20'>
                    {
                        !isLoginFormType && <input type='text' required className='text-center form-control col m-bottom-15' placeholder='Votre pseudo' onChange={ handleUserPseudoChange } />
                    }
                    <input type='email' required className='text-center form-control col m-bottom-15' placeholder='Adresse e-mail (ex : marcdupont@gmail.com)' onChange={ handleUserMailChange } />
                    <input type='password' required className='text-center form-control col m-bottom-25' placeholder='Mot de passe' onChange={ handleUserPasswordChange } />
                    <button className='w-100-p btn bg-secondary' onClick={ !isLoginFormType ? handleAccountCreationProcess : () => handleLoginProcess('mail') } type="submit"> { isLoginFormType ? 'Se connecter' : 'Créer un compte'}</button>
                </div>
            </form>    
            <a href={isLoginFormType ? '/create-account' : '/login'} className='w-100-p col btn bg-tertiary'> { isLoginFormType ? 'Créer un compte' : 'Se connecter'}</a>
        </div>
    );
    
}

export default Form;