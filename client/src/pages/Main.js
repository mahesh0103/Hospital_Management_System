import React, { useEffect, useState } from 'react' ;
import Axios from 'axios' ;
import Doc from "../components/Doc"
import Pat from "../components/Pat"
import Registration from './Registration';
import "./Main.css"
Axios.defaults.withCredentials=true;

function Main() {
  const [role,setrole] = useState('');
  useEffect(()=>{
    Axios.get("http://localhost:3001/login").then((response)=>{
        console.log(response);
        console.log("hello!");
        if(response.data.loggedIn===true)
          setrole(response.data.role);
        console.log(role);
      });
  },[role]);
  // const logout = () => {
  //   Axios.post("http://localhost:3001/logout")
  //     .then((response) => {
  //       console.log(response.data); // Optional: log the logout response
  //       if (response.data === 'Logged out successfully') {
  //         Axios.get("http://localhost:3001/login").then((response) => {
  //           if (!response.data.loggedIn) {
  //             console.log('logged out!');
  //             window.location = '/'; // Redirect to the home page
  //           }
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Logout failed:", error);
  //     });
  // };
  console.log(role);
  
  return (
    <>
    {role==='' && <Registration/>}
    {role==='doc' && <Doc/>}  
    {role==='pat' && <Pat/>}
    </>
  )
}

export default Main;