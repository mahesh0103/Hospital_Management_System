import React from 'react'

import {useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios' ; 
import './Pat.css' ;

Axios.defaults.withCredentials=true;

function Pat() {
  
  const navigate = useNavigate();
  useEffect(() => {
    let email="";
    Axios.get("http://localhost:3001/login").then((response)=>{
        console.log(response);
        if(response.data.loggedIn===true){
          email=response.data.user[0].email;
        }
            
        // Axios.post("http://localhost:3001/ViewMedHis",{
        //     email: email,
        // }).then((res)=>{
        //     // console.log(email);
        //     // console.log(res);
        //     console.log(res.data[0]);
        //     setdetails(res.data[0]);
        // });
    })
}, []);
const logout = () => {
  Axios.post("http://localhost:3001/logout")
    .then((response) => {
      console.log(response.data); // Optional: log the logout response
      if (response.data === 'Logged out successfully') {
        Axios.get("http://localhost:3001/login").then((response) => {
          if (!response.data.loggedIn) {
            console.log('logged out!');
            window.location = '/'; // Redirect to the home page
          }
        });
      }
    })
    .catch((error) => {
      console.error("Logout failed:", error);
    });
};
  const viewmedhis=()=>{
    navigate('/ViewMedHis'); 
  }
  const schedappt=()=>{
    navigate('/SchedAppt'); 
  }
  const viewappt=()=>{
    navigate('/ViewAppt'); 
  }
  let username= "Welcome Pat";
  return (
    <div className="containerz">
      <div className="headerz">  
        <h1 className="header-textz">HMS</h1>
        <div className="patname">{username}</div>
      </div>
      <div className='boxz'>
        <div className="sidebarz">
          <button className="nav-buttonz" onClick={viewmedhis}>View Medical History</button>
          <button className="nav-buttonz" onClick={viewappt}>View Appointments</button>
          <button className="nav-buttonz" onClick={schedappt}>Schedule Appointment</button>
          {/* <button className="nav-button">Log Out</button> */}
          <button className='bttnz' onClick={logout}>Log out</button>
        </div>
        {/* <div className="contentz">
          <h2 className="welcome-textz">Welcome Pat!</h2>
        </div> */}
      </div>  
      
    </div>
  )
}

export default Pat