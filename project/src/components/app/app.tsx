import {Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Review} from '../../types/review';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Room from '../../pages/room/room';
import NotFoundPage from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import {useAppSelector} from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

type AppComponentProps = {
  reviews: Review[];
};

function App({reviews}: AppComponentProps): JSX.Element {
  const {authorizationStatus, isDataLoaded} = useAppSelector((state) => state);
  const isCheckedAuth = (authStatus: AuthorizationStatus): boolean => authStatus === AuthorizationStatus.Unknown;

  if (isCheckedAuth(authorizationStatus) || isDataLoaded) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main/>}
        />
        <Route
          path={AppRoute.Login}
          element={<Login/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <Favorites/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Room}
          element={<Room reviews={reviews}/>}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundPage/>}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
