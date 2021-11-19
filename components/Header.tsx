import { FC, Fragment, useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from './svgs/Logo';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux"
import { app } from '../src/Database'
import { getAuth, signOut } from "@firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth'
import { Dropdown } from "react-bootstrap";

const auth = getAuth(app);

const Header:FC = () =>{

    const [userFromAuth, loading] = useAuthState(auth)
    const [IsLoading, setIsLoading] = useState<boolean>(true);
    const User = useSelector((state:any) => state.userReducer);
    const HasLoadedUser:boolean = !loading && userFromAuth != null && User != null && User.displayName != null;

    const handleSignOut:React.MouseEventHandler<HTMLElement> | undefined = () => signOut(auth).catch((error) => console.log(error.code + ' : ' + error.message));

    useEffect(() =>{
        setIsLoading(loading);
    },[loading]);

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
                        {!HasLoadedUser &&
                            <a href='/login' className='btn bg-secondary'>
                                <span className='m-right-10'><FontAwesomeIcon icon={faUser} /></span> <span>Se connecter</span>
                            </a>
                        }
                        {HasLoadedUser &&
                            <Fragment>
                                <div className='w-100 flex justify-end cursor-pointer'>
                                    <Dropdown>
                                        <Dropdown.Toggle id="userProfile" variant="secondary"
                                        className='w-12 h-12 text-red-400 hover:text-red-400 bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 border-dashed border-red-400 border-2 hover:border-red-400 visited:border-red-400 rounded-full flex justify-center align-items-center'>
                                            {User.photoURL &&
                                                <img src={ User.photoURL } alt={ User.displayName } className='w-12 h-12 rounded-full' />
                                            }
                                            {!User.photoURL &&
                                                <span className='text-xl'>{ User.displayName.charAt(0).toUpperCase() }</span>
                                            }
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="dropdown-menu" aria-labelledby="userProfile">
                                            <Dropdown.Item href="/account"><span className='m-right-10'><FontAwesomeIcon icon={faUser} /></span><span>Mon profil</span></Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item onClick={ handleSignOut }>Se déconnecter</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
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