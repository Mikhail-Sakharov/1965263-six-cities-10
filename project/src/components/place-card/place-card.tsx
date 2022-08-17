import {memo, MouseEvent, useMemo} from 'react';
import {Link} from 'react-router-dom';
import {imageWrapperClassNameMap, listTypePathMap, placeCardClassNameMap, RATING_COEFFICIENT} from '../../const';
import {useAppDispatch} from '../../hooks';
import {postFavoriteAction} from '../../store/api-actions';
import {Offer} from '../../types/offer';

type PlaceCardComponentProps = {
  listType: 'main' | 'room';
  offer: Offer;
  onOfferItemHover?: (id: number) => void;
};

function PlaceCard({listType, offer, onOfferItemHover}: PlaceCardComponentProps): JSX.Element {
  const dispatch = useAppDispatch();

  const offerId = offer.id;
  const postFavoriteStatus = Number(!offer.isFavorite) as 0 | 1;

  const handleOfferItemHover = useMemo(() => (onOfferItemHover && ((evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    onOfferItemHover(offerId);
  })), [offerId, onOfferItemHover]);

  return (
    <article id={`${offerId}`} className={placeCardClassNameMap[listType]} onMouseOver={handleOfferItemHover}>
      <div className={imageWrapperClassNameMap[listType]}>
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
          <button onClick={
            () => {
              dispatch(postFavoriteAction({
                offerId,
                postFavoriteStatus
              }));
            }
          } className={offer.isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button"
          >
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
          <Link to={listTypePathMap[listType](offerId)}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default memo(PlaceCard);
