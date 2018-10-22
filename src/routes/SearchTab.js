import React from 'react';
import { View, Easing } from 'react-native';
import { connect } from 'react-redux';
import FlipView from 'react-native-flip-view-next';
import RNGooglePlaces from 'react-native-google-places';

import emitter from '../emitter';
import Header from '../navigators/headers/SearchTab';
import SearchBack from '../components/tabs/SearchBack';
import {
  getMapRealtyAction,
  refreshMapRealtyAction
} from '../redux/mapRealty/actions';
import { getSearchRealtyAction } from '../redux/searchRealty/actions';
import { addHistoryAction } from '../redux/listHistory/actions';
import * as routes from './routes';
import Map from '../components/map';

json = obj => JSON.stringify(obj);

const DEFAULT_LAT = 10.762622;
const DEFAULT_LON = 106.660172;

class SearchTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
      options: {
        lat: DEFAULT_LAT,
        lng: DEFAULT_LON,
        address: undefined,
        userId: this.props.auth.id
      }
    };
    this._watchPosition();
  }

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps.auth;
    const { options } = this.state;
    if (id !== this.props.auth.id) {
      if (id) {
        options.userId = id;
      } else {
        delete options.userId;
      }
      this.setState({ options });
    }
  }

  _watchPosition = () => {
    const onWatchSuccess = ({ coords }) => {
      const { options } = this.state;
      options.lat = coords.latitude;
      options.lng = coords.longitude;

      this.setState({ options });
      getMapRealtyAction(options);
      getSearchRealtyAction(options);
    };

    const onWatchError = error => {
      const { options } = this.state;

      getMapRealtyAction(options);
      getSearchRealtyAction(options);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
      distanceFilter: 100
    };

    navigator.geolocation.getCurrentPosition(
      onWatchSuccess,
      onWatchError,
      options
    );
  };

  _flip = () => {
    this.setState({ isFlipped: !this.state.isFlipped });
  };

  _onAutoComplete = async () => {
    const val = await RNGooglePlaces.openAutocompleteModal();
    if (
      val.latitude !== this.state.options.lat &&
      val.longitude !== this.state.options.lng
    ) {
      const options = Object.assign({}, this.state.options, {
        lat: val.latitude,
        lng: val.longitude,
        address: val.address
      });
      this.setState({ options });
      getSearchRealtyAction(options);
      getMapRealtyAction(options);
      addHistoryAction(val.address, val.latitude, val.longitude, {
        filter: JSON.stringify(this.state.options)
      });
      emitter.emit('mapFly', {
        latitude: val.latitude,
        longitude: val.longitude
      });
    }
  };

  _onFilterPress = () => {
    this.props.navigation.navigate(routes.filterScreen, {
      onDone: options => {
        this.setState({ options });
        getSearchRealtyAction(options);
        refreshMapRealtyAction(options);
      },
      options: this.state.options
    });
  };

  render() {
    const { searchRealty, mapRealty, navigation, auth } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          flipIcon={!this.state.isFlipped ? 'md-list' : 'md-pin'}
          onFlipPress={this._flip}
          title={this.state.options.address}
          onTitlePress={this._onAutoComplete}
          onFilterPress={this._onFilterPress}
          editText={!this.state.editing ? 'Edit' : 'Done'}
        />
        <View style={{ flex: 1 }}>
          <FlipView
            style={{ flex: 1 }}
            front={
              <Map
                {...mapRealty}
                init={[DEFAULT_LAT, DEFAULT_LON]}
                options={this.state.options}
                navigation={navigation}
                auth={auth}
              />
            }
            back={
              <SearchBack
                navigation={navigation}
                {...searchRealty}
                options={this.state.options}
                auth={auth}
              />
            }
            isFlipped={this.state.isFlipped}
            flipAxis="y"
            flipEasing={Easing.out(Easing.ease)}
            flipDuration={500}
            perspective={1000}
          />
        </View>
      </View>
    );
  }
}

export default connect(state => ({
  mapRealty: state.mapRealty,
  searchRealty: state.searchRealty,
  auth: state.auth.user
}))(SearchTab);
