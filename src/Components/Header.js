import { Fragment } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'



const Header = ({ userId, userName, signOutEvent }) =>{

    return(
        <div className='header bg-white color-secondary m-bottom-20 p-20'>     
            {!userId &&
                <Link to='/login' className='btn bg-secondary'>
                    <span className='m-right-10'><FontAwesomeIcon icon={faUser} /></span> <span>Se connecter</span>
                </Link>
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