import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import SearchBar from "../components/searchbar/SearchBar";

const Munichmap = () => {
  const mapboxToken = 'YOUR_MAPBOX_TOKEN'; // Replace with your Mapbox token

  const initialViewport = {
    latitude: 48.8566, // Munich's latitude
    longitude: 2.3522, // Munich's longitude
    zoom: 10,
  };

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(11.576124);
  const [lat] = useState(48.137154);
  const [zoom] = useState(14);
  const [API_KEY] = useState('d8Ep6nL1m5luLcZ2oC3u');

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      center: [lng, lat],
      zoom: zoom,
    });
  }, [API_KEY, lng, lat, zoom]);

  return (
      <div className="map-wrap" style={{ width: '100%', height: '100%' }}>
        {/* Map container */}
        <div ref={mapContainer} className="map" style={{ width: '100vh', height: '100%' }} />

        {/* SearchBar component */}
        <SearchBar />
      </div>
  );
};

export default Munichmap;
