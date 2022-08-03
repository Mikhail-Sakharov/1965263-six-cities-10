import { useState } from 'react';
import {useAppSelector} from '../../hooks';
/* import {store} from '../../store';
import {clickSortMenuAction} from '../../store/action'; */
import SortOption from '../sort-option/sort-option';

const tabIndexValue = 0;
const sortOptions = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

function SortOptionsList(): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  //const isSortMenuOpened = useAppSelector((state) => state.isSortMenuOpened);
  const activeSortOption = useAppSelector((state) => state.activeSortOption);
  const onClickSortMenuHover = () => {
    setIsOpened(!isOpened);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={tabIndexValue} onClick={onClickSortMenuHover}>
        {activeSortOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened && 'places__options--opened'}`}>
        {
          sortOptions.map((sortOption) => <SortOption key={sortOption} sortOption={sortOption} onClickOption={onClickSortMenuHover}/>)
        }
      </ul>
    </form>
  );
}

export default SortOptionsList;
