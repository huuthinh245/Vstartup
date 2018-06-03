import { createStore, applyMiddleware, compose } from 'redux';
import { View, StatusBar } from 'react-native';
import { Provider, connect } from 'react-redux';
import React from 'react';
import { createEpicMiddleware } from 'redux-observable';
import DropdownAlert from 'react-native-dropdownalert';

import epics from './redux/epics';
import { AppNavigator } from './navigators/Root';
import { addListener, middleware } from './utils/navigationRedux';
import { reducers } from './redux/reducer';
import emitter from './emitter';
import { _ios, _colors } from './utils/constants';
import { _setupGoogleSignin } from './components/authorization/login/google';

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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = [applyMiddleware(middleware, epicMiddleware)];

export const store = createStore(reducers, {}, composeEnhancers(...enhancers));

class Root extends React.Component {
  componentDidMount() {
    _setupGoogleSignin();
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
        <StatusBar
          barStyle="dark-content"
          backgroundColor={_ios ? 'transparent' : _colors.header}
        />
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
