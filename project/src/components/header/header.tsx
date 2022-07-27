import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';
import Logo from '../logo/logo';

type HeaderProps = {
  offers: Offer[];
};

function Header({offers}: HeaderProps): JSX.Element {
  const favoriteCount = offers.slice().filter((offer) => offer.isFavorite).length;
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo/>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to="/">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  <span className="header__favorite-count">{favoriteCount}</span>
                </Link>
              </li>
              <li className="header__nav-item">
                <Link className="header__nav-link" to="/">
                  <span className="header__signout">Sign out</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
