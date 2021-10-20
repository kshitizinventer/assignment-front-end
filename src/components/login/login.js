import axios from 'axios';
import React,{ useState } from 'react'
import './login.css'
import { useHistory } from 'react-router-dom'

const Login = ({setLoginUser}) => {

    const history = useHistory();

    const login_user = () => {
      const email = document.getElementById("email_l").value;
      const password = document.getElementById("password_l").value;
      const user = {
             "email" : email,
             "password" : password
            };

         if(email && password)
          axios.post("http://localhost:5000/login",user)
               .then(res => {
                   console.log(res);
                   document.getElementById("error_message").innerText = res.data.message;
                   setLoginUser(res.data.user);
                   history.push("/");
               });
         else
           alert("pls fill out email and password");
    }

    const goto_register = () => {
       history.push("/register");
    }

    return(
        <div className="login">
            <h1 className="loginheading">Login</h1>
            <input type="text" placeholder="Your email" id="email_l"></input><br></br>
            <input type="text" placeholder="your password" id="password_l"></input><br></br> 
            <p id="error_message"></p>      
            <button className="login_button" onClick={login_user}>Login</button>
            <p className="noaccount" onClick={goto_register}>Don't have a account yet?</p>
        </div>
    );
}

export default Login