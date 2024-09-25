import React, { useState } from 'react';
import axios from 'axios';
import app from '../../../Config/firebaseConfig';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import  '../../../Styles/Customer/Login.css' 
const auth = getAuth(app);

  
 
const LoginForm = () => {
   

    const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState(''); 
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [error, setError] = useState('');    
    const navigate = useNavigate(); 
    const sendOtp =async () => {
      try {

      } catch (error){
        setError('Recaptcha Error'+error.message ) 
      }  
          const recaptchaVerifier   =  new RecaptchaVerifier( auth, 'recaptcha-container' ,{
            'size': 'invisible',
            'callback': (response)=>{} ,   
          },auth ) 
     
            await  signInWithPhoneNumber( auth,'+91'+phone ,recaptchaVerifier )
                  .then( (confirmationResult)=>{
                    setConfirmationResult(confirmationResult)

                  } ).catch( (err)=>{
                   console.error(`Sms Not sent`, err)
                  } )
    }; 
    
    
    const verifyOtp = async () =>{  
  
       try{
        const result =  await confirmationResult.confirm(otp)
        console.log( result)

        const FormData = {
          userId: result.user.uid,
          phone : result.user.phoneNumber,
          provider : result.user.providerId, 
          accessToken : result.user.accessToken,
        }
   
         const saveuser  = await axios.post(`${API_URL}/auth/firebase/save`,FormData);
         console.log( saveuser) 

         if ( saveuser) {
           
          // navigate('/profile', { state: { userId: result.user.uid } });
          navigate('/profile');
         }
          
    
       }catch(error){
        console.error( error)
       }

    }
  

    const handleGoogleLogin = async () => {
      window.location.href = `${API_URL}/auth/google/login`;  
    };
   
    return (
      <div className="loginContainer">
      <div className="loginBox">
        <p>{error}</p> 
          <h2>Login</h2>
          <div className="formGroup">
              <label>Phone Number:</label>
              <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder='Enter Mobile Number'
              />
          </div>
          <div id="recaptcha-container"></div> 
          <button onClick={sendOtp} className="loginButton">Send OTP</button>

        
          {confirmationResult && (
            
              <div className="formGroup">
                  <label>Otp:</label>
                  <input type="text"  value={otp} onChange={(e) => setOtp(e.target.value)} />
                   <button onClick={verifyOtp} className="loginButton">Verify OTP</button> 
              </div>
               
                 
          )} 
          <button onClick={handleGoogleLogin} className="googleButton">Login with Google</button>
      </div>
  </div>
    );
  };


export default LoginForm