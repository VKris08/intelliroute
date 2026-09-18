import React from 'react';

const MapComponent = ({ crowdData, selectedRoute }) => {
  return (
    <div className="map-container">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.599348269662!2d76.49182!3d9.09406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c87590ac50e1%3A0x1234567890!2sAmrita+Vishwa+Vidhyapeetham+Amritapuri!5e0!3m2!1sen!2sin!4v1234567890"
        allowFullScreen=""
        loading="lazy"
        title="Campus Map"
      ></iframe>
      
      <div className="crowd-overlay">
        <h3>📊 Live Crowd Levels</h3>
        {Object.entries(crowdData).map(([zone, level]) => (
          <div key={zone} className="zone-badge" style={{
            backgroundColor: level > 70 ? '#ff0000' : level > 30 ? '#ffff00' : '#00ff00'
          }}>
            {zone}: {level}%
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapComponent;