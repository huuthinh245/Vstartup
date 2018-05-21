import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Login from '../components/authorization/login';
import HistoryAuth from '../components/tabs/HistoryAuth';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import ProfileAuth from '../components/tabs/ProfileAuth';
class ProfileTab extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header outer title={headerStrings.profileTitle} />
        {/* {this.props.auth.id ? <ProfileAuth {...this.props} /> : <Login {...this.props} />} */}
        <ProfileAuth />
      </View>
    );
  }
}

export default connect(state => ({ auth: state.auth }))(ProfileTab);
