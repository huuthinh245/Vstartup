import React from 'react';
import { Text } from 'react-native';

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

import Register from '../components/authorization/register';
import Forgot from '../components/authorization/Forgot';
import Login from '../components/authorization/login';

import strings from '../localization/header';
import { _dims, responsiveFontSize } from '../utils/constants';

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
        iconName = `ios-contact${focused ? '' : '-outline'}`;
      } else if (routeName === 'MenuTab') {
        iconName = `ios-menu${focused ? '' : '-outline'}`;
      }
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
    tabBarLabel: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'SearchTab') {
        iconName = strings.searchLabel;
      } else if (routeName === 'HistoryTab') {
        iconName = strings.historyLabel;
      } else if (routeName === 'FavoriteTab') {
        iconName = strings.favoriteLabel;
      } else if (routeName === 'ProfileTab') {
        iconName = strings.profileLabel;
      } else if (routeName === 'MenuTab') {
        iconName = strings.menuLabel;
      }
      return (
        <Text
          numberOfLines={1}
          style={{
            color: focused ? tintColor : 'gray',
            fontSize: responsiveFontSize(_dims.defaultFontSize - 4)
          }}
        >
          {iconName}
        </Text>
      );
    }
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray'
  },
  initialRouteName: 'SearchTab'
};

export const Tabs = createBottomTabNavigator(tabsConfig, tabsOptions);

const stackConfig = {
  [routes.tabs]: { screen: Tabs },
  [routes.projectDetail]: { screen: ProjectDetail },
  [routes.agencyDetail]: { screen: AgencyDetail },
  [routes.realtyDetail]: { screen: RealtyDetail }
};

const navConfig = {
  navigationOptions: { header: null }
};

const Main = createStackNavigator(stackConfig, navConfig);

export const MainWithModal = createStackNavigator(
  {
    [routes.main]: { screen: Main },
    [routes.login]: { screen: Login },
    [routes.register]: { screen: Register },
    [routes.forgot]: { screen: Forgot }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);
