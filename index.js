import { AppRegistry } from 'react-native';
import Permissions from 'react-native-permissions';

import App from './src/app';
import { configProps } from './src/utils/configs';
import { _ios } from './src/utils/constants';

const requestPermissions = async () => {
  try {
    await Permissions.request('location', { type: 'always' });
    await Permissions.request('photo', { type: 'always' });
    await Permissions.request('camera');
    if (_ios) {
      await Permissions.request('notification', { type: ['alert', 'badge'] });
    }
  } catch (error) {
    console.log(error);
  }
};

console.disableYellowBox = true;

configProps();
requestPermissions();

AppRegistry.registerComponent('VStartup', () => App);
