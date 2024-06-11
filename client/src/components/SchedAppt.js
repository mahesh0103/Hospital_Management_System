import React, { useState ,useEffect } from 'react'
import Axios from 'axios' ; 
import './SchedAppt.css' ;
import { useNavigate } from 'react-router-dom';

function SchedAppt() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [concerns, setConcerns] = useState('');
  const [symptoms, setSymptoms] = useState('');

  Axios.defaults.withCredentials = true;
  
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get("http://localhost:3001/getdocdetails").then((response) => {
      setDoctors(response.data); // Assuming the response contains an array of doctor details
    });
  }, []);

  const handleScheduleAppointment = () => {
    // Validate inputs before sending to the backend
    if (!selectedDoctor || !selectedDate || !selectedTime || !concerns || !symptoms) {
      alert('Please fill in all fields');
      return;
    }
    let email="";
    Axios.get("http://localhost:3001/login").then((response)=>{
        console.log(response);
        if(response.data.loggedIn===true){
          email=response.data.user[0].email;
          Axios.post("http://localhost:3001/SchedAppt", {
            doctor: selectedDoctor,
            patEmail: email,
            date: selectedDate,
            time: selectedTime,
            concerns: concerns,
            symptoms: symptoms
          }).then((response) => {
            // Handle success or error response from the backend
            if (response.data && response.data.alert) {
              // Alert message received from the backend
              const alertMessage = response.data.alert;
              alert(alertMessage);
            } else {
              // Handle other responses or success cases
              const alertMessage = "Appointment Successfull, you will be redirected to the home page...";
              alert(alertMessage);
              navigate('/'); 
            }
          });
        }
            
    })
    
  };
  return (
    <div className="hms-container">
    <div className="hms-header">
      <h1 className="header-text">HMS</h1>
    </div>
    <div className="form-group">
      <label className="form-label">Select Doctor:</label>
      <select className="form-select" onChange={(e) => setSelectedDoctor(e.target.value)}>
        <option value="">Select</option>
        {doctors.map((doctor) => (
          <option key={doctor.email} value={doctor.email}>{doctor.name}</option>
        ))}
      </select>
    </div>
    <div className="form-group">
      <label className="form-label">Select Date:</label>
      <input type="date" className="form-input" onChange={(e) => setSelectedDate(e.target.value)} />
    </div>
    <div className="form-group">
      <label className="form-label">Select Time:</label>
      <input type="time" className="form-input" onChange={(e) => setSelectedTime(e.target.value)} />
    </div>
    <div className="form-group">
      <label className="form-label">Enter Your Concerns:</label>
      <input type="text" className="form-input" onChange={(e) => setConcerns(e.target.value)} />
    </div>
    <div className="form-group">
      <label className="form-label">Enter Your Symptoms:</label>
      <input type="text" className="form-input" onChange={(e) => setSymptoms(e.target.value)} />
    </div>
    <div className="form-group">
      <button className="form-button" onClick={handleScheduleAppointment}>Attempt to Schedule</button>
    </div>
  </div>
  )
}

export default SchedAppt