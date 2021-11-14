import { FC, Fragment } from "react"
import { useSelector } from "react-redux";
import Form from "./Form"

interface DashboardProps{
    type:string
}

const Dashboard:FC<DashboardProps> = ({ type }) =>{
    
  const User = useSelector((state:any) => state.userReducer);
  const UserLoggedIn:boolean = User != null ? Object.keys(User).length !== 0 : false;

    if(type === 'login' && UserLoggedIn){
        // TODO : redirection home
    }
    
    return(
        <Fragment>
            { <div className='container'>
                    <div className='rounded row bg-white p-20 justify-content-md-center'>
                        {/* No user connected : form type login displayed */}
                        {!UserLoggedIn && type ==='login' && <div className='col-5'><Form formType='login' /></div> }
                        {/* No user connected : form type account displayed */}
                        {!UserLoggedIn && type ==='account' && <div className='col-5'><Form formType='create-account' /></div> }
                        {/* User connected : informations displayed */}
                        {UserLoggedIn && type ==='account' && 
                            <h2 className='signika' >Mon compte</h2>
                        }
                    </div>
                </div>
            }
        </Fragment>        
    )
}

export default Dashboard;