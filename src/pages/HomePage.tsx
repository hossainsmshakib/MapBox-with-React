import React, { useState } from "react";
import MapWithMarker from "../components/MapWithMarker";
import AddMarkerModal from "../components/AddMarkerModal";
import { FaPlus } from "react-icons/fa";

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Map with Markers
      </h1>
      <MapWithMarker />
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add Marker <FaPlus className="ml-2" />
      </button>
      <AddMarkerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
