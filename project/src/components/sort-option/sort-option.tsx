import {TAB_INDEX_VALUE} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeSortTypeAction} from '../../store/app-data/app-data';
import {getActiveSortOption} from '../../store/app-data/selectors';

type SortOptionComponentProps = {
  sortOption: string;
  onClickOption: () => void;
};

function SortOption({sortOption, onClickOption}: SortOptionComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const activeSortOption = useAppSelector(getActiveSortOption);
  const isActive = activeSortOption === sortOption;
  return (
    <li className={`places__option ${isActive && 'places__option--active'}`} tabIndex={TAB_INDEX_VALUE} onClick={() => {
      dispatch(changeSortTypeAction(sortOption));
      onClickOption();
    }}
    >{sortOption}
    </li>
  );
}

export default SortOption;
