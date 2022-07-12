import Main from '../../pages/main';

type MainComponentProps = {
  rentOffersCount: number
};

function App({rentOffersCount}: MainComponentProps): JSX.Element {
  return <Main rentOffersCount={rentOffersCount}/>;
}

export default App;
