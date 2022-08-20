import {MutableRefObject, useEffect, useRef, useState} from 'react';
import {Map, TileLayer} from 'leaflet';
import {useAppSelector} from '.';
import {getSelectedCityOffers} from '../store/app-data/selectors';

function useMap(mapRef: MutableRefObject<HTMLElement | null>): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const city = useAppSelector(getSelectedCityOffers)[0].city;
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
    map?.flyTo({
      lat: city.location.latitude,
      lng: city.location.longitude,
    }, city.location.zoom);
  }, [mapRef, city.location, map]);

  return map;
}

export default useMap;
