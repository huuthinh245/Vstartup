import { createStackNavigator } from 'react-navigation';

import * as routes from '../routes/routes';
import { MainWithModal } from './Main';
import SplashScreen from '../routes/SplashScreen';

const routeConfig = {
  [routes.splashScreen]: { screen: SplashScreen },
  [routes.mainWithModal]: { screen: MainWithModal }
};

const navConfig = {
  initialRouteName: routes.SplashScreen,
  navigationOptions: { header: null }
};

export const AppNavigator = createStackNavigator(routeConfig, navConfig);
