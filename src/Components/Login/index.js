import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {auth} from '../Firebase/firebaseConfig';
import {signInWithEmailAndPassword } from "firebase/auth";



const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btn, setBtn] = useState(false);

  useEffect(()=> {
    if(password.length > 5 && email !== ''){
      setBtn(true);
    }else if (btn){
      setBtn(false);
    }
  }, [password, email])

  const handleSubmit = (e) => {
          e.preventDefault();
          signInWithEmailAndPassword(auth, email, password)
          .then((user) => {
            navigate('/welcome', {replace: true});
          })
          .catch((error) => {
            setEmail('');
            setPassword('');
          });
  }

  return (
    <div className="signUpLoginBox">
        <div className='slContainer'>
        <div className='formBoxLeftLogin'> 
            </div>
            <div className='formBoxRight'> 
                <div className='formContent'>
                  <form onSubmit={handleSubmit}>
                        <h2>Inscription</h2>
                       

                        <div className='inputBox'>
                          <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" autoComplete='off' required/>
                          <label htmlFor='email'>Email</label>
                        </div>

                        <div className='inputBox'>
                          <input onChange={e => setPassword(e.target.value)} value={password} type="password" autoComplete='off' required/>
                          <label htmlFor='password'>Password</label>
                        </div>               
                        { btn ? <button>Login</button> : <button disabled>Login</button>}
                  </form>
                      <Link to={'/signup'}>New on Marvel Quiz ? Create Account</Link>
                      <br/>
                      <Link to={'/forgetpassword'}>Forget Your Password? Click Here </Link>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Login
