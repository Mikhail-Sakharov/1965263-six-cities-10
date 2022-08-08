import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logoutAction} from '../../store/api-actions';
import Logo from '../logo/logo';

function Header(): JSX.Element {
  const {authorizationStatus, offers} = useAppSelector((state) => state);
  const favoriteCount = offers.slice().filter((offer) => offer.isFavorite).length;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(logoutAction());
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
                          <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                          <span className="header__favorite-count">{favoriteCount}</span>
                        </>
                      )
                      : <span className="header__login">Sign in</span>
                  }
                </Link>
              </li>
              {
                authorizationStatus === AuthorizationStatus.Auth && (
                  <li className="header__nav-item" onClick={handleSignOut}>
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
