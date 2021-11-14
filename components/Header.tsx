import { FC, Fragment, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from './svgs/Logo';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux"
import { app } from '../src/Database'
import { getAuth, signOut } from "@firebase/auth"

const Header:FC = () =>{

    const [IsLoading, setIsLoading] = useState<boolean>(false);
    const User = useSelector((state:any) => state.userReducer);
    const HasUser:boolean = User != null ? Object.keys(User).length !== 0 : false;

    const handleSignOut = () =>{
        const auth = getAuth(app);
        signOut(auth).then(() => {
            // Sign-out successful
            window.location.reload();
        }).catch((error) => console.log(error.code + ' : ' + error.message));
    }

    return(
        <Fragment>
            <header className='header bg-white color-secondary m-bottom-20 p-20'>
                <div className='grid grid-flow-col grid-cols-2'>
                    <div className='flex flex-wrap content-center'>
                        <div className='menu-toggle'>

                        </div>
                        <a href='/' className='m-right-20'>
                            <Logo width={ 140 } height={ 30 } />
                        </a>
                    </div>
                    {!IsLoading &&
                        <div className='text-right'>
                        {!HasUser &&
                            <a href='/login' className='btn bg-secondary'>
                                <span className='m-right-10'><FontAwesomeIcon icon={faUser} /></span> <span>Se connecter</span>
                            </a>
                        }
                        {HasUser &&
                            <Fragment>
                                <span className='m-right-10'>Bonjour<strong> { ' ' + User.displayName + ' !' } </strong></span>
                                <a  href='/account' className='btn bg-secondary m-right-10' >
                                    <span className='m-right-10'><FontAwesomeIcon icon={faUser} /></span><span>Mon compte</span>
                                </a>
                                <button className='btn bg-tertiary' onClick={ handleSignOut }>
                                    <span>Se déconnecter</span>
                                </button>
                            </Fragment>
                        }
                        </div>
                    }
                </div>
            </header>
        </Fragment>
    )

}

export default Header