import {useEffect, useRef} from 'react';
import leaflet, {Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Offer} from '../../types/offer';
import useMap from '../../hooks/useMap';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';

type MapProps = {
  offers: Offer[];
  selectedOffer?: Offer | null;
  className: string;
};

function Map({offers, selectedOffer, className}: MapProps): JSX.Element {
  const city = offers[0].city;
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [28, 40],
    iconAnchor: [14, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [28, 40],
    iconAnchor: [14, 40],
  });

  useEffect(() => {
    if (map && offers) {
      offers.forEach((offer) => {
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
      if (className === 'property__map map' && selectedOffer) {
        const marker = new Marker({
          lat: selectedOffer.location.latitude,
          lng: selectedOffer.location.longitude,
        });
        marker
          .setIcon(
            currentCustomIcon
          )
          .addTo(map);
      }
    }
  }, [className, currentCustomIcon, defaultCustomIcon, map, offers, selectedOffer]);

  return <section ref={mapRef} className={className}></section>;
}

export default Map;
