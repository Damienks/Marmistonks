import React, { createRef, FC, Fragment, LegacyRef, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from "@firebase/auth";
import { app } from '../src/Database'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

const auth = getAuth(app);
const fileInputRef:LegacyRef<HTMLInputElement> = createRef();

const UserProfile:FC = () =>{

    // Page loading
    const [IsLoading, setIsLoading] = useState<boolean>(true);

    // Fields values
    const [FieldUserName, setFieldUserName] = useState<string>();

    // User values
    const [userFromAuth, loading] = useAuthState(auth);
    const User = useSelector((state:any) => state.userReducer);
    const HasLoadedUser:boolean = !loading && userFromAuth != null && User != null && User.displayName != null;

    // Account creation date
    const UserCreatedAt:string = User != null ? new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(User.metadata.createdAt) : '';

    useEffect(() =>{
        setIsLoading(loading);
        if(loading === false)
            setFieldUserName(User.displayName)
    },[loading, User]);

    const handleNameChange:React.ChangeEventHandler<HTMLInputElement> = (e) => setFieldUserName(e.target.value);

    const handleProfilePicClick:React.MouseEventHandler<HTMLDivElement> = () => fileInputRef.current.click();

    const handlePencilClick:React.MouseEventHandler<HTMLButtonElement> = (e) => e.preventDefault();

    const handleSubmit:React.FormEventHandler<HTMLFormElement> = (e) => e.preventDefault();

    const handleSubmitFromButton:React.MouseEventHandler<HTMLButtonElement> = (e) => {
        

    }
    
    return(
        <Fragment>
            {!IsLoading && HasLoadedUser &&
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
                <div className="w-50 mt-5">
                    <label className='w-100'>Adresse e-mail : </label>
                    <input required type='email' className='w-100 text-left border-1 border-gray-200 focus:outline-none focus:border-red-400 p-2 rounded apperance-none text-xl border-b mt-3' value={ User.email }  />
                </div>
                <div className="w-50 mt-5 mb-5">
                    <p className='w-100 font-bold text-lg mb-1'>Changer mon mot de passe </p>
                    <label className='w-100'>Mot de passe actuel :</label>
                    <input className='w-100 text-left border-1 border-gray-200 focus:outline-none focus:border-red-400 p-2 rounded apperance-none text-xl border-b mt-2' type='password'  />
                    <label className='w-100 mt-3'>Nouveau mot de passe :</label>
                    <input className='w-100 text-left border-1 border-gray-200 focus:outline-none focus:border-red-400 p-2 rounded apperance-none text-xl border-b mt-2' type='password'  />
                </div>
                <button type='submit' className="shadow bg-red-400 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" onClick={ handleSubmitFromButton }>
                    Enregistrer mon profil
                </button>
            </form>
            }
        </Fragment>
    )
}

export default UserProfile