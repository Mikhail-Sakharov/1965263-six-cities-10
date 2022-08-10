import City from '../city/city';
import {cities} from '../../const';

function CitiesList(): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {
        cities.map((city) => <City key={city} city={city}/>)
      }
    </ul>
  );
}

export default CitiesList;
