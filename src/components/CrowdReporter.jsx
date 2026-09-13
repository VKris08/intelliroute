import React, { useState } from 'react';
import { db } from '../firebase-config';
import { ref, set } from 'firebase/database';

const CrowdReporter = ({ onCrowdReport }) => {
  const [selectedZone, setSelectedZone] = useState('');
  const [crowdLevel, setCrowdLevel] = useState(50);

  const zones = [
    { id: 'library', name: '📚 Library' },
    { id: 'cafeteria', name: '🍽️ Cafeteria' },
    { id: 'main_plaza', name: '🏛️ Main Plaza' },
    { id: 'parking', name: '🚗 Parking Lot' },
    { id: 'gym', name: '🏋️ Gym' },
    { id: 'dorm', name: '🏠 Dorm Area' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Fire base blocked - will fix later
    // await set(ref(db, `crowds/${selectedZone}`), {
    //  level: crowdLevel,
    //  timestamp: Date.now(),
    //  zone: selectedZone
    //});

    onCrowdReport(selectedZone, crowdLevel);
    alert('✅ Report submitted!');
  };

  return (
    <div className="crowd-reporter">
      <h2>📊 Report Crowd Level</h2>
      <form onSubmit={handleSubmit}>
        <select value={selectedZone} onChange={(e) => setSelectedZone(e.target.value)} required>
          <option value="">Select location...</option>
          {zones.map(z => <option key={z.id} value={z.id}>{z.name}</option>)}
        </select>

        <div className="slider-container">
          <label>Crowd Level: {crowdLevel}%</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={crowdLevel}
            onChange={(e) => setCrowdLevel(parseInt(e.target.value))}
          />
        </div>

        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default CrowdReporter;