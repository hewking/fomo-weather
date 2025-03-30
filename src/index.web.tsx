import { AppRegistry } from 'react-native';
import App from './app/index';

AppRegistry.registerComponent('fomo-weather', () => App);
AppRegistry.runApplication('fomo-weather', {
  initialProps: {},
  rootTag: document.getElementById('root'),
}); 