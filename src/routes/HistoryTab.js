import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Login from '../components/authorization/login';
import HistoryAuth from '../components/tabs/HistoryAuth';

class HistoryTab extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.auth.user.id ? <HistoryAuth {...this.props} /> : <Login {...this.props} />}
      </View>
    );
  }
}

export default connect(state => ({ auth: state.auth }))(HistoryTab);
