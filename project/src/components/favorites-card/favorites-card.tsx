import {Link} from 'react-router-dom';
import {RATING_COEFFICIENT} from '../../const';
import {useAppDispatch} from '../../hooks';
import {postFavoriteAction, fetchFavoritesAction, fetchHotelsAction} from '../../store/api-actions';
import {setDataLoadedStatus} from '../../store/app-data/app-data';
import {Offer} from '../../types/offer';

type FavoritesCardComponentProps = {
  favoriteOffer: Offer;
};

function FavoritesCard({favoriteOffer}: FavoritesCardComponentProps): JSX.Element {
  const dispatch = useAppDispatch();

  const postFavoriteStatus = Number(!favoriteOffer.isFavorite) as 0 | 1;

  const handleFavoriteClick = () => {
    dispatch(setDataLoadedStatus(true));
    dispatch(postFavoriteAction({
      offerId: favoriteOffer.id,
      postFavoriteStatus
    }));
    dispatch(fetchFavoritesAction());
    dispatch(fetchHotelsAction());
    dispatch(setDataLoadedStatus(false));
  };

  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to="/">
          <img className="place-card__image" src={favoriteOffer.previewImage} width="150" height="110" alt="Place"/>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{favoriteOffer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button" onClick={handleFavoriteClick}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${favoriteOffer.rating * RATING_COEFFICIENT}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`../offer/${favoriteOffer.id}`}>{favoriteOffer.title}</Link>
        </h2>
        <p className="place-card__type">{favoriteOffer.type}</p>
      </div>
    </article>
  );
}

export default FavoritesCard;
