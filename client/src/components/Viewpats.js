import React, { useState } from 'react';
import Axios from 'axios';
import "./Viewpats.css" ;
import { useNavigate } from 'react-router-dom';
Axios.defaults.withCredentials = true;
function Viewpats() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  // Function to handle search
  const handleSearch = () => {
    // Send search query to backend
    Axios.post('http://localhost:3001/searchPatients', { query: searchQuery })
      .then((response) => {
        // Update search results with data from backend response
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error('Error searching patients:', error);
      });
  };

  // Function to handle clicking on medical profile button
  const handleMedicalProfileClick = (name) => {
    navigate(`/MedHis/${name}`); 
  };

  return (
    <div className="hms-container">
        <div className="hms-header">
          <h1 className="header-text">HMS</h1>
        </div>
      <div className="search1-container">
        <input
          type="text"
          className="search1-input"
          placeholder="Search1 by patient name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search1-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="search1-results">
        {searchResults.map((patient) => (
          <div key={patient.id} className="patient1-item">
            <div className="patient1-name">{patient.name}</div>
            <button className="medical1-profile-button" onClick={() => handleMedicalProfileClick(patient.name)}>Medical Profile</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Viewpats;
