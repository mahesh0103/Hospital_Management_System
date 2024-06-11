import React from 'react'
import "./Doc.css" ;
import {useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios' ; 

Axios.defaults.withCredentials=true;

function Doc() {
  const navigate = useNavigate();
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
  
  const appt=()=>{
    navigate('/Appts'); 
  }
  const viewpat=()=>{
    navigate('/Viewpats'); 
  }
  let username = "Welcome Doc";
  return (
    <div className="container4">
  <div className="header4">  
    <h1 className="header-text4">HMS</h1>
    <div className="patname">{username}</div>
  </div>
  <div className='box4'>
    <div className="sidebar4">
      <button className="nav-button4" onClick={appt}>Appointments</button>
      <button className="nav-button4" onClick={viewpat}>View Patients</button>
      <button className='bttnz1' onClick={logout}>Log out</button>
    </div>
    <div className="content4">
    </div>
  </div>  
</div>
  )
}

export default Doc