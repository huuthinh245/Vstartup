import { createStore, applyMiddleware } from 'redux';
import { View } from 'react-native';

import { Provider, connect } from 'react-redux';
import React from 'react';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import DropdownAlert from 'react-native-dropdownalert';

import epics from './redux/epics';
import { AppNavigator } from './navigators/Root';
import { addListener, middleware } from './utils/navigationRedux';
import { reducers } from './redux/reducer';
import emitter from './emitter';

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

const epicMiddleware = createEpicMiddleware(epics);
const AppWithNavigationState = connect(mapStateToProps)(App);

export const store = createStore(reducers, applyMiddleware(middleware, epicMiddleware, logger));

class Root extends React.Component {
  componentDidMount() {
    this.event = emitter.addListener('alert', obj => {
      this.dropdown.alertWithType(obj.type, obj.title, obj.error);
    });
  }

  componentWillUnmount() {
    this.event.remove();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <DropdownAlert
          ref={ref => {
            this.dropdown = ref;
          }}
          zIndex={Number.MAX_SAFE_INTEGER}
          closeInterval={1500}
        />
        <Provider store={store}>
          <AppWithNavigationState />
        </Provider>
      </View>
    );
  }
}

export default Root;
