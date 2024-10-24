import React, { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addMarkerAsync } from '../store/markerSlice';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface AddMarkerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMarkerModal: React.FC<AddMarkerModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    if (isNaN(lat) || isNaN(lng)) {
      alert('Please enter valid latitude and longitude values.');
      return;
    }
    dispatch(addMarkerAsync({
      name,
      latitude: lat,
      longitude: lng,
    }));
    onClose();
    setName('');
    setLatitude('');
    setLongitude('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Add New Marker</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Marker Name"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Latitude"
            required
            step="any"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Longitude"
            required
            step="any"
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Add Marker <FaMapMarkerAlt className="inline ml-2" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMarkerModal;
