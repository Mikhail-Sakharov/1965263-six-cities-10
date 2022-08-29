import {listClassNameMap} from '../../const';
import {Offer} from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type OffersListProps = {
  listType: 'main' | 'room';
  offers: Offer[];
  onOfferItemHover?: (id: number) => void;
};

function OffersList({listType, offers, onOfferItemHover}: OffersListProps): JSX.Element | null {
  if (!offers) { throw new Error('no such point'); }
  return (
    offers ? (
      <div className={listClassNameMap[listType]} data-testid="offersList">
        {
          offers.map((offer) => <PlaceCard key={offer.id} listType={listType} offer={offer} onOfferItemHover={onOfferItemHover}/>)
        }
      </div>
    ) : null
  );
}

export default OffersList;
