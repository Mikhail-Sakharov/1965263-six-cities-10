import {Link} from 'react-router-dom';
import Logo from '../../components/logo/logo';

function NotFound(): JSX.Element {
  return (
    <div className="not-found__status-wrapper">
      <Logo/>
      <h1>
            404.
        <br />
        <small>Page not found</small>
      </h1>
      <Link to="/">Go to main page</Link>
    </div>
  );
}

export default NotFound;
