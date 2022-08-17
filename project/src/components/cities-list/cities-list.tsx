import City from '../city/city';
import {cities} from '../../const';

type CitiesListComponentProps = {
  setIsSortMenuOpened: (state: boolean) => void;
};

function CitiesList({setIsSortMenuOpened}: CitiesListComponentProps): JSX.Element {
  return (
    <ul className="locations__list tabs__list">
      {
        cities.map((city) => <City key={city} city={city} setIsSortMenuOpened={setIsSortMenuOpened}/>)
      }
    </ul>
  );
}

export default CitiesList;
