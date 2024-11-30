import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const defaultIcon = icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export const JobMap = ({ selectedJob }) => {
  if (!selectedJob) return null;

  return (
    <div className="map-container">
      <MapContainer
        center={selectedJob.location.coordinates}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker 
          position={selectedJob.location.coordinates}
          icon={defaultIcon}
        >
          <Popup>
            <div>
              <h3>{selectedJob.title}</h3>
              <p>{selectedJob.company}</p>
              <p>{selectedJob.location.city}, {selectedJob.location.country}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};