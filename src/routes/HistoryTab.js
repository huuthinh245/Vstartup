import React from 'react';
import { connect } from 'react-redux';

import Login from '../components/authorization/login';
import LisHistory from '../components/ListHistory';

class HistoryTab extends React.Component {
  render() {
    return this.props.auth.token ? (
      <LisHistory navigation={this.props.navigation} />
    ) : (
      <Login {...this.props} />
    );
  }
}

export default connect(state => ({
  auth: state.auth
}))(HistoryTab);
