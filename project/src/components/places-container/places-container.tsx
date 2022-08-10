import {useState} from 'react';
import {Offer} from '../../types/offer';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import {useAppSelector} from '../../hooks';
import SortOptionsList from '../sort-options-list/sort-options-list';

function PlacesContainer(): JSX.Element {
  const selectedCityOffers: Offer[] = useAppSelector((state) => state.selectedCityOffers);
  const stateCityName = useAppSelector((state) => state.city);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const handleOfferItemHover = (offerId: number): void => {
    const currentOffer = selectedCityOffers.find((offer) => offer.id === offerId);
    setSelectedOffer(currentOffer || null);
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{selectedCityOffers.length} places to stay in {stateCityName}</b>
        <SortOptionsList/>
        <OffersList listType={'main'} offers={selectedCityOffers} onOfferItemHover={handleOfferItemHover}/>
      </section>
      <div className="cities__right-section">
        <Map className={'cities__map map'} offers={selectedCityOffers} selectedOffer={selectedOffer}/>
      </div>
    </div>
  );
}

export default PlacesContainer;
