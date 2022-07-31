import City from '../city/city';
import {cities} from '../../const';
import {Offer} from '../../types/offer';

type CitiesListComponentProps = {
  offers: Offer[];
};

function CitiesList({offers}: CitiesListComponentProps): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {
        cities.map((city) => <City key={city} city={city} offers={offers}/>)
      }
    </ul>
  );
}

export default CitiesList;
