import React, { useState, useEffect } from 'react'
import { auth } from '../Firebase/firebaseConfig';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const Logout = () => {

            const [checked, setChecked] = useState(false);
            const navigate =  useNavigate();

            const handleLogOut = ()=> {
                setChecked(!checked);
            }

             useEffect(() => {
              if(checked){
                signOut(auth).then(()=> {
                    navigate('/', {replace:true})
                })
                .catch(()=>{

                })
              }
            }, [checked])
            
  return (
    <div className='logoutContainer'>
            <label className="switch">
            <input 
            type="checkbox" 
            checked={checked}
            onChange={handleLogOut}
            />
            <span className="slider round"></span>
            </label>
    </div>
  )
}

export default Logout
