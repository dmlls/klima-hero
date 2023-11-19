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

class Alert {
  constructor(data) {
    this.effective = data.effective || "2019-08-24T14:15:22Z";
    this.expires = data.expires || "2019-08-24T14:15:22Z";
    this.category = data.category || "string";
    this.severity = data.severity || "string";
    this.description = data.description || "string";
    this.id = data.id || "string";
    this.iconUrl = data.iconUrl || "string";
    this.latitude = data.latitude;
    this.longitude = data.longitude;
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
  const [alertData, setAlertData] = useState(null);
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
    if (!alertData) return;
    alertData.forEach(alert => {
      map.current.loadImage(
          alert.iconUrl,
          (error, image) => {
            if (error) throw error;
            if (!map.current.hasImage(alert.id)) {
              map.current.addImage(alert.id, image);
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
    const poiFeatures = map.current.queryRenderedFeatures(bbox, { layers: ['pois'] });

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
      map.current.on('load', async () => {
        setMapInitialized(true);
        // Check if the source already exists before adding it
        if (!map.current.getSource('blublu')) {
          map.current.addSource('blublu', {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': [
                {
                  'type': 'Feature',
                  'properties': {
                    'color': '#b100e8' // red
                  },
                  'geometry': {
                    'type': 'LineString',
                    'coordinates': [
                      [11.56158251,48.1395966],[11.56521038,48.13950693],[11.56440419,48.13699626],[11.56615094,48.13323001],[11.56951009,48.13197453],[11.56951009,48.13197453],[11.57636274,48.12793887],[11.58093117,48.12462041],[11.5824092,48.12237809],[11.58133427,48.12013568],[11.58509651,48.11816227],[11.5914117,48.11663731],[11.59302409,48.11376668],[11.59329282,48.1116136],[11.59463648,48.11062674],[11.59718943,48.10309011],[11.61143219,48.10578189],[11.61438824,48.10596134],[11.61317895,48.10075712],[11.61734428,48.08469249],[11.62016596,48.07912704],[11.64367996,48.05470374],[11.65738527,48.02766298],[11.67001565,48.03215578],[11.68036181,48.03952313],[11.70266652,48.02191162],[11.70817551,48.02011419],[11.71247521,48.01912557],[11.71811857,48.01930532]
                    ]
                  }
                }]
            }
          });
          map.current.addLayer({
            'id': 'lines',
            'type': 'line',
            'source': 'blublu',
            'paint': {
              'line-width': 3,
              // Use a get expression (https://maplibre.org/maplibre-style-spec/expressions/#get)
              // to set the line-color to a feature property value.
              'line-color': ['get', 'color']
            }
          });

        }
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
    if (mapInitialized && !alertData) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/v1/bright-sky/alerts`);

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const result = await response.json();
          console.log(result)
          const convertedData = result.map(item => new Alert(item));
          setAlertData(convertedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [mapInitialized, alertData]);


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
      map.current.getSource('pois') && map.current.removeLayer('pois');
      map.current.getSource('pois') && map.current.removeSource('pois');

      // Add a new marker layer for each point
      map.current.addSource('pois', {
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
        id: 'pois',
        type: 'symbol',
        source: 'pois',
        layout: {
          'icon-image': ['get', 'icon-image'],
          'icon-size': 0.1,
          'icon-allow-overlap': true,
        },
      });
    }
  }, [poiData]);


  useEffect(() => {
    if (mapInitialized && alertData) {
      loadCustomImages();
      map.current.getSource('alerts') && map.current.removeLayer('alerts');
      map.current.getSource('alerts') && map.current.removeSource('alerts');

      // Add a new marker layer for each point
      map.current.addSource('alerts', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: alertData.map((alert) => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [alert.longitude, alert.latitude],
            },
            properties: {
              'icon-image': alert.id,
            },
          })),
        },
      });

      map.current.addLayer({
        id: 'alerts',
        type: 'symbol',
        source: 'alerts',
        layout: {
          'icon-image': ['get', 'icon-image'],
          'icon-size': 0.1,
          'icon-allow-overlap': true,
        },
      });
    }
  }, [alertData]);

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
          'fill-color': '#d95e6c',
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
