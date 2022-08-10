import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {store} from '../../store';
import {changeCityAction} from '../../store/action';

type CityComponentProps = {
  city: string;
  setIsSortMenuOpened: (state: boolean) => void;
};

function City({city, setIsSortMenuOpened}: CityComponentProps): JSX.Element {
  const isActive = useAppSelector((state) => state.city === city);
  return (
    <li className="locations__item" onClick={() => {
      store.dispatch(changeCityAction(city));
      setIsSortMenuOpened(false);
    }}
    >
      <Link className={`locations__item-link tabs__item ${isActive && 'tabs__item--active'}`} to="/">
        <span>{city}</span>
      </Link>
    </li>
  );
}

export default City;
