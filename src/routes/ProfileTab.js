import React from 'react';
import { connect } from 'react-redux';

import Login from '../components/authorization/login';
import AuthDetail from '../components/AuthDetail';

class ProfileTab extends React.Component {
  render() {
    return this.props.auth.token ? (
      <AuthDetail data={this.props.auth.user} navigation={this.props.navigation} />
    ) : (
      <Login navigation={this.props.navigation} />
    );
  }
}

export default connect(state => ({ auth: state.auth }))(ProfileTab);
