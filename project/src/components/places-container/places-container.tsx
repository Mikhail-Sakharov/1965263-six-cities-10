import {useState} from 'react';
import {Offer} from '../../types/offer';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import {useAppSelector} from '../../hooks';
import SortOptionsList from '../sort-options-list/sort-options-list';

function PlacesContainer(): JSX.Element {
  const stateOffers: Offer[] = useAppSelector((state) => state.selectedCityOffers.filter((offer) => offer.city.name === state.city));
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);
  const handleOfferItemHover = (offerId: number): void => {
    const currentOffer = stateOffers.find((offer) => offer.id === offerId);
    setSelectedOffer(currentOffer);
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{stateOffers.length} places to stay in {stateOffers[0].city.name}</b>
        <SortOptionsList/>
        <OffersList listType={'main'} offers={stateOffers} onOfferItemHover={handleOfferItemHover}/>
      </section>
      <div className="cities__right-section">
        <Map className={'cities__map map'} offers={stateOffers} selectedOffer={selectedOffer}/>
      </div>
    </div>
  );
}

export default PlacesContainer;
