import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PatientActivities from './pages/PatientActivities';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities/:id" element={<PatientActivities />} />
      </Routes>
    </Router>
  );
}

export default App;