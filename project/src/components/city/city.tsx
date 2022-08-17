import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCityAction} from '../../store/app-data/app-data';
import {getCurrentCity} from '../../store/app-data/selectors';

type CityComponentProps = {
  city: string;
  setIsSortMenuOpened: (state: boolean) => void;
};

function City({city, setIsSortMenuOpened}: CityComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCurrentCity);
  const isCityTabActive = city === currentCity;
  return (
    <li className="locations__item" onClick={() => {
      dispatch(changeCityAction(city));
      setIsSortMenuOpened(false);
    }}
    >
      <Link className={`locations__item-link tabs__item ${isCityTabActive && 'tabs__item--active'}`} to="/">
        <span>{city}</span>
      </Link>
    </li>
  );
}

export default City;
