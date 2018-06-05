import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import { transitionConfig } from './configs';
import * as routes from '../routes/routes';
import SearchTab from '../routes/SearchTab';
import HistoryTab from '../routes/HistoryTab';
import FavoriteTab from '../routes/FavoriteTab';
import ProfileTab from '../routes/ProfileTab';
import MenuTab from '../routes/MenuTab';

import ProjectDetail from '../routes/ProjectDetail';
import RealtyDetail from '../routes/RealtyDetail';
import AgencyDetail from '../routes/AgencyDetail';
import SuggestPlace from '../routes/SuggestPlace';
import AdditionalInformation from '../routes/AdditionalInformation';
import Sort from '../routes/Sort';
import Filter from '../routes/Filter';
import ListAgency from '../routes/ListAgency';
import ListProject from '../routes/ListProject';
import ListInvestor from '../routes/ListInvestor';
import Settings from '../routes/Settings';
import ChangePassword from '../routes/ChangePassword';
import Contacts from '../routes/Contacts';
import AgencyProject from '../routes/AgencyProject';

import Register from '../components/authorization/register';
import Forgot from '../components/authorization/Forgot';
import Login from '../components/authorization/login';
import CreateRealty from '../routes/CreateRealty';
import Feedback from '../routes/Feedback';

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
            fontSize: responsiveFontSize(_dims.defaultFontSize - 4),
            textAlign: 'center'
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
  initialRouteName: 'FavoriteTab',
  lazy: false,
  animationEnabled: true,
  swipeEnabled: true
};

export const Tabs = createBottomTabNavigator(tabsConfig, tabsOptions);

const stackConfig = {
  [routes.tabs]: { screen: Tabs },
  [routes.projectDetail]: { screen: ProjectDetail },
  [routes.agencyDetail]: { screen: AgencyDetail },
  [routes.realtyDetail]: { screen: RealtyDetail },
  [routes.suggestPlace]: { screen: SuggestPlace },
  [routes.additionalInformation]: { screen: AdditionalInformation },
  [routes.sortScreen]: { screen: Sort },
  [routes.filterScreen]: { screen: Filter },
  [routes.listAgency]: { screen: ListAgency },
  [routes.listInvestor]: { screen: ListInvestor },
  [routes.listProject]: { screen: ListProject },
  [routes.settings]: { screen: Settings },
  [routes.changePassword]: { screen: ChangePassword },
  [routes.contacts]: { screen: Contacts },
  [routes.agencyProject]: { screen: AgencyProject }
};

const navConfig = {
  navigationOptions: { header: null },
  initialRouteName: routes.Tabs
  // transitionConfig
};

const Main = createStackNavigator(stackConfig, navConfig);

export const MainWithModal = createStackNavigator(
  {
    [routes.main]: { screen: Main },
    [routes.login]: { screen: Login },
    [routes.register]: { screen: Register },
    [routes.forgot]: { screen: Forgot },
    [routes.createRealty]: { screen: CreateRealty },
    [routes.feedBack]: { screen: Feedback }
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);
