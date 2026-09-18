import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import RoutePanel from './components/RoutePanel';
import CrowdReporter from './components/CrowdReporter';
import AlertPanel from './components/AlertPanel';
import './App.css';

function App() {
  const [crowds, setCrowds] = useState({});
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    // Fetch crowd data from Firebase
    // Update every 5 seconds
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <h1>🚀 IntelliRoute Campus Navigator</h1>
        <p>Real-time crowd-aware routing for your campus</p>
      </header>
  
      <div className="main-layout">
        <div className="map-section">
          <MapComponent crowdData={crowds} selectedRoute={selectedRoute} />
        </div>

        <div className="control-panel">
          <AlertPanel crowds={crowds} />
          <CrowdReporter onCrowdReport={(zone, level) => setCrowds({...crowds, [zone]: level})} />
          <RoutePanel onRouteSelect={setSelectedRoute} selectedRoute={selectedRoute} />
        </div>
      </div>
    </div>
  );
}

export default App;