import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import SearchBar from "../components/searchbar/SearchBar";
import { Modal, Button, Box, Fab} from '@mui/material';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import ModalContent from '../components/modalContent/modalContent';

class Poi {
  constructor(data) {
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.poiType = data.poiType;
    this.thread = data.thread.map(threadItem => new Thread(threadItem));
    this.upvotes = data.upvotes;
    this.creationDate = new Date(data.creationDate);
    this.relatedEvent = data.relatedEvent;
    this.official = data.official;
    this.active = data.active;
    this.id = data.id;
  }
}

class Cell {
  constructor(data) {
    this.type = data.type || "Feature";
    this.id = data.id || null;
    this.coordinates = data.geometry.coordinates || [];
  }
}

class Thread {
  constructor(threadItem) {
    this.author = threadItem.author;
    this.content = threadItem.content;
    this.creationDate = new Date(threadItem.creationDate);
  }
}

const Munichmap = () => {

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
  const [poiData, setPoiData] = useState(null);
  const [cellsData, setCellsData] = useState(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [clickedLocation, setClickedLocation] = useState(null);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const loadCustomImages = () => {
    if (!poiData) return;

    poiData.forEach(poi => {
      map.current.loadImage(
          `https://cdn-icons-png.flaticon.com/512/1964/1964391.png`,
          (error, image) => {
            if (error) throw error;
            if (!map.current.hasImage(poi.poiType)) {
              map.current.addImage(poi.poiType, image);
            }
          }
      );
    });
  };

  useEffect(() => {
    if (mapInitialized) {
      const handleClick = (e) => {
        const { lngLat } = e;
        setClickedLocation({ latitude: lngLat.lat, longitude: lngLat.lng });
      };

      map.current.on('click', 'points', handleClick);

      return () => {
        map.current.off('click', 'points', handleClick);
      };
    }
  }, [mapInitialized]);


  useEffect(() => {
    // Initialize the map
    if (!mapInitialized) {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
        center: [lng, lat],
        zoom: zoom,
      });

      // Listen for the map load event
      map.current.on('load', () => {
        setMapInitialized(true);
      });
    }
  }, [API_KEY, lng, lat, zoom, mapInitialized]);

  useEffect(() => {
    // Fetch data after the map is initialized
    if (mapInitialized && !poiData) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/v1/pois/all`);

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const result = await response.json();
          const convertedData = result.map(item => new Poi(item));
          setPoiData(convertedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [mapInitialized, poiData]);


  useEffect(() => {
    // Fetch data after the map is initialized
    if (true) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/v1/bright-sky/warning-cells/active`);

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const result = await response.json();
          const convertedData = result.map(item => new Cell(item));
          console.log(convertedData)
          setCellsData(convertedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [mapInitialized, poiData]);




  useEffect(() => {
    if (mapInitialized && poiData) {
      loadCustomImages();
      map.current.getSource('points') && map.current.removeLayer('points');
      map.current.getSource('points') && map.current.removeSource('points');

      // Add a new marker layer for each point
      map.current.addSource('points', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: poiData.map(poi => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [poi.longitude, poi.latitude],
            },
            properties: {
              //iconSize: [0.1, 0.1], // Adjust as needed
              iconImage: poi.poiType, // Assuming icons are in the 'assets' folder
            },
          })),
        },
      });

      map.current.addLayer({
        id: 'points',
        type: 'symbol',
        source: 'points',
        layout: {
          'icon-image': '{iconImage}',
          'icon-size': 0.1,
          'icon-allow-overlap': true,
        },
      });
    }
  }, [poiData]);


  useEffect(() => {
    if (mapInitialized && cellsData) {
      // Remove existing layers and sources
      map.current.getSource('polygons') && map.current.removeLayer('polygons');
      map.current.getSource('polygons') && map.current.removeSource('polygons');

      // Add a new layer for polygons
      map.current.addSource('polygons', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: cellsData.map(cell => ({
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [cell.coordinates],
            },
          })),
        },
      });

      map.current.addLayer({
        id: 'polygons',
        type: 'fill',
        source: 'polygons',
        paint: {
          'fill-color': '#088',
          'fill-opacity': 0.2,
        },
      });

    }
  }, [cellsData]);


  return (
      <div className="map-wrap" style={{ width: '100%', height: '100%' }}>
        {/* Map container */}
        <div ref={mapContainer} className="map" style={{ width: '100vw', height: '100%', position: 'relative' }}>
          {/* Floating "add button" */}
          <Fab
              color="primary"
              aria-label="add"
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                margin: '4px',
                zIndex: 1000,
              }}
              onClick={handleOpenModal}
          >
            <CrisisAlertIcon />
          </Fab>

          {/* SearchBar component */}
          <SearchBar />

          {/* Modal component */}
          <Modal open={openModal} onClose={handleCloseModal}>
            <ModalContent handleClose={handleCloseModal} />
          </Modal>
        </div>
      </div>
  );
};

export default Munichmap;

