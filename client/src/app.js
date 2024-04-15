import { Provider } from 'react-redux';
import './app.scss';
import store from './states/store';

const App = (props) => {
  return <Provider store={store}>{props.children}</Provider>;
};

export default App;
