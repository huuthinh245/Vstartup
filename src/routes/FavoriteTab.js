import React from 'react';

import { connect } from 'react-redux';

import Login from '../components/authorization/login';
import ListFavorite from '../components/ListFavorite';

class FavoriteTab extends React.Component {
  render() {
    return this.props.auth.token ? (
      <ListFavorite navigation={this.props.navigation} />
    ) : (
      <Login navigation={this.props.navigation} />
    );
  }
}

export default connect(state => ({
  auth: state.auth
}))(FavoriteTab);
