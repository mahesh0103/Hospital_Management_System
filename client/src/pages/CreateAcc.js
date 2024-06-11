import React, { useState } from 'react';
import './acc.css';
import Axios from 'axios' ; 

Axios.defaults.withCredentials=true;

const DoctorForm = () => {
  const [name,setname]=useState("");
  const [email,setemail]=useState("");
  const [gender,setgender]=useState("");
  const [password,setpassword]=useState("");
  const [schedule,setschedule]=useState("");

  const register = ()=>{
      Axios.post("http://localhost:3001/registerfordoc",{
        name: name,
        email: email,
        gender: gender,
        password: password,
        schedule: schedule,
      }).then((res)=>{
        console.log(res);
      }); 
  };

  return (
    <div className="form">
      <h1>Doctor Form</h1>
      <div className="input-field">
        <label className='l1' >Name</label>
        <input className="in-box"  type="text" onChange={(e)=>{setname(e.target.value)}} placeholder="Enter first name" />
        {/* <hr /> */}
      </div>
      <div className="input-field">
        <label className='l1' >Email</label>
        <input className="in-box" type="text" onChange={(e)=>{setemail(e.target.value)}} placeholder="Enter first name" />
        {/* <hr /> */}
      </div>
      <div className="input-field">
        <label className='l1' >Gender</label>
        <input className="in-box" type="text" onChange={(e)=>{setgender(e.target.value)}}  placeholder="Enter first name" />
        {/* <hr /> */}
      </div>
      <div className="input-field">
        <label className='l1' >schedule no</label>
        <input className="in-box" type="text"  onChange={(e)=>{setschedule(e.target.value)}}  placeholder="Enter first name" />
        {/* <hr /> */}
      </div>
      <div className="input-field">
        <label className='l1' >password</label>
        <input className="in-box" type="text"  onChange={(e)=>{setpassword(e.target.value)}}  placeholder="Enter first name" />
        {/* <hr /> */}
      </div>
      <button className="b1 register-btn" onClick={register}>Register</button>
    </div>
  );
};

const PatientForm = () => {
  const [name,setname]=useState("");
  const [email,setemail]=useState("");
  const [gender,setgender]=useState("");
  const [address,setaddress]=useState("");
  const [password,setpassword]=useState("");
  const [med,setmed]=useState("");
  const [condition,setcondition]=useState("");
  const [surge,setsurge]=useState("");

  const register = ()=>{
    Axios.post("http://localhost:3001/register",{
      name: name,
      email: email,
      gender: gender,
      address: address,
      password: password,
      med: med,
      condition: condition,
      surge: surge,
    }).then((res)=>{
      console.log(res);
    });
  };
  return (
    <div className="form">
      <h1>Patient Form</h1>
      <div className="input-field">
        <label className='l1' >Name</label>
        <input className="in-box"  type="text" onChange={(e)=>{setname(e.target.value)}} placeholder="Enter first name" />
        {/* <hr /> */}
      </div>
      <div className="input-field">
        <label className='l1' >Email</label>
        <input className="in-box" type="text" onChange={(e)=>{setemail(e.target.value)}} placeholder="Enter first name" />
        {/* <hr /> */}
      </div>
      <div className="input-field">
        <label className='l1' >Gender</label>
        <input className="in-box" type="text" onChange={(e)=>{setgender(e.target.value)}}  placeholder="Enter first name" />
        {/* <hr /> */}
      </div>
      <div className="input-field">
        <label className='l1' >Address</label>
        <input className="in-box" type="text"  onChange={(e)=>{setaddress(e.target.value)}}  placeholder="Enter first name" />
        {/* <hr /> */}
      </div>
      <div className="input-field">
        <label className='l1' >MH-C</label>
        <input className="in-box" type="text"  onChange={(e)=>{setcondition(e.target.value)}}  placeholder="Enter first name" />
        {/* <hr /> */}
      </div>
      <div className="input-field">
        <label className='l1' >MH-S</label>
        <input className="in-box" type="text"  onChange={(e)=>{setsurge(e.target.value)}} placeholder="Enter first name" />
        {/* <hr /> */}
      </div>
      <div className="input-field">
        <label className='l1' >MH-M</label>
        <input className="in-box" type="text"  onChange={(e)=>{setmed(e.target.value)}} placeholder="Enter first name" />
        {/* <hr /> */}
      </div>
      <div className="input-field">
        <label className='l1' >Password</label>
        <input className="in-box" type="text"  onChange={(e)=>{setpassword(e.target.value)}} placeholder="Enter password" />
        {/* <hr /> */}
      </div>
      <button className="b1 register-btn" onClick={register}>Register</button>
    </div>
  );
};

function CreateAcc() {
  const [isDoctor, setIsDoctor] = useState(true);

  return (
    <div className="tabs">
      <div className="tab-header">
        <button
          className={isDoctor ? 'active-tab' : 'inactive-tab'}
          onClick={() => setIsDoctor(true)}
        >
          Doctor
        </button>
        <button
          className={!isDoctor ? 'active-tab' : 'inactive-tab'}
          onClick={() => setIsDoctor(false)}
        >
          Patient
        </button>
      </div>
      <div className="form-container">
        {isDoctor ? <DoctorForm /> : <PatientForm />}
      </div>
    </div>
  );
}

export default CreateAcc;
