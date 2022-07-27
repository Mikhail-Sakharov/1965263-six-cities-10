import {MouseEvent} from 'react';
import {Link} from 'react-router-dom';
import {RATING_COEFFICIENT} from '../../const';

import {Offer} from '../../types/offer';

type PlaceCardComponentProps = {
  listType: string;
  offer: Offer;
  onOfferItemHover: (id: number) => void;
};

function PlaceCard({listType, offer, onOfferItemHover}: PlaceCardComponentProps): JSX.Element {
  const onMouseOverHandler = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    onOfferItemHover(offer.id);
  };

  return (
    <article id={`${offer.id}`} className={listType === 'main' ? 'cities__card place-card' : 'near-places__card place-card'} onMouseOver={onMouseOverHandler}>
      <div className={listType === 'main' ? 'cities__image-wrapper place-card__image-wrapper' : 'near-places__image-wrapper place-card__image-wrapper'}>
        <Link to="/">
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={offer.isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${offer.rating * RATING_COEFFICIENT}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
