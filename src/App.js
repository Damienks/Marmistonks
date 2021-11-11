import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect, useState } from 'react'
import Header from './Components/Header';
import { getAuth, updateProfile, signOut } from "firebase/auth";
import Form from './Components/Form';
import { app } from './Database'
import { Redirect } from 'react-router';
import Dashboard from './Components/Dashboard';

function App({ formType }) {

  const [LoggedUserId, setLoggedUserId] = useState(null)
  const [LoggedUserName, setLoggedUserName] = useState(null)
  const [LoggedUserEmail, setLoggedUserEmail] = useState(null)
  const [IsLoading, setIsLoading] = useState(true)

  const handleUser = (userName) =>{
    getAuth(app).onAuthStateChanged(function(user) {
      if (user) {
        if(userName != null && userName.trim() !== ""){
          updateProfile(user, {
              displayName : userName
          }).then(() => {
            setLoggedUserId(user.auth.currentUser.uid)
            setLoggedUserName(userName)
            setLoggedUserEmail(user.auth.currentUser.email)
            console.log(user.auth.currentUser.displayName)
          }).catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert(errorCode + ' : ' + errorMessage)
          });
          setIsLoading(false)
        }
        else{
          setLoggedUserId(user.auth.currentUser.uid)
          setLoggedUserName(user.auth.currentUser.displayName)
          setLoggedUserEmail(user.auth.currentUser.email)
          setIsLoading(false)
        }
      } else {
        console.log('Aucun utilisateur connecté...')
        setIsLoading(false)
      }
    });
  }

  const handleSignOut = () =>{
    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.reload();
    }).catch((error) => {
        alert(error.code + ' : ' + error.message)
    });
  }

  // Équivalent à "ComponentDidMount()"
  useEffect(() =>{
    handleUser()
  }, [])

  if(formType != null && LoggedUserId != null)
    return <Redirect push to='/' />

  return (
    <div className="app source-sans color-primary">
      { !IsLoading &&
        <Header 
        userId={ LoggedUserId } 
        userName={ LoggedUserName } 
        signOutEvent={ handleSignOut } />
      }
      { formType && !IsLoading &&
        <div className='container'>
          <div className='rounded row bg-white p-20 justify-content-md-center'>
            <div className='col-5'>
              { !LoggedUserId && <Form formType={ formType } handleUser={ handleUser } /> }
            </div>
          </div>
        </div>
      }
      { !formType && !IsLoading &&
        <Dashboard />
      }
    </div>
  );
}

export default App;
