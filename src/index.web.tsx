import { AppRegistry } from 'react-native';
import App from '../App';

// Web 特定样式
const style = {
  height: '100%',
  margin: 0,
  padding: 0,
};

// 注册应用
AppRegistry.registerComponent('fomo-weather', () => App);

// Web 特定设置
AppRegistry.runApplication('fomo-weather', {
  rootTag: document.getElementById('root'),
  initialProps: {
    style,
  },
}); 