import {Link} from 'react-router-dom';
import {Offer} from '../types/offer';
import FavoritesCard from './favorites-card/favorites-card';

type FavoritesListComponentProps = {
  favorites: Offer[];
};

function FavoritesList({favorites}: FavoritesListComponentProps) {
  const favoritesMap = new Map();
  const cityNamesSet = new Set(favorites.map((favorite) => favorite.city.name));
  cityNamesSet.forEach((cityName) => favoritesMap.set(cityName, [...favorites].filter((favorite) => favorite.city.name === cityName)));

  return (
    <ul className="favorites__list">
      {
        Array.from(favoritesMap).map((favorite) =>
          (
            <li key={favorite[0]} className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <Link className="locations__item-link" to="/">
                    <span>{favorite[0]}</span>
                  </Link>
                </div>
              </div>
              <div className="favorites__places">
                {
                  favorite[1].map((favoriteOffer: Offer) =>
                    (
                      <FavoritesCard key={favoriteOffer.id} favoritesCard={favoriteOffer}/>
                    )
                  )
                }
              </div>
            </li>
          )
        )
      }
    </ul>
  );
}

export default FavoritesList;
