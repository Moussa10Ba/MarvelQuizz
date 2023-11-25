import React, {useState} from 'react';
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, user} from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { setDoc } from 'firebase/firestore';


const Signup = () => {

  const navigate = useNavigate();

  const data = {
    pseudo: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

const [loginData, setLoginData] = useState(data);
const [error, setError] = useState('')

const handleChange = (e) => {
setLoginData({...loginData,[e.target.id]: e.target.value});
}
  const handleSubmit = (e) => {
        e.preventDefault();
        const {email, password, pseudo} = loginData;
        createUserWithEmailAndPassword(auth,email,password)
        .then((userAuth)=>{
            return setDoc(user(userAuth.user.uid),{
              email:email,
              pseudo:pseudo
            })
        })
        .then((user)=> {
            setLoginData({...data});
            navigate('/welcome');
        })
        .catch(error =>{
          setError(error);
          setLoginData({...data});
        })
}

const {pseudo, email, password, confirmPassword} = loginData;
const btn = pseudo === '' || email === '' || password ==='' || password !== confirmPassword ?
<button disabled>Create Account</button> : <button>Create Account</button>

return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>
            <div className='formBoxLeftSignup'> 
            </div>
            <div className='formBoxRight'> 
                <div className='formContent'>
                  <form onSubmit={handleSubmit}>
                        <h2>Inscription</h2>
                       <div className='inputBox'>
                          <input onChange={handleChange} value={pseudo} type="text" id="pseudo" autoComplete='off' required/>
                          <label htmlFor='pseudo'>Pseudo</label>
                        </div>

                        <div className='inputBox'>
                          <input onChange={handleChange} value={email} type="email" id="email" autoComplete='off' required/>
                          <label htmlFor='email'>Email</label>
                        </div>

                        <div className='inputBox'>
                          <input onChange={handleChange} value={password} type="password" id="password" autoComplete='off' required/>
                          <label htmlFor='password'>Password</label>
                        </div>

                        <div className='inputBox'>
                          <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete='off' required/>
                          <label htmlFor='confirmPassword'>Confirm Password</label>
                        </div>                
                        {btn}
                  </form>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Signup
