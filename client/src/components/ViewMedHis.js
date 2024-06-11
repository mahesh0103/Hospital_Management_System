import React, { useState,useEffect } from 'react'
import Axios from 'axios' ; 
import './ViewMedHis.css' ;

Axios.defaults.withCredentials=true;

function ViewMedHis() {
    const [data,setdetails] = useState({}); 
    const [previousAppointments, setPreviousAppointments] = useState([]);
    console.log("yo2!");
    useEffect(() => {
        var email="";
        Axios.get("http://localhost:3001/login").then((response)=>{
            console.log(response);
            if(response.data.loggedIn===true)
                email=response.data.user[0].email;
            console.log(email);
            Axios.post("http://localhost:3001/ViewMedHis",{
                email: email,
            }).then((res)=>{
                // console.log(email);
                console.log(res);
                setdetails(res.data.result[0]);
                setPreviousAppointments(res.data.result1);
            });
        })
    }, []);
    return (
      <div className="container12">
        <div className="left-column2">
          <div className="heading2">Patient Details</div>
          {data && Object.keys(data).length > 0 ? (
            <>
              <div className="item2">
                <strong>Name:</strong> <span>{data.name}</span>
              </div>
              <div className="item2">
                <strong>Gender:</strong> <span>{data.gender}</span>
              </div>
              <div className="item2">
                <strong>Conditions:</strong> <span>{data.conditions}</span>
              </div>
              <div className="item2">
                <strong>Surgeries:</strong> <span>{data.surgeries}</span>
              </div>
              <div className="item2">
                <strong>Medication:</strong> <span>{data.medication}</span>
              </div>
            </>
          ) : (
            <div>No patient data available</div>
          )}
        </div>
        <div className="right-column2">
          <div className="heading2">Contact Information</div>
          {data && Object.keys(data).length > 0 ? (
            <>
              <div className="item2">
                <strong>Email:</strong> <span>{data.email}</span>
              </div>
              <div className="item2">
                <strong>Address:</strong> <span>{data.address}</span>
              </div>
            </>
          ) : (
            <div>No contact information available</div>
          )}
        </div>
        <div className="previous-appointments">
          <div className="heading2">Previous Appointments</div>
          {previousAppointments.length > 0 ? (
            previousAppointments.map((appointment, index) => (
              <div key={index} className="previous-appointment">
                <div>Date: {appointment.date.substring(0, 10)}</div>
                <div>Concerns: {appointment.concerns}</div>
                <div>Symptoms: {appointment.symptoms}</div>
                <div>Doctor: {appointment.doctor}</div>
                <div>Diagnosis: {appointment.diagnosis}</div>
                <div>Prescription: {appointment.prescription}</div>
              </div>
            ))
          ) : (
            <div>No previous appointments available</div>
          )}
        </div>
      </div>
    );

}

export default ViewMedHis