import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const MapComponent = ({ crowdData, selectedRoute }) => {
  const mapContainer = React.useRef(null);
  const map = React.useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [11.8, 56.1], // Lund University coords (example)
      zoom: 15,
    });

    // Add heatmap layer
    map.current.on('load', () => {
      addCampusZones();
      addHeatmapLayer();
    });
  }, []);

  const addCampusZones = () => {
    // Add building/zone GeoJSON
    map.current.addSource('zones', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [11.8, 56.1] },
            properties: { name: 'Library', id: 'zone_1' }
          },
          // Add 5-6 key campus locations
        ]
      }
    });

    map.current.addLayer({
      id: 'zones-layer',
      type: 'circle',
      source: 'zones',
      paint: {
        'circle-radius': 8,
        'circle-color': '#007cbf',
        'circle-opacity': 0.7
      }
    });
  };

  const addHeatmapLayer = () => {
    // Color zones based on crowd density
    // Green (empty) → Yellow → Red (congested)
    const heatmapData = Object.entries(crowdData).map(([zone, level]) => ({
      zone,
      density: level, // 0-100
      color: level < 30 ? '#00ff00' : level < 70 ? '#ffff00' : '#ff0000'
    }));

    console.log('Heatmap data:', heatmapData);
  };

  return <div ref={mapContainer} className="map-container" />;
};

export default MapComponent;