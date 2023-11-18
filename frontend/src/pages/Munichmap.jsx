import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import SearchBar from "../components/searchbar/SearchBar";
import { Modal, Fab} from '@mui/material';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import ModalContent from '../components/modalContent/modalContent';
import PoiModal from "../components/poiMarker/poiModal";
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { MapStyle } from '@maptiler/sdk';

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
    this.iconUrl = data.iconUrl;
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
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(11.576124);
  const [lat] = useState(48.137154);
  const [zoom] = useState(10);
  const [API_KEY] = useState('N5ziFaB0ErlP8IQFCFOt');
  const [poiData, setPoiData] = useState(null);
  const [cellsData, setCellsData] = useState(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [marker, setMarker] = useState(null);
  const [selectedPoi, setSelectedPoi] = useState(null);

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
          poi.iconUrl,
          (error, image) => {
            if (error) throw error;
            if (!map.current.hasImage(poi.id)) {
              map.current.addImage(poi.id, image);
            }
          }
      );
    });
  };

  const handleMapClick = (e) => {
    const { lngLat } = e;

    // Define a buffer size based on your marker size
    const buffer = 10; // Adjust this value according to your marker size

    // Create a bounding box around the clicked point
    const bbox = [
      [e.point.x - buffer, e.point.y - buffer],
      [e.point.x + buffer, e.point.y + buffer],
    ];

    // Check if the click was on a POI marker
    const poiFeatures = map.current.queryRenderedFeatures(bbox, { layers: ['points'] });

    if (poiFeatures.length > 0) {
      // Clicked on a POI marker
      const clickedPoiId = poiFeatures[0].properties['icon-image'];
      const clickedPoi = poiData.find((poi) => poi.id === clickedPoiId);

      if (clickedPoi) {
        // Set the selected POI
        setSelectedPoi(clickedPoi);

        // Optionally, set the clicked location state
        setClickedLocation({
          latitude: clickedPoi.latitude,
          longitude: clickedPoi.longitude,
        });
      }
    } else {
      // Clicked on the map
      setSelectedPoi(null); // Reset selectedPoi when clicking on the map
      setClickedLocation({
        latitude: lngLat.lat,
        longitude: lngLat.lng,
      });
    }
  };

  useEffect(() => {
    // Initialize the map
    if (!mapInitialized) {
      maptilersdk.config.apiKey = API_KEY;
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        center: [lng, lat],
        zoom: zoom,
        style: MapStyle.DATAVIZ.LIGHT
      });
      map.current.on('load', () => {
        setMapInitialized(true);
        const mapContainerElement = map.current.getContainer();
        const elementsToHide = mapContainerElement.querySelectorAll('.maplibregl-ctrl-bottom-left, .maplibregl-ctrl-bottom-right');

        //elementsToHide.forEach(element => {
        //  element.style.display = 'none';
        //});
      });
    }
  }, [API_KEY, lng, lat, zoom, mapInitialized]);


  useEffect(() => {
    // Initialize the map
    if (mapInitialized) {
      map.current.on('click', handleMapClick);
    }
    return () => {
      // Remove the click event listener when the component unmounts
      map.current.off('click', handleMapClick);
    };
  }, [mapInitialized, poiData]);


  useEffect(() => {
    if (clickedLocation) {
      // Remove the previous marker
      if (marker) {
        marker.remove();
      }

      // Add a marker at the clicked location
      const markerElement = document.createElement('div');
      markerElement.className = 'marker';
      const newMarker = new maplibregl.Marker(markerElement)
          .setLngLat([clickedLocation.longitude, clickedLocation.latitude])
          .addTo(map.current);

      // Save the marker instance
      setMarker(newMarker);

      // Save the latitude and longitude in a variable or use as needed
      const { latitude, longitude } = clickedLocation;
      console.log(`Clicked Location: ${latitude}, ${longitude}`);

      // Reset the clickedLocation state
      setClickedLocation(null);
    }
  }, [clickedLocation, marker]);


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
          features: poiData.map((poi) => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [poi.longitude, poi.latitude],
            },
            properties: {
              'icon-image': poi.id,
            },
          })),
        },
      });

      map.current.addLayer({
        id: 'points',
        type: 'symbol',
        source: 'points',
        layout: {
          'icon-image': ['get', 'icon-image'],
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
      <div className="map-wrap" style={{ width: '100%', height: '103%' }}>
        {/* Map container */}
        <div ref={mapContainer} className="map" style={{ width: '100vw', height: '100%', position: 'relative' }}>
          {/* Floating "add button" */}
          {marker && (
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
          )}

          {/* SearchBar component */}
          <SearchBar />

          {/* Modal component */}
          <Modal open={openModal} onClose={handleCloseModal}>
            <ModalContent handleClose={handleCloseModal} />
          </Modal>
          <PoiModal poiData={selectedPoi} handleClose={() => setSelectedPoi(null)} />
        </div>
      </div>
  );
};

export default Munichmap;
