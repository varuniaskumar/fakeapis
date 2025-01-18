import './login.css'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from './components/loader/Loader';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] =useState('');
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate(); 
  
  const handleSubmit = (event) => {event.preventDefault();
    const sendingData = {
      username:username,
      password: password
    };
    axios.post('https://fakestoreapi.com/auth/login', sendingData)
      .then(response =>{
        setLoader(true);
       navigate('/home');
      // setLoader(true);
     console.log(response.data);
     })
      .catch(error => {setError(error.response.data)});
     
      console.log(username);
      console.log(password);
  };
  return (
    <>
                                    
       <div className='container'>
       {loader && <Loader/>}  
       <form onSubmit={handleSubmit} className='loginform'>
        <div className='insideform'>
        <label>Username</label><br/>
        <input type='text' placeholder='enter your username' id='username' value={username} onChange={(event) => setUsername(event.target.value)}/><br/>
        <label>Password</label><br/>
         <input type='password'placeholder='enter your password' id='password' value={password} onChange={(event) => setPassword(event.target.value)}/><br/>
        <button type='submit' className='loginbutton'>Login</button>
        <p style={{ color: 'red' }}>{error}</p>
        </div>
      </form>
       </div>
    </>
  );
}
