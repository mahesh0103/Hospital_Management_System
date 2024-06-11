import React,{useEffect, useState} from 'react';
import Axios from 'axios' ; 
import './Registration.css'; 
import {useNavigate } from 'react-router-dom';

Axios.defaults.withCredentials=true;

function Registration() {
    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
    const [isDoctorLog, setIsDoctorLog] = useState(false);
    const [Role, setRole] = useState("");
    const [loginstatus,setloginstatus]=useState("");
    
    const navigate = useNavigate();
    const login = ()=>{
      const userRole = isDoctorLog ? "doc" : "pat";
      setRole(userRole);
      Axios.post("http://localhost:3001/login",{
        email: username,
        password: password,
        role: userRole,
      }).then((res)=>{
        if(res.data.message){
          setloginstatus(res.data.message);
          alert(res.data.message);
        }
        else{
          setloginstatus(res.data[0].name);
          setRole(userRole);
          if(userRole==='pat'){
            navigate('/pat');
          }
          else if(userRole==='doc') navigate('/doc');
          else navigate('/') ;
        }
      });
    };
    const createacc = ()=>{
      navigate('/createacc'); 
    };
    
  
    // useEffect(()=>{
    //   Axios.get("http://localhost:3001/login").then((response)=>{
    //     console.log(response);
    //     if(response.data.loggedIn===true)
    //       setloginstatus(response.data.user[0].name);
    //   })
    // },[Role])
  return (
    <div class='container'>
      <h1 class='heading'>Hospital Management System</h1>
      <div class='body'>
        <div class='form-container'>
            <div class='login'>
                <h2>Login</h2>
                <label>Username</label>
                <input type='text' onChange={(e)=>{setusername(e.target.value)}}></input>
                <label>Password</label>
                <input type='password' onChange={(e)=>{setpassword(e.target.value)}}></input>
                <div class="checkbox-container">
                    <input
                        type="checkbox"
                        id="isDoctor"
                        checked={isDoctorLog}
                        onChange={(e) => setIsDoctorLog(e.target.checked)}
                        class="custom-checkbox"
                    />
                    <label for="isDoctor" class="checkbox-label">Are you a Docter?</label>
                </div>
                <button class='b1 login-btn' onClick={login}>Login</button>
                <button class='b1 create-acc-btn' onClick={createacc}>Create Account</button>
            </div>
        </div>
        {/* <h2 class='status'>{loginstatus}</h2> */}
    </div>
</div>

  )
}

export default Registration