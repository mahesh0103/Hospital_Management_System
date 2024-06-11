// Diagnose.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import './Diagnose.css' ;
import { useNavigate } from 'react-router-dom';

Axios.defaults.withCredentials = true;

function Diagnose() {
    const navigate = useNavigate();
    const { appointmentId } = useParams();
    const [diagnosis, setDiagnosis] = useState('');
    const [prescription, setPrescription] = useState('');
  
    const handleDiagnoseSubmit = (e) => {
      e.preventDefault(); // Prevent the default form submission
  
      // Submit diagnosis and prescription data to the backend
      Axios.post("http://localhost:3001/Diagnose", {
        id: appointmentId,
        diag: diagnosis,
        pres: prescription
      })
      .then((response) => {
        // Handle success or error response
        navigate('/Appts'); // Navigate to the desired page after successful submission
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });
    };
  
    return (
      <div className="hms-container">
        <div className="hms-header">
          <h1 className="header-text">HMS</h1>
        </div>
        <div className="diagnose-container">
          <form>
            <div className="form-group">
              <label htmlFor="diagnosis" className="form-label">Diagnosis:</label>
              <textarea 
                id="diagnosis"
                className="form-control" 
                rows="4" 
                value={diagnosis} 
                onChange={(e) => setDiagnosis(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="prescription" className="form-label">Prescription:</label>
              <textarea 
                id="prescription"
                className="form-control" 
                rows="4" 
                value={prescription} 
                onChange={(e) => setPrescription(e.target.value)} 
              />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleDiagnoseSubmit}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
  
export default Diagnose;
