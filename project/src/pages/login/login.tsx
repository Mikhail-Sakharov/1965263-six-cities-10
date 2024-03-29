import {FormEvent, useRef} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../components/logo/logo';
import {cities} from '../../const';
import {useAppDispatch} from '../../hooks';
import {fetchFavoritesAction, fetchHotelsAction, loginAction} from '../../store/api-actions';
import {changeCityAction} from '../../store/app-data/app-data';
import {AuthData} from '../../types/auth-data';
import {getRandom} from '../../utils';

function Login(): JSX.Element {
  const randomCity = cities[getRandom(cities.length - 1)];
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const onSubmit = async (authData: AuthData) => {
    await dispatch(loginAction(authData));
    dispatch(fetchHotelsAction());
    dispatch(fetchFavoritesAction());
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        login: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <>
      <div style={{display: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
      </div>

      <div className="page page--gray page--login" data-testid="loginPage">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Logo/>
              </div>
            </div>
          </div>
        </header>

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" data-testid="login" className="login__input form__input" type="email" name="email" ref={emailRef} placeholder="Email" required/>
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input pattern=".*\d+.*[a-zA-Z]+.*|.*[a-zA-Z]+.*\d+.*" data-testid="password" className="login__input form__input" type="password" name="password" ref={passwordRef} placeholder="Password" required/>
                </div>
                <button data-testid="submitButton"className="login__submit form__submit button" type="submit">Sign in</button>
              </form>
            </section>
            <section className="locations locations--login locations--current">
              <div className="locations__item" onClick={() => dispatch(changeCityAction(randomCity))}>
                <Link className="locations__item-link" to="/">
                  <span>{randomCity}</span>
                </Link>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}

export default Login;
