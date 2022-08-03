import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {Offer} from '../../types/offer';
import {Review} from '../../types/review';
import {RATING_COEFFICIENT} from '../../const';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import Header from '../../components/header/header';
import {useAppSelector} from '../../hooks';

type RoomComponentProps = {
  offers: Offer[];
  reviews: Review[];
}

function Room({offers, reviews}: RoomComponentProps): JSX.Element {
  const stateOffers: Offer[] = useAppSelector((state) => state.offers.filter((offer) => offer.city.name === state.city));
  //const nearestOffers = stateOffers.slice(0, 4).sort((next, current) => next.location.latitude - current.location.latitude).sort((next, current) => next.location.longitude - current.location.longitude); //доработать поиск ближайших точек
  const selectedOfferId = Number(useParams().id);
  const selectedOffer = useMemo(() => (stateOffers.find((offer) => offer.id === selectedOfferId)), [selectedOfferId, stateOffers]);

  return (
    <>
      <div style={{display: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      <div className="page">
        <Header offers={offers}/>

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {
                  selectedOffer?.images.map((imgUrl) => (
                    <div key={imgUrl} className="property__image-wrapper">
                      <img className="property__image" src={imgUrl} alt="Studio"/>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {
                  selectedOffer?.isPremium ?
                    <div className="property__mark">
                      <span>Premium</span>
                    </div> :
                    null
                }
                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {selectedOffer?.title}
                  </h1>
                  <button className="property__bookmark-button button" type="button">
                    <svg className="property__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${!selectedOffer ? null : selectedOffer.rating * RATING_COEFFICIENT}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{`${!selectedOffer ? null : selectedOffer.rating}`}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {selectedOffer?.type}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {selectedOffer?.bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {selectedOffer?.maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{selectedOffer?.price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {
                      selectedOffer?.goods.map((feature) => (
                        <li key={feature} className="property__inside-item">
                          {feature}
                        </li>
                      ))
                    }
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="property__avatar user__avatar" src={selectedOffer?.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                    </div>
                    <span className="property__user-name">
                      {selectedOffer?.host.name}
                    </span>
                    {
                      selectedOffer?.host.isPro ?
                        <span className="property__user-status">
                          Pro
                        </span> :
                        null
                    }
                  </div>
                  <div className="property__description">
                    <p className="property__text">
                      {selectedOffer?.description}
                    </p>
                  </div>
                </div>
                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                  <ReviewsList reviews={reviews}/>
                  <ReviewsForm/>
                </section>
              </div>
            </div>
            <Map className={'property__map map'} offers={stateOffers}/>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <OffersList listType={'room'} offers={stateOffers}/>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default Room;
