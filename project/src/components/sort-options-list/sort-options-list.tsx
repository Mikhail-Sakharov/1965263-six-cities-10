import {sortOptions, TAB_INDEX_VALUE} from '../../const';
import {useAppSelector} from '../../hooks';
import SortOption from '../sort-option/sort-option';

type SortOptionsListComponentProps = {
  isSortMenuOpened: boolean;
  setIsSortMenuOpened: (state: boolean) => void;
};

function SortOptionsList({isSortMenuOpened, setIsSortMenuOpened}: SortOptionsListComponentProps): JSX.Element {
  const {activeSortOption} = useAppSelector((state) => state);

  const handleClickSortMenu = () => {
    setIsSortMenuOpened(!isSortMenuOpened);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={TAB_INDEX_VALUE} onClick={handleClickSortMenu}>
        {activeSortOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isSortMenuOpened && 'places__options--opened'}`}>
        {
          sortOptions.map((sortOption) => <SortOption key={sortOption} sortOption={sortOption} onClickOption={handleClickSortMenu}/>)
        }
      </ul>
    </form>
  );
}

export default SortOptionsList;
