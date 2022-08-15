import PlacesContainer from '../../components/places-container/places-container';
import Header from '../../components/header/header';
import CitiesList from '../../components/cities-list/cities-list';
import MainEmpty from '../../components/main-empty/main-empty';
import {useAppSelector} from '../../hooks';
import {useState} from 'react';
import {getOffers} from '../../store/app-data/selectors';

function Main(): JSX.Element {
  const [isSortMenuOpened, setIsSortMenuOpened] = useState(false);
  const offers = useAppSelector(getOffers);

  return (
    <>
      <div style={{display: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      <div className="page page--gray page--main">
        <Header/>

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CitiesList setIsSortMenuOpened={setIsSortMenuOpened}/>
            </section>
          </div>
          <div className="cities">
            {offers ? <PlacesContainer isSortMenuOpened={isSortMenuOpened} setIsSortMenuOpened={setIsSortMenuOpened}/> : <MainEmpty/>}
          </div>
        </main>
      </div>
    </>
  );
}

export default Main;
