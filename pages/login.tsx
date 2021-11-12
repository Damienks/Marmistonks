import 'bootstrap/dist/css/bootstrap.min.css';
import { FC, useState } from 'react'
import Header from '../components/Header';
import Form from '../components/Form';

const Login:FC = () => {

  const [LoggedUserId, setLoggedUserId] = useState<string>('')

  if(LoggedUserId){
    alert(LoggedUserId)
  }

  return (
    <div className="app source-sans color-primary">
      <Header />
      { <div className='container'>
          <div className='rounded row bg-white p-20 justify-content-md-center'>
            <div className='col-5'>
              { <Form formType='login' setLoggedUseridEvent={ setLoggedUserId } /> }
            </div>
          </div>
        </div>
      }
      
    </div>
  );
}

export default Login;
