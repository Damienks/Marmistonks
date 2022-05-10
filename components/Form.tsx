import React, { FC, Fragment, useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../src/Database'
import { createUser } from '../actions/user.actions'
import { useAppDispatch } from '../hooks/AppDsipatch';

interface FormProps{
    formType:string
}

const Form:FC<FormProps> = ({ formType }) =>{

    const [UserPseudo, setUserPseudo] = useState('')
    const [UserEmail, setUserEmail] = useState('')
    const [UserPassword, setUserPassword] = useState('')
    const dispatch = useAppDispatch();

    const isLoginFormType:boolean = formType === 'login'

    const handleSubmit:React.FormEventHandler<HTMLFormElement> | undefined = event => event.preventDefault()

    const handleLoginProcess = (loginType:string) =>{
        if(loginType !== "createAnAccount"){
            if(loginType === 'mail'){
                // TODO : dispatch reducer action "LOGIN_USER"
                // Connexion via E-mail
                if(UserEmail.trim() !== '' && UserPassword.trim() !== ''){
                    const auth = getAuth(app);
                    signInWithEmailAndPassword(auth, UserEmail, UserPassword)
                    .then(() => {
                        //handleUser('')
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        alert(errorCode + ' : ' + errorMessage)
                    });
                }
            }else{
                // Connexion via Facebook
                alert('Todo : Facebook connection')
            }
        }
    }

    const handleAccountCreationProcess = (e) =>{
        e.preventDefault();
        // Account creation
        if(UserPseudo.trim() !== '' && UserEmail.trim() !== '' && UserPassword.trim() !== '')
            dispatch(createUser(UserPseudo, UserEmail, UserPassword));
    }

    const handleUserPseudoChange:React.ChangeEventHandler<HTMLInputElement> | undefined = event => setUserPseudo(event.target.value)

    const handleUserMailChange:React.ChangeEventHandler<HTMLInputElement> | undefined = event => setUserEmail(event.target.value)

    const handleUserPasswordChange:React.ChangeEventHandler<HTMLInputElement> | undefined = event => setUserPassword(event.target.value)

    return (
        <div className='text-center'>
            <h3 className='signika text-2xl'>
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
                        <button className='col py-2 rounded bg-blue-600 hover:bg-blue-800 border-0 text-white w-100-p' onClick={ () => handleLoginProcess("fb") } type="submit"> Se connecter avec Facebook</button>
                    </div>
                </form>
            }
            <form className='form' onSubmit={ handleSubmit }>
                {
                    isLoginFormType &&
                    <Fragment>
                        <p className='no-margin'>ou</p>
                        <h3 className='signika text-2xl'>connectez-vous avec vos identifiants <br/><strong>Marmistonks</strong></h3>
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
            <a href={isLoginFormType ? '/account' : '/login'} className='w-100-p col btn bg-tertiary'> { isLoginFormType ? 'Créer un compte' : 'Se connecter'}</a>
        </div>
    );
    
}

export default Form;