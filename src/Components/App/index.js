import '../../App.css';
import Footer from '../Footer';
import Header from '../Hearder';
import Landing from '../Landing';
import Login from '../Login';
import Signup from '../Signup';
import Welcome from '../Welcome';
import ErrorPage from '../ErrorPage'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgetPassword from '../ForgetPassword';
import { IconContext } from "react-icons";


function App() {
  return (
    <div className='contain'>      
            <BrowserRouter>
            <IconContext.Provider value={{ style: {verticalAlign: 'middle'} }}>
                 <Header/>
              <Routes>
                  <Route exact path="/" element={<Landing/>} />
                  < Route path="/welcome" element={<Welcome/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/signup" element={<Signup/>}/>
                  <Route path="*"element={<ErrorPage/>}/>
                  <Route path='/forgetpassword' element={<ForgetPassword/>}/>
              </Routes>
              <Footer/>
              </IconContext.Provider>
            </BrowserRouter>    
    </div>
  );
}
export default App;
