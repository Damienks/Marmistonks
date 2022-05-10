// React stuff/types/hooks
import { getAuth } from "firebase/auth";
import { FC, MouseEventHandler, useEffect, useState } from "react";
// Components
import Dashboard from "../Dashboard";
// Hooks
import { useAuthState } from "react-firebase-hooks/auth";
// Firebase
import { app } from "../../src/Database";

interface ModalProps{
    IsForNonExistingUser?:boolean
}

const auth = getAuth(app);

const Modal:FC<ModalProps> = (props) =>{

    const [user, loading] = useAuthState(auth);
    const [Show, setShow] = useState<boolean>(true);
    
    const resetPage = ():void => { 
        setShow(false)
        window.location.reload()
    }
    const handleBackDropClick:MouseEventHandler<HTMLDivElement> = () => resetPage()

    useEffect(() =>{
        console.log("useEffect")
        if(!loading){
          if(user != null && props.IsForNonExistingUser)
            resetPage()
        }
    },[loading, user, props.IsForNonExistingUser]);

    return(
        <>
            {Show &&
                <div className="fixed h-full w-full flex flex-column items-center" style={{ top:"0px", left:"0px" }}>
                    <div className="absolute h-full w-full opacity-95" style={{zIndex:2, background:"#1C3E58"}} onClick={ handleBackDropClick }></div>
                    <div className="absolute h-full w-1/2 flex flex-column items-center justify-center" style={{zIndex:3}}>
                        
                        {props.IsForNonExistingUser &&
                            <>
                                <div className="bg-red-400 w-full py-3 text-white">
                                    <p className="signika text-3xl">Oups ! Il semblerait que vous ne soyez pas connecté...</p>
                                </div>
                                <Dashboard type='login'/>
                            </>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Modal