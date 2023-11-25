import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {

    const navigate =  useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] =  useState(null);
    const [success, setSuccess] =  useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
        .then(()=> {
            setSuccess(`Reset Password Mail send to ${email}` );
            setEmail('')
            setError(null);
            setTimeout(() => {
                navigate('/login')
            }, 5000);
        })
        .catch((error)=>{
            setError(error);
            setEmail('');
        })
        

    }

    const disabled = email === '';



    return (
        <div className="signUpLoginBox">
            <div className='slContainer'>
            <div className='formBoxLeftForget'> 
                </div>
                <div className='formBoxRight'> 
                    <div className='formContent'>

                        {
                            success && <span 
                            style={{
                                border: '1px solid gren',
                                background: 'green',
                                color:'#ffffff'
                            }}>
                                {success}
                            </span>
                        }

{
                            error && <span 
                            style={{
                                border: '1px solid red',
                                background: 'red',
                                color:'#ffffff'
                            }}>
                                {error.message}
                            </span>
                        }

                      <form onSubmit={handleSubmit}>
                            <h2>Forget Password?</h2>
                           
    
                            <div className='inputBox'>
                              <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" id='email' autoComplete='off' required/>
                              <label htmlFor='email'>Email</label>
                            </div>

                                <button disabled={disabled}> Recuperer</button>

                      </form>
                         <div className='linkContainer'>
                            <Link className='simpleLink' to='/login'>Have Already Account? Login </Link> 
                         </div>
                  
                    </div>
                    
                </div>
            </div>
        </div>
      )
}

export default ForgetPassword
