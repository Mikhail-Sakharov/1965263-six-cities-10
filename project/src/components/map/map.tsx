import {useEffect, useRef} from 'react';
import leaflet, {Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Offer} from '../../types/offer';
import useMap from '../../hooks/useMap';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import {useAppSelector} from '../../hooks';

type MapProps = {
  offers: Offer[];
  selectedOffer?: Offer | undefined;
  className: string;
};

function Map({offers, selectedOffer, className}: MapProps): JSX.Element {
  const stateOffers: Offer[] = useAppSelector((state) => state.offers);
  const stateCity = useAppSelector((state) => state.offers[0].city);
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, stateCity);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      stateOffers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            offer.id === selectedOffer?.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [currentCustomIcon, defaultCustomIcon, map, stateOffers, selectedOffer]);

  return <section ref={mapRef} className={className}></section>;
}

export default Map;
