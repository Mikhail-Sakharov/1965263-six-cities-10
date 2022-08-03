import {RingLoader} from 'react-spinners';
import styles from './loading-screen.module.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <RingLoader color={'#4481C3'} size={70}/>
      </div>
    </div>
  );
}

export default LoadingScreen;
