import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export const useMapbox = (container: React.RefObject<HTMLDivElement>) => {
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (mapInstance.current || !container.current) return;

    mapInstance.current = new mapboxgl.Map({
      container: container.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 2
    });

    mapInstance.current.on('load', () => {
      console.log('Map loaded');
      setMapLoaded(true);
    });

    return () => {
      console.log('Removing map');
      mapInstance.current?.remove();
    };
  }, [container]);

  return { map: mapInstance.current, mapLoaded };
};
