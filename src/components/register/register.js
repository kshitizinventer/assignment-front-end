import React,{ useState } from 'react'
import './register.css'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Register = () =>{
    // const [ user, setUser] = useState({
    //     name: "",
    //     email: "",
    //     password: ""
    // });

    const history = useHistory();

    const register_user = () => {
       const name = document.getElementById("name").value;
       const email = document.getElementById("email").value;
       const password = document.getElementById("password").value;

       const user = {
           "name" : name,
           "email": email,
           "password" : password
       };
       if(name && password && email)
          axios.post("http://localhost:5000/register",user)
          .then(res => {
              console.log(res);
              document.getElementById("error_message").innerText = res.data.message;
              history.push("/");
        });
       else  
          alert("invalid input");

    }

    return(
        <div className="login">
        <h1 className="loginheading">Register</h1>
        <input type="text" placeholder="your name" id="name"></input><br></br>
        <input type="text" placeholder="Your email" id="email"></input><br></br>
        <input type="text" placeholder="your password" id="password"></input><br></br> 
        <p id="error_message"></p>      
        <button className="register_button" onClick={register_user}>Signup</button>
    </div>
    );
}

export default Register