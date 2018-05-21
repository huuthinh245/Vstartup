import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as routes from './defineRoutes';
import SearchTab from '../routes/SearchTab';
import HistoryTab from '../routes/HistoryTab';
import FavoriteTab from '../routes/FavoriteTab';
import ProfileTab from '../routes/ProfileTab';
import MenuTab from '../routes/MenuTab';

import ProjectDetail from '../components/ProjectDetail';
import RealtyDetail from '../components/RealtyDetail';
import AgencyDetail from '../components/AgencyDetail';
import ListAgency from '../components/tabs/ListAgency';
import FilterProject from '../components/tabs/FilterProject';
import Register from '../components/authorization/register';
import Forgot from '../components/authorization/Forgot';

const tabsConfig = {
  SearchTab,
  HistoryTab,
  FavoriteTab,
  ProfileTab,
  MenuTab
};

const tabsOptions = {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'SearchTab') {
        iconName = `ios-search${focused ? '' : '-outline'}`;
      } else if (routeName === 'HistoryTab') {
        iconName = `ios-time${focused ? '' : '-outline'}`;
      } else if (routeName === 'FavoriteTab') {
        iconName = `ios-heart${focused ? '' : '-outline'}`;
      } else if (routeName === 'ProfileTab') {
        iconName = `ios-person${focused ? '' : '-outline'}`;
      } else if (routeName === 'MenuTab') {
        iconName = `ios-menu${focused ? '' : '-outline'}`;
      }

      return <Ionicons name={iconName} size={25} color={tintColor} />;
    }
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    initialRouteName: 'HistoryTab'
  },
  initialRouteName: 'SearchTab'
};

const Tabs = createBottomTabNavigator(tabsConfig, tabsOptions);

const stackConfig = {
  [routes.tabs]: { screen: Tabs },
  [routes.projectDetail]: { screen: ProjectDetail },
  [routes.agencyDetail]: { screen: AgencyDetail },
  [routes.realtyDetail]: { screen: RealtyDetail },
  [routes.listAgency]: { screen: ListAgency },
  [routes.filterProject]: { screen: FilterProject }
};

const navConfig = {
  navigationOptions: { header: null },
  initialRouteName: routes.filterProject
};

const Main = createStackNavigator(stackConfig, navConfig);

export const MainWithModal = createStackNavigator(
  {
    [routes.main]: { screen: Main },
    [routes.register]: { screen: Register },
    [routes.forgot]: { screen: Forgot }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);
