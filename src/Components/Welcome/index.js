import React, {Fragment, useEffect, useState} from 'react'
import Logout from '../Logout'
import Quizz from '../Quizz'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, user } from '../Firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { getDoc } from 'firebase/firestore'

const Welcome = () => {

  const [userSession, setuserSession] = useState(null);
  const [userData, setUserData] = useState({})
  const navigate =  useNavigate();

 useEffect(() =>{
   const listener = onAuthStateChanged(auth, (user)=> {
        user ? setuserSession(user) : navigate('/');
    })
    if(!!userSession){

      const docRef = user(userSession.uid);
      getDoc(docRef)
      .then(snapShot=>{
        if(snapShot.exists()){
            const data =  snapShot.data();
            setUserData(data);
           
        }
      })
      .catch((error)=>{
            console.log(error);
      })

    }
    return () => {
      listener()
    };
 }, [userSession])


  return  userSession == null ? (
    <Fragment>
      <div className='loader'>
      <p className='loaderText'>Loading...</p>
      </div>
    </Fragment>
  ) : (
    <div className="quiz-bg">
        <div className='container' >
        <Logout/>
         <Quizz userData={userData}/>
         
        </div>
      
    </div>

   
  )
}

export default Welcome;
