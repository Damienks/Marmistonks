import { FC, Fragment } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

interface HeaderProps{
    userId?: string,
    userName?: string
    signOutEvent?: () => void
}

const Header:FC<HeaderProps> = ({ userId, userName, signOutEvent }) =>{

    return(
        <div className='header bg-white color-secondary m-bottom-20 p-20'>     
            {!userId &&
                <a href='/login' className='btn bg-secondary'>
                    <span className='m-right-10'><FontAwesomeIcon icon={faUser} /></span> <span>Se connecter</span>
                </a>
            }
            {
                userId &&
                    <Fragment>
                        <span className='m-right-10'>Bonjour<strong> { ' ' + userName + ' !' } </strong></span>
                        <button className='btn bg-secondary' onClick={ signOutEvent }>
                        <span className='m-right-10'><FontAwesomeIcon icon={faUser} /></span><span>Se déconnecter</span>
                        </button>
                    </Fragment>
                    
            }
        </div>
    )

}

export default Header