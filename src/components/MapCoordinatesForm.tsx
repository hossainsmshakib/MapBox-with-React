import React, { useState } from 'react';

interface MapCoordinatesFormProps {
  onSubmit: (lat: number, lng: number) => void;
}

const MapCoordinatesForm: React.FC<MapCoordinatesFormProps> = ({ onSubmit }) => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    if (!isNaN(latNum) && !isNaN(lngNum)) {
      onSubmit(latNum, lngNum);
    } else {
      alert('Please enter valid latitude and longitude values.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="Latitude"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          placeholder="Longitude"
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Set Map Center
        </button>
      </div>
    </form>
  );
};

export default MapCoordinatesForm;
