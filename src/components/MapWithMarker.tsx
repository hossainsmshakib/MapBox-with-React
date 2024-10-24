import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { fetchMarkers } from "../store/markerSlice";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

const MapWithMarker: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(12);
  const markers = useAppSelector((state) => state.markers.markers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMarkers());
  }, [dispatch]);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/light-v10",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on("move", () => {
      setLng(parseFloat(map.current!.getCenter().lng.toFixed(4)));
      setLat(parseFloat(map.current!.getCenter().lat.toFixed(4)));
      setZoom(parseFloat(map.current!.getZoom().toFixed(2)));
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    map.current.addControl(new mapboxgl.ScaleControl(), "bottom-left");
  }, []);

  useEffect(() => {
    if (!map.current) return;

    const existingMarkers = document.getElementsByClassName("mapboxgl-marker");
    while (existingMarkers[0]) {
      existingMarkers[0].remove();
    }

    markers.forEach((marker) => {
      const el = document.createElement("div");
      el.className =
        "cursor-pointer transition-transform duration-200 ease-out hover:scale-110";
      el.innerHTML = `
        <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.37 0 0 5.37 0 12C0 20.25 12 32 12 32C12 32 24 20.25 24 12C24 5.37 18.63 0 12 0ZM12 16.5C9.51 16.5 7.5 14.49 7.5 12C7.5 9.51 9.51 7.5 12 7.5C14.49 7.5 16.5 9.51 16.5 12C16.5 14.49 14.49 16.5 12 16.5Z" fill="#4A90E2"/>
        </svg>
      `;

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h3 class="text-lg font-semibold text-gray-800">${marker.name}</h3>`
      );

      new mapboxgl.Marker(el)
        .setLngLat([marker.longitude, marker.latitude])
        .setPopup(popup)
        .addTo(map.current!);
    });

    if (markers.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      markers.forEach((marker) => {
        bounds.extend([marker.longitude, marker.latitude]);
      });
      map.current.fitBounds(bounds, { padding: 50, maxZoom: 15 });
    }
  }, [markers]);

  return (
    <div className="relative w-full h-[70vh] min-h-[400px] rounded-lg overflow-hidden shadow-md">
      <div ref={mapContainer} className="w-full h-full" />
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-80 p-2 rounded-md text-sm shadow-sm">
        <div>Longitude: {lng}</div>
        <div>Latitude: {lat}</div>
        <div>Zoom: {zoom}</div>
      </div>
    </div>
  );
};

export default MapWithMarker;
