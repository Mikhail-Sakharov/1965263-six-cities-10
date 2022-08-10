import {TAB_INDEX_VALUE} from '../../const';
import {useAppSelector} from '../../hooks';
import {store} from '../../store';
import {changeSortTypeAction} from '../../store/action';

type SortOptionComponentProps = {
  sortOption: string;
  onClickOption: () => void;
};

function SortOption({sortOption, onClickOption}: SortOptionComponentProps): JSX.Element {
  const isActive = useAppSelector((state) => state.activeSortOption === sortOption);
  return (
    <li className={`places__option ${isActive && 'places__option--active'}`} tabIndex={TAB_INDEX_VALUE} onClick={() => {
      store.dispatch(changeSortTypeAction(sortOption));
      onClickOption();
    }}
    >{sortOption}
    </li>
  );
}

export default SortOption;
