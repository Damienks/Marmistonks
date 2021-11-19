import { FC, Fragment, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import Form from "./Form"
import UserProfile from "./UserProfile";

interface DashboardProps{
    type:string
}

const Dashboard:FC<DashboardProps> = ({ type }) =>{
    
    const [IsLoading, setIsLoading] = useState<boolean>(true)
    const User = useSelector((state:any) => state.userReducer);
    const HasUser:boolean = User != null ? Object.keys(User).length !== 0 : false;
    const HasLoadedUser:boolean = User != null && User !== 'none' && User.displayName != null;

    if(type === 'login' && HasLoadedUser){
        // TODO : redirection home
    }

    useEffect(() =>{
        if(HasUser || User ==='none')
            setIsLoading(false)
    },[HasUser, User]);
    
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
        </Fragment>        
    )
}

export default Dashboard;