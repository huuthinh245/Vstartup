import { createStore, applyMiddleware } from 'redux';

import { Provider, connect } from 'react-redux';
import React from 'react';
import logger from 'redux-logger';

import { AppNavigator } from './navigators/Root';
import { addListener, middleware } from './utils/navigationRedux';
import { reducers } from './redux/reducer';

class App extends React.Component {
  render() {
    return (
      <AppNavigator
        navigation={{
          dispatch: this.props.dispatch,
          state: this.props.nav,
          addListener
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(reducers, applyMiddleware(middleware, logger));

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default Root;
