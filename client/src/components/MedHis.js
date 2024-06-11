import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import "./MedHis.css" ;
Axios.defaults.withCredentials = true;

function MedHis() {
    const { name } = useParams();
    const [patientDetails, setPatientDetails] = useState(null);

    useEffect(() => {
        fetchPatientDetails();
    }, []);

    const fetchPatientDetails = () => {
        Axios.post("http://localhost:3001/getPatientDetails", { name })
            .then(response => {
                setPatientDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching patient details:', error);
            });
    };

    return (
        <div className="med-his-container">
            {patientDetails ? (
                <div className="patient-details">
                    <h2>Patient Details</h2>
                    <p><strong>Name:</strong> {patientDetails.name}</p>
                    <p><strong>Gender:</strong> {patientDetails.gender}</p>
                    <p><strong>Email:</strong> {patientDetails.email}</p>
                    <p><strong>Address:</strong> {patientDetails.address}</p>
                    <h2>Medical History</h2>
                    <p><strong>Conditions:</strong> {patientDetails.conditions}</p>
                    <p><strong>Medications:</strong> {patientDetails.medications}</p>
                    <p><strong>Surgeries:</strong> {patientDetails.surgeries}</p>
                </div>
            ) : (
                <p>Loading patient details...</p>
            )}
        </div>
    );
}

export default MedHis;
