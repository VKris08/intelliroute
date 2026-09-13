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
  
    // Different routes based on selected zones
    const distance = Math.random() * 2 + 0.5; // Random 0.5-2.5 km
    const duration = Math.round(distance * 2);
  
    const mockRoutes = [
      { 
        id: 1, 
        name: `🟢 Safe Route (${start} → ${end})`, 
        duration: `${duration + 3} min`, 
        congestion: 'Low',
        waypoints: 'Via Park Road',
        distance: `${distance.toFixed(1)} km`,
        instructions: [
          `Exit ${start} via south entrance`,
          'Follow park path (less crowded)',
          `Arrive ${end} via quiet entry`
        ]
      },
      { 
        id: 2, 
        name: `🔴 Fast Route (${start} → ${end})`, 
        duration: `${Math.round(duration)} min`, 
        congestion: 'High',
        waypoints: 'Via Main Street',
        distance: `${(distance * 0.7).toFixed(1)} km`,
        instructions: [
          `Take direct path from ${start}`,
          'High foot traffic expected',
          `Arrive at ${end}`
        ]
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
    <div 
      key={route.id} 
      className={`route-card ${selectedRoute?.id === route.id ? 'active' : ''}`}
      onClick={() => onRouteSelect(route)}
    >
      <h3>{route.name}</h3>
      <p>⏱️ {route.duration} | 📍 {route.distance}</p>
      <p>Congestion: {route.congestion}</p>
      
      {selectedRoute?.id === route.id && (
        <div className="instructions">
          <h4>Directions:</h4>
          {route.instructions.map((inst, idx) => (
            <p key={idx}>📍 {idx + 1}. {inst}</p>
          ))}
        </div>
      )}
          </div>
         ))}
       </div>
    </div>
  );
};

export default RoutePanel;