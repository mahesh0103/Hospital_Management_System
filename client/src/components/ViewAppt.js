import React, { useState, useEffect } from 'react';

import Axios from 'axios' ; 
import { useNavigate } from 'react-router-dom';

Axios.defaults.withCredentials = true;

function ViewAppt() {
    const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments data from the backend
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    // Fetch appointments data from the backend
    // Replace 'YOUR_BACKEND_ENDPOINT' with your actual backend endpoint
    // fetch('YOUR_BACKEND_ENDPOINT')
    //   .then(response => response.json())
    //   .then(data => setAppointments(data))
    //   .catch(error => console.error('Error fetching appointments:', error));
    let email = "";
    Axios.get("http://localhost:3001/login").then((response)=>{
            console.log(response);
            if(response.data.loggedIn===true)
                email=response.data.user[0].email;
            console.log(email);
            Axios.post("http://localhost:3001/ViewAppt",{
                email: email,
            }).then((res)=>{
                console.log(res.data);
                setAppointments(res.data);
                console.log(res.data[0].id);
            });
        })
  };

  const handleDiagnosisClick = (appointmentId) => {
    // Handle click on "See Diagnosis" button
    // Fetch diagnosis and prescription data for the selected appointment
    // and display it to the user
    navigate(`/SeeDiagnosis/${appointmentId}`);
    console.log(appointmentId);
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
          <td>{appointment.date.substring(0, 10)}</td>
          <td>{appointment.starttime}</td>
          <td>{appointment.endtime}</td>
          <td>{appointment.concerns}</td>
          <td>{appointment.symptoms}</td>
          <td>{appointment.status}</td>
          <td>
            <button onClick={() => handleDiagnosisClick(appointment.id)}>See Diagnosis</button>
          </td>
          <td>
            {appointment.status === 'Done' ? 
              <button onClick={() => handleActionClick(appointment.id, 'Delete')}>Delete</button> :
              <button onClick={() => handleActionClick(appointment.id, 'Cancel')}>Cancel</button>
            }
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
}

export default ViewAppt;
