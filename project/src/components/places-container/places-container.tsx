import {useState} from 'react';
import {Offer} from '../../types/offer';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';

type PlacesContainerProps = {
  offers: Offer[];
};

const tabIndexValue = 0;

function PlacesContainer({offers}: PlacesContainerProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);
  const onOfferItemHover = (offerId: number): void => {
    const currentOffer = offers.find((offer) => offer.id === offerId);
    setSelectedOffer(currentOffer);
  };

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in Amsterdam</b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={tabIndexValue}>
                    Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex={tabIndexValue}>Popular</li>
            <li className="places__option" tabIndex={tabIndexValue}>Price: low to high</li>
            <li className="places__option" tabIndex={tabIndexValue}>Price: high to low</li>
            <li className="places__option" tabIndex={tabIndexValue}>Top rated first</li>
          </ul>
        </form>
        <OffersList listType={'main'} offers={offers} onOfferItemHover={onOfferItemHover}/>
      </section>
      <div className="cities__right-section">
        <Map className={'cities__map map'} offers={offers} selectedOffer={selectedOffer}/>
      </div>
    </div>
  );
}

export default PlacesContainer;
