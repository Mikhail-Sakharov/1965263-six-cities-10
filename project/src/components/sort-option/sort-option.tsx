import {useAppSelector} from '../../hooks';
import {store} from '../../store';
import {changeSortTypeAction} from '../../store/action';

const tabIndexValue = 0;

type SortOptionComponentProps = {
  sortOption: string;
  onClickOption: () => void;
};

function SortOption({sortOption, onClickOption}: SortOptionComponentProps): JSX.Element {
  const isActive = useAppSelector((state) => state.activeSortOption === sortOption);
  return (
    <li className={`places__option ${isActive && 'places__option--active'}`} tabIndex={tabIndexValue} onClick={() => {
      store.dispatch(changeSortTypeAction(sortOption));
      onClickOption();
    }}
    >{sortOption}
    </li>
  );
}

export default SortOption;
