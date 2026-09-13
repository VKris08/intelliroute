import React, { useState } from 'react';

const RoutePanel = ({ onRouteSelect }) => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [routes, setRoutes] = useState([]);

  const locations = [
    'Library', 'Cafeteria', 'Main Plaza', 'Parking Lot', 'Gym', 'Dorm Area'
  ];

  const handleFindRoute = async (e) => {
    e.preventDefault();

    // Fake data - No API calls needed
    const mockRoutes = [
      { 
        id: 1, 
        name: '🟢 Safe Route (Avoids Crowds)', 
        duration: '8 min', 
        congestion: 'Low',
        waypoints: 'Via Park Road',
        distance: '0.8 km'
      },
      { 
        id: 2, 
        name: '🔴 Fast Route (Direct)', 
        duration: '5 min', 
        congestion: 'High',
        waypoints: 'Via Main Street',
        distance: '0.5 km'
      }
    ];

    setRoutes(mockRoutes);
  };

  return (
    <div className="route-panel">
      <h2>🗺️ Find Route</h2>
      <form onSubmit={handleFindRoute}>
        <select value={start} onChange={(e) => setStart(e.target.value)} required>
          <option value="">From...</option>
          {locations.map(loc => <option key={loc}>{loc}</option>)}
        </select>

        <select value={end} onChange={(e) => setEnd(e.target.value)} required>
          <option value="">To...</option>
          {locations.map(loc => <option key={loc}>{loc}</option>)}
        </select>

        <button type="submit">Get Routes</button>
      </form>

      <div className="routes-list">
        {routes.map(route => (
          <div key={route.id} className="route-card" onClick={() => onRouteSelect(route)}>
            <h3>{route.name}</h3>
            <p>⏱️ {route.duration}</p>
            <p>Congestion: <span className={route.congestion.toLowerCase()}>{route.congestion}</span></p>
            <p>Via: {route.waypoints}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutePanel;