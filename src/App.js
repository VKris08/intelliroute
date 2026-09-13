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
        {/* Crowdedness Stats */}
        <div className="stats-panel">
          <h2>📊 Campus Status</h2>
          {Object.entries(crowds).length > 0 ? (
            Object.entries(crowds).map(([zone, level]) => (
              <div key={zone} className="crowd-stat">
                <span>{zone}</span>
                <div className="bar">
                  <div 
                    className="fill" 
                    style={{
                      width: `${level}%`,
                      backgroundColor: level > 70 ? 'red' : level > 30 ? 'yellow' : 'green'
                    }}
                  ></div>
                </div>
                <span>{level}%</span>
              </div>
            ))
          ) : (
            <p>No reports yet</p>
          )}
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