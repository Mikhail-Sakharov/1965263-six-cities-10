import {Route, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Room from '../../pages/room/room';
import NotFoundPage from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import {useAppSelector} from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {getDataLoadedStatus} from '../../store/app-data/selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoaded = useAppSelector(getDataLoadedStatus);
  const isCheckedAuth = (authStatus: AuthorizationStatus): boolean => authStatus === AuthorizationStatus.Unknown;

  if (isCheckedAuth(authorizationStatus) || isDataLoaded) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<Main/>}
      />
      <Route
        path={AppRoute.Login}
        element={
          authorizationStatus !== AuthorizationStatus.Auth
            ? <Login/>
            : <Main/>
        }
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
        element={<Room/>}
      />
      <Route
        path={AppRoute.NotFound}
        element={<NotFoundPage/>}
      />
    </Routes>
  );
}

export default App;
