import {useState} from 'react';
import {Offer} from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type OffersListProps = {
  offers: Offer[];
};

function OffersList({offers}: OffersListProps): JSX.Element {
  const [activePlaceCardId, setActivePlaceCardId] = useState(0);
  return (
    <div className="cities__places-list places__list tabs__content" id={String(activePlaceCardId)}>
      {
        offers.map((offer) => <PlaceCard key={offer.id} offer={offer} onMouseOverHandler={() => setActivePlaceCardId(offer.id)}/>)
      }
    </div>
  );
}

export default OffersList;
