import {Offer} from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type OffersListProps = {
  offers: Offer[];
  onOfferItemHover: (id: number) => void;
};

function OffersList({offers, onOfferItemHover}: OffersListProps): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => <PlaceCard key={offer.id} offer={offer} onOfferItemHover={onOfferItemHover}/>)
      }
    </div>
  );
}

export default OffersList;
