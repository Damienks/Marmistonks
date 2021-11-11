import React, { Fragment, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


function Form({ formType, handleUser }) {

    const [UserPseudo, setUserPseudo] = useState('')
    const [UserEmail, setUserEmail] = useState('')
    const [UserPassword, setUserPassword] = useState('')

    const isLoginFormType = formType === 'login'

    const handleSubmit = (event) => event.preventDefault()

    const handleLoginProcess = (loginType) =>{
        if(loginType !== "createAnAccount"){
            if(loginType === 'mail'){
                // Connexion via E-mail
                if(UserEmail.trim() !== '' && UserPassword.trim() !== ''){
                    const auth = getAuth();
                    signInWithEmailAndPassword(auth, UserEmail, UserPassword)
                    .then(() => {
                        handleUser()
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

    const handleUserPseudoChange = event => setUserPseudo(event.target.value)

    const handleUserMailChange = event => setUserEmail(event.target.value)

    const handleUserPasswordChange = event => setUserPassword(event.target.value)

    return (
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