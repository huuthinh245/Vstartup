import { createStackNavigator } from 'react-navigation';

import * as routes from './defineRoutes';
import { MainWithModal } from './Main';
import SplashScreen from '../routes/SplashScreen';

const routeConfig = {
  [routes.splashScreen]: { screen: SplashScreen },
  [routes.mainWithModal]: { screen: MainWithModal }
};

const navConfig = {
  initialRouteName: routes.mainWithModal,
  navigationOptions: { header: null }
};

export const AppNavigator = createStackNavigator(routeConfig, navConfig);
