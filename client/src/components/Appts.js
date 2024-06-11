import React, { useState, useEffect } from 'react';
import Axios from 'axios' ; 
import './ViewAppt.css';
import { useNavigate } from 'react-router-dom';

function Appts() {
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      // Fetch appointments data from the backend
      fetchAppointments();
    }, []);
  
    const fetchAppointments = () => {
      let email = "";
      Axios.get("http://localhost:3001/login").then((response)=>{
              if(response.data.loggedIn===true)
                  email=response.data.user[0].email;
              Axios.post("http://localhost:3001/Appts",{
                  email: email,
              }).then((res)=>{
                  console.log(res.data[0].date);
                  setAppointments(res.data);
              });
          })
    };
  
    const handleDiagnosisClick = (appointmentId) => {
      // Handle click on "See Diagnosis" button
      // Fetch diagnosis and prescription data for the selected appointment
      // and display it to the user
      navigate(`/Diagnose/${appointmentId}`);
    };
  
    const handleActionClick = (appointmentId, status) => {
      // Handle click on "Delete" or "Cancel" button based on the appointment status
      // Perform the corresponding action (delete or cancel) for the selected appointment
    };
  
    return (
      <div className="container3">
  <div className="header3">  
    <h1 className="header-text3">HMS</h1>
  </div>
  <table className="appointments-table3">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Date of Appointment</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Concerns</th>
        <th>Symptoms</th>
        <th>Status</th>
        <th>Action</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {appointments.map(appointment => (
        <tr key={appointment.id}>
          <td>{appointment.id}</td>
          <td>{appointment.name}</td>
          <td>{appointment.date.substring(0, 10)}</td>
          <td>{appointment.starttime}</td>
          <td>{appointment.endtime}</td>
          <td>{appointment.concerns}</td>
          <td>{appointment.symptoms}</td>
          <td>{appointment.status}</td>
          <td>
            <button onClick={() => handleDiagnosisClick(appointment.id)}>Diagnose</button>
          </td>
          <td>
          {
              appointment.status !== 'Done' ? 
                  <button onClick={() => handleActionClick(appointment.id, 'Delete')}>Delete</button> :
                  <button disabled>Done</button>
          }
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    );
}

export default Appts