import {listClassNameMap} from '../../const';
import {Offer} from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type OffersListProps = {
  listType: 'main' | 'room';
  offers: Offer[] | undefined;
  onOfferItemHover?: (id: number) => void;
};

function OffersList({listType, offers, onOfferItemHover}: OffersListProps): JSX.Element {

  return (
    <div className={listClassNameMap[listType]}>
      {
        offers?.map((offer) => <PlaceCard key={offer.id} listType={listType} offer={offer} onOfferItemHover={onOfferItemHover}/>)
      }
    </div>
  );
}

export default OffersList;
