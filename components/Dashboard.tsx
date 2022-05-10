import { getAuth } from "@firebase/auth";
import { FC, Fragment, useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { app } from "../src/Database";
import Form from "./Form"
import UserProfile from "./UserProfile";
import Spinner from './assets/Spinner'

interface DashboardProps{
    type:string
}

const auth = getAuth(app);

const Dashboard:FC<DashboardProps> = ({ type }) =>{
    
    const [IsLoading, setIsLoading] = useState<boolean>(true)

    // User values
    const [userFromAuth, loading] = useAuthState(auth);
    const User = useSelector((state:any) => state.userReducer);
    const HasLoadedUser:boolean = !loading && userFromAuth != null && User != null && User.displayName != null;

    if(type === 'login' && HasLoadedUser){
        // TODO : redirection home
    }

    useEffect(() =>{
        setIsLoading(loading);
    },[loading]);
    
    return(
        <Fragment>
            { !IsLoading &&
                <div className='container'>
                    <div className='rounded row bg-white p-20 justify-content-md-center'>
                        {/* No user connected : form type login displayed */}
                        {!HasLoadedUser && type ==='login' && <div className='col-5'><Form formType='login' /></div> }
                        {/* No user connected : form type account displayed */}
                        {!HasLoadedUser && type ==='account' && <div className='col-5'><Form formType='create-account' /></div> }
                        {/* User connected : informations displayed */}
                        {HasLoadedUser && type ==='account' && 
                            <UserProfile/>
                        }
                    </div>
                </div>
            }
            {IsLoading &&
                <div className='rounded row p-20 justify-content-md-center'>
                    <Spinner CssClass='color-secondary' />
                </div>
            }
        </Fragment>        
    )
}

export default Dashboard;