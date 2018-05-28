import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Login from '../components/authorization/login';
import FavoriteAuth from '../components/tabs/FavoriteAuth';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import ListAgency from './ListAgency';

class FavoriteTab extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListAgency />
      </View>
    );
  }
}

export default connect(state => ({ auth: state.auth }))(FavoriteTab);
