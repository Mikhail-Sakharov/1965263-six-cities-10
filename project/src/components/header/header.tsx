import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getEmail} from '../../services/email';
import {logoutAction} from '../../store/api-actions';
import {changeCityAction} from '../../store/app-data/app-data';
import {getOffers} from '../../store/app-data/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import Logo from '../logo/logo';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();

  const offers = useAppSelector(getOffers);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favoriteCount = offers.filter((offer) => offer.isFavorite).length;

  const email = getEmail();

  const navigate = useNavigate();

  const handleSignOutClick = () => {
    dispatch(logoutAction());
    dispatch(changeCityAction('Paris'));
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo/>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user" onClick={() => authorizationStatus !== AuthorizationStatus.Auth && navigate(AppRoute.Login)}>
                <Link className="header__nav-link header__nav-link--profile" to="/">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  {
                    authorizationStatus === AuthorizationStatus.Auth
                      ? (
                        <>
                          <span className="header__user-name user__name">{email}</span>
                          <span className="header__favorite-count">{favoriteCount}</span>
                        </>
                      )
                      : <span className="header__login">Sign in</span>
                  }
                </Link>
              </li>
              {
                authorizationStatus === AuthorizationStatus.Auth && (
                  <li className="header__nav-item" onClick={handleSignOutClick}>
                    <Link className="header__nav-link" to="/">
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                )
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
