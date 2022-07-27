import {Offer} from '../../types/offer';
import {getListTypeClass} from '../../utils';
import PlaceCard from '../place-card/place-card';

type OffersListProps = {
  listType: string;
  offers: Offer[];
  onOfferItemHover?: (id: number) => void;
};

function OffersList({listType, offers, onOfferItemHover}: OffersListProps): JSX.Element {

  return (
    <div className={getListTypeClass(listType)}>
      {
        offers.map((offer) => <PlaceCard key={offer.id} listType={listType} offer={offer} onOfferItemHover={onOfferItemHover}/>)
      }
    </div>
  );
}

export default OffersList;
