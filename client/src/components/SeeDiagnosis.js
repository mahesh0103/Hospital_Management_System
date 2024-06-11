import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import "./SeeDiagnosis.css" ;
Axios.defaults.withCredentials = true;

function SeeDiagnosis() {
  const { appointmentId } = useParams();
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');

  useEffect(() => {
    // Fetch diagnosis and prescription data for the selected appointment
    fetchDiagnosisAndPrescription(appointmentId);
  }, [appointmentId]);

  const fetchDiagnosisAndPrescription = (id) => {
    Axios.get(`http://localhost:3001/GetDiagnosis/${id}`)
      .then((response) => {
        const { diagnosis, prescription } = response.data;
        setDiagnosis(diagnosis);
        setPrescription(prescription);
      })
      .catch((error) => {
        console.error('Error fetching diagnosis and prescription:', error);
      });
  };

  return (
    <div className="hms-container">
        <div className="hms-header">
          <h1 className="header-text">HMS</h1>
        </div>
      <div className="diagnosis1-container">
        <h2>Diagnosis</h2>
        <p>{diagnosis}</p>
        <h2>Prescription</h2>
        <p>{prescription}</p>
      </div>
    </div>
  );
}

export default SeeDiagnosis;
