import {useAppSelector} from '../../hooks';
import {getErrorMessage} from '../../store/app-data/selectors';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(getErrorMessage);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;
}

export default ErrorMessage;
