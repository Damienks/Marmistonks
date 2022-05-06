import React, { createRef, FC, Fragment, LegacyRef, useEffect, useState } from "react"
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from "@firebase/auth";
import { app } from '../src/Database'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { clearUserMessages, updateUserEmail, updateUserName, updateUserPassword } from "../actions/user.actions";
import Alert from "./Alert";
import { useAppDispatch } from "../hooks/AppDsipatch";


const auth = getAuth(app);
const fileInputRef:LegacyRef<HTMLInputElement> = createRef();

const FadeIn = styled.div`animation: 0.8s ${keyframes`${fadeIn}`}`

const UserProfile:FC = () =>{

    // Page loading
    const [IsLoading, setIsLoading] = useState<boolean>(true);

    // Form values
    const [FieldUserName, setFieldUserName] = useState<string>('');
    const [FieldUserEmail, setFieldUserEmail] = useState<string>('');
    const [FieldUserActualPassword, setFielduserActualPassword] = useState<string>('');
    const [FieldUserNewPassword, setFielduserNewPassword] = useState<string>('');
    const [ChangePassword, setChangePassword] = useState<boolean>(false);

    // User values
    const [userFromAuth, loading] = useAuthState(auth);
    const User = useSelector((state:any) => state.userReducer);
    const UserAlertMessages = User.alertMessages;
    const HasLoadedUser:boolean = !loading && userFromAuth != null && User != null && User.displayName != null;

    // Account creation date
    const UserCreatedAt:string = User != null ? new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(User.metadata.createdAt) : '';

    // Dispatch
    const dispatch = useAppDispatch();

    useEffect(() =>{
        setIsLoading(loading);
        if(loading === false){
            setFieldUserName(User.displayName)
            setFieldUserEmail(User.email)

            if(User.successUpdatePassword){
                setFielduserActualPassword("");
                setFielduserNewPassword("");
            }
        }
    },[loading, User]);

    const handleNameChange:React.ChangeEventHandler<HTMLInputElement> = (e) => setFieldUserName(e.target.value);

    const handleEmailChange:React.ChangeEventHandler<HTMLInputElement> = (e) => setFieldUserEmail(e.target.value);

    const handleProfilePicClick:React.MouseEventHandler<HTMLDivElement> = () => fileInputRef.current.click();

    const handlePencilClick:React.MouseEventHandler<HTMLButtonElement> = (e) => e.preventDefault();

    const handleSubmit:React.FormEventHandler<HTMLFormElement> = (e) => e.preventDefault();

    const handleSubmitFromButton:React.MouseEventHandler<HTMLButtonElement> = () => {
        // Clear alert messages
        if(User.alertMessages != null)
            dispatch(clearUserMessages())

        // Update user displayName
        if(FieldUserName.trim() !== '' && FieldUserName !== User.displayName)          
            dispatch(updateUserName(FieldUserName));

        // Update user e-mail
        if(FieldUserEmail.trim() !== '' && FieldUserEmail !== User.email)
            dispatch(updateUserEmail(FieldUserEmail));

        // Update user password
        if(FieldUserActualPassword.trim() !== '' && FieldUserNewPassword.trim() !== '')
            dispatch(updateUserPassword(FieldUserActualPassword, FieldUserNewPassword));
    }
    
    return(
        <Fragment>
            {!IsLoading && HasLoadedUser &&
            <FadeIn>
                <form className='w-100 flex flex-col align-items-center pb-5' onSubmit={ handleSubmit }>
                    <h2 className='signika text-3xl mb-5'>Mon profil</h2>
                    <div className='w-32 h-32 relative rounded-full bg-tertiary m-auto border-4 border-dashed border-red-400 flex justify-center align-items-center' onClick={ handleProfilePicClick }>
                        <span className='text-6xl cursor-default'>{ FieldUserName.charAt(0).toUpperCase() }</span>
                        <button className='btn bg-secondary cursor-pointer absolute rounded-full w-7 h-7 p-0' style={{right: '8px', bottom:'0px'}} onClick={ handlePencilClick }>
                            <FontAwesomeIcon icon={faPencilAlt} className='text-white text-xs' />
                        </button>
                        <input type='file' multiple={ false } accept='image/png, image/jpeg' className='hidden' ref={ fileInputRef } />
                    </div>
                    <input required className='border-1 border-gray-200 focus:outline-none focus:border-red-400 p-1 rounded apperance-none text-center text-2xl border-b mt-3' type='text' value={ FieldUserName } onChange={ handleNameChange } />
                    <p className='text-sm mt-2.5'>Inscrit depuis le { UserCreatedAt }</p>
                    { UserAlertMessages && UserAlertMessages.successUpdateUsername &&
                        <Alert message={ UserAlertMessages.successUpdateUsername } className="mt-2 bg-green-100 border-green-400 text-green-700" />
                    }
                    <div className="w-50 mt-5">
                        <label className='w-100'>Adresse e-mail : </label>
                        <input required type='email' className='w-100 text-left border-1 border-gray-200 focus:outline-none focus:border-red-400 p-2 rounded apperance-none text-xl border-b mt-3' value={ FieldUserEmail } onChange={ handleEmailChange }  />
                        { UserAlertMessages && UserAlertMessages.successUpdateEmail &&
                            <Alert message={ UserAlertMessages.successUpdateEmail } className="mt-2 bg-green-100 border-green-400 text-green-700" />
                        }
                        { UserAlertMessages && UserAlertMessages.errorUpdateEmail &&
                            <Alert message={ UserAlertMessages.errorUpdateEmail } type='error' className="mt-2 bg-red-100 border-red-400 text-red-700" />
                        }
                    </div>
                    <div className={"w-50 mt-5 mb-3" + (ChangePassword ? " active" : " hidden") }>
                        { UserAlertMessages && UserAlertMessages.successUpdatePassword &&
                            <Alert message={ UserAlertMessages.successUpdatePassword } className="mt-2 mb-2 bg-green-100 border-green-400 text-green-700" />
                        }
                        { UserAlertMessages && UserAlertMessages.errorUpdatePassword &&
                            <Alert message={ UserAlertMessages.errorUpdatePassword } type='error' className="mt-2 mb-2 bg-red-100 border-red-400 text-red-700" />
                        }
                        <label className='w-100'>Mot de passe actuel :</label>
                        <input className='w-100 text-left border-1 border-gray-200 focus:outline-none focus:border-red-400 p-2 rounded apperance-none text-xl border-b mt-2' value={ FieldUserActualPassword } type='password' onChange={ (e) => setFielduserActualPassword(e.target.value)  }  />
                        <label className='w-100 mt-3'>Nouveau mot de passe :</label>
                        <input className='w-100 text-left border-1 border-gray-200 focus:outline-none focus:border-red-400 p-2 rounded apperance-none text-xl border-b mt-2' value={ FieldUserNewPassword } type='password' onChange={ (e) => setFielduserNewPassword(e.target.value)  }  />
                    </div>
                    <button type='submit' className="w-1/5 mt-2 mb-2 shadow bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none text-red-400 font-bold py-2 px-4 rounded" onClick={ () => { setChangePassword(true) }}>
                        Changer mon mot de passe
                    </button>
                    <button type='submit' className="w-1/5 mt-2 shadow bg-red-400 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" onClick={ handleSubmitFromButton }>
                        Enregistrer
                    </button>
                </form>
            </FadeIn>
            }
        </Fragment>
    )
}

export default UserProfile