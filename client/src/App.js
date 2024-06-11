import React from 'react';
// import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Registration from './pages/Registration';
import Main from './pages/Main';
import CreateAcc from './pages/CreateAcc';
import ViewMedHis from './components/ViewMedHis';
import SchedAppt from './components/SchedAppt';
import ViewAppt from './components/ViewAppt';
import Appts from './components/Appts';
import Diagnose from './components/Diagnose';
import SeeDiagnosis from './components/SeeDiagnosis';
import ViewPats from './components/Viewpats';
import MedHis from './components/MedHis';
import Pat from './components/Pat';
import Doc from './components/Doc';

function App() {
  return (  
    <Router>
      <Routes>
        <Route path='/registration' element={<Registration />} />
        <Route path='/' element={<Main />} />
        <Route path='/createacc' element={<CreateAcc />} />
        <Route path='/viewmedhis' element={<ViewMedHis />} />
        <Route path='/schedappt' element={<SchedAppt/>} />
        <Route path='/viewappt' element={<ViewAppt/>} />
        <Route path='/appts' element={<Appts/>} />
        <Route path='/diagnose/:appointmentId' element={<Diagnose/>} /> {/* Define Diagnose route */}
        <Route path='/SeeDiagnosis/:appointmentId' element={<SeeDiagnosis/>} /> {/* Define Diagnose route */}
        <Route path='/MedHis/:name' element={<MedHis/>} /> {/* Define Diagnose route */}
        <Route path='/viewpats' element={<ViewPats/>} />
        <Route path='/pat' element={<Pat/>} />
        <Route path='/doc' element={<Doc/>} />
      </Routes>
    </Router>
  );
}

export default App;
