import {useState} from 'react';
import {useAppSelector} from '../../hooks';
import SortOption from '../sort-option/sort-option';

const tabIndexValue = 0;
const sortOptions = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

function SortOptionsList(): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const activeSortOption = useAppSelector((state) => state.activeSortOption);
  const handleClickSortMenu = () => {
    setIsOpened(!isOpened);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={tabIndexValue} onClick={handleClickSortMenu}>
        {activeSortOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened && 'places__options--opened'}`}>
        {
          sortOptions.map((sortOption) => <SortOption key={sortOption} sortOption={sortOption} onClickOption={handleClickSortMenu}/>)
        }
      </ul>
    </form>
  );
}

export default SortOptionsList;
