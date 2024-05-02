import React, { useState } from 'react';
import './App.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFail, setLoginFail] = useState(false);
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setLoginFail(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setLoginFail(false);

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
    axios.post("http://localhost:8080/api/auth/login", {
      username: username,
    password: password
    }).then((response)=> {
        localStorage.setItem("token", response.data.token);
        console.log("login succes", response)
      navigate("/dashboard")
    }).catch((e)=> {
      console.log('login fails');
      setLoginFail(true);
    })
  
  };


  return (
    <div className="login-container"> 
      <form onSubmit={handleSubmit}>
        <h2>Login</h2> 
        <div>
          <label htmlFor="username">Username or Email:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            autoComplete="off" 
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="off" 
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button> 
      {loginFail &&  <div><h3 style={{marginTop: 10, textAlign: "center", color: "red", fontSize: 12}}>Login Fail</h3></div>}
      </form>
    </div>
  );
};

export default Login;