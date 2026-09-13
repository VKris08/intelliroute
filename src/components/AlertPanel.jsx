import React from 'react';

const AlertPanel = ({ crowds }) => {
  // Find zones with high crowd + vehicle conflict
  const alerts = Object.entries(crowds)
    .filter(([zone, level]) => level > 70)
    .map(([zone, level]) => ({
      zone,
      level,
      message: `⚠️ ${zone} is ${level}% full - High congestion risk`
    }));

  return (
    <div className="alert-panel">
      <h2>🚨 Alerts</h2>
      {alerts.length > 0 ? (
        alerts.map(alert => (
          <div key={alert.zone} className="alert-card">
            <p>{alert.message}</p>
          </div>
        ))
      ) : (
        <p>✅ All zones safe</p>
      )}
    </div>
  );
};

export default AlertPanel;