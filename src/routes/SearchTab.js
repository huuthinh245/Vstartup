import React from 'react';
import { View, Easing, Text } from 'react-native';
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
import {
  addHistoryAction,
  deleteHistoryAction
} from '../redux/listHistory/actions';

import * as routes from './routes';
import Map from '../components/map';
import TabFilter from '../components/TabFilter';

json = obj => JSON.stringify(obj);

const DEFAULT_LAT = 10.762622;
const DEFAULT_LON = 106.660172;

const options = {
  enableHighAccuracy: true,
  // timeout: 20000,
  maximumAge: 1000,
  distanceFilter: 100
};

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

  componentDidMount() {
    emitter.addListener('flip', () => this.setState({ isFlipped: false }));
    emitter.addListener('mapFly', obj => {
      const opts = this.state.options;
      const options = Object.assign(
        {
          lat: opts.lat,
          lng: opts.lng,
          address: opts.address,
          userId: opts.userId
        },
        obj
      );
      this.setState({ options });
    });
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

    navigator.geolocation.getCurrentPosition(
      onWatchSuccess,
      onWatchError,
      options
    );
  };

  _clearText = async () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { options } = this.state;
        options.lat = coords.latitude;
        options.lng = coords.longitude;
        options.address = '';
        this.setState({ options });
        emitter.emit('mapFly', {
          lat: coords.latitude,
          lng: coords.longitude
        });
      },
      () => {
        const { options } = this.state;
        options.lat = DEFAULT_LAT;
        options.lng = DEFAULT_LON;
        options.address = '';
        this.setState({ options });
      },
      options
    );
  };

  _flip = () => {
    this.setState({ isFlipped: !this.state.isFlipped });
  };

  _onAutoComplete = () => {
    RNGooglePlaces.openAutocompleteModal()
      .then(val => {
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
          emitter.emit('mapFly', {
            lat: val.latitude,
            lng: val.longitude
          });
        }
      })
      .catch(error => console.log(error.message));
  };

  convertRealtyTypes = info => {
    const { realtyTypes } = this.props;
    const data = Object.assign({}, info);
    if (data.type) {
      Object.assign(data, { type: realtyTypes[parseInt(data.type, 0)].id });
    }
    return data;
  };
  _onFilterPress = () => {
    this.props.navigation.navigate(routes.filterScreen, {
      onDone: options => {
        const data = this.convertRealtyTypes(options);
        this.setState({ options });
        getSearchRealtyAction(data);
        refreshMapRealtyAction(data);
      },
      options: this.state.options
    });
  };

  _saveKeyword = () => {
    if (!this.state.options.address || !this.state.options.lat) {
      return;
    }
    const bookmarked = this.props.history.data.some(
      item =>
        item.coordinate.lat === this.state.options.lat &&
        item.coordinate.lng === this.state.options.lng
    );
    if (!bookmarked) {
      const options = Object.assign({}, this.state.options);
      delete options.lat;
      delete options.lng;
      delete options.address;
      delete options.userId;

      addHistoryAction(
        this.state.options.address,
        this.state.options.lat,
        this.state.options.lng,
        { filter: JSON.stringify(this.convertRealtyTypes(options)) }
      );
    } else {
      this.props.navigation.navigate('HistoryTab');
    }
  };

  render() {
    const { searchRealty, mapRealty, navigation, auth, history } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          flipIcon={!this.state.isFlipped ? 'md-list' : 'md-pin'}
          onFlipPress={this._flip}
          title={this.state.options.address}
          onTitlePress={this._onAutoComplete}
          onFilterPress={this._onFilterPress}
          editText={!this.state.editing ? 'Edit' : 'Done'}
          bookmarkAddress={this._saveKeyword}
          adding={history.adding}
          bookmarked={history.data.some(
            item =>
              item.coordinate.lat === this.state.options.lat &&
              item.coordinate.lng === this.state.options.lng
          )}
          clearAddress={this._clearText}
        />
        <View style={{ flex: 1 }}>
          <FlipView
            style={{ flex: 1 }}
            front={
              <View style={{ flex: 1 }}>
                {/* <TabFilter /> */}
                <Map
                  {...mapRealty}
                  init={[DEFAULT_LAT, DEFAULT_LON]}
                  options={this.convertRealtyTypes(this.state.options)}
                  navigation={navigation}
                  auth={auth}
                />
              </View>
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
  auth: state.auth.user,
  history: state.listHistory,
  realtyTypes: state.options.data.realtyTypes
}))(SearchTab);
