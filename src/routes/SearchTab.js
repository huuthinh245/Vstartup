import React from 'react';
import { View, Easing } from 'react-native';
import { connect } from 'react-redux';
import FlipView from 'react-native-flip-view-next';
import RNGooglePlaces from 'react-native-google-places';
import { isEmpty } from 'lodash';

import Overlay from '../components/common/Overlay';
import Header from '../navigators/headers/SearchTab';
import SearchBack from '../components/tabs/SearchBack';
import { PlaceHolder } from '../components/flatlistHelpers';
import { getMapRealtyAction } from '../redux/mapRealty/actions';
import { getSearchRealtyAction } from '../redux/searchRealty/actions';
import * as routes from './routes';
import Map from '../components/map';

json = obj => JSON.stringify(obj);

class SearchTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false,
      options: {
        lat: undefined,
        lng: undefined
      }
    };
  }

  componentDidMount() {
    getMapRealtyAction();
    getSearchRealtyAction();
  }

  _flip = () => {
    this.setState({ isFlipped: !this.state.isFlipped });
  };

  render() {
    const mapRealtyData = this.props.mapRealty.data;
    const searchRealtyData = this.props.searchRealty.data;
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          flipIcon={!this.state.isFlipped ? 'md-list' : 'md-pin'}
          onFlipPress={this._flip}
          title={this.state.searchAddress}
          onTitlePress={async () => {
            const val = await RNGooglePlaces.openPlacePickerModal();
            if (
              val.latitude !== this.state.options.lat &&
              val.longitude !== this.state.options.lng
            ) {
              const options = Object.assign({}, this.state.options, {
                lat: val.latitude,
                lng: val.longitude
              });
              this.setState({ options }, () => getSearchRealtyAction(this.state.options));
            }
          }}
          onFilterPress={() =>
            this.props.navigation.navigate(routes.filterScreen, {
              onDone: options =>
                this.setState({ options }, () => getSearchRealtyAction(this.state.options)),
              options: this.state.options
            })
          }
          editText={!this.state.editing ? 'Edit' : 'Done'}
        />
        <View style={{ flex: 1 }}>
          {!isEmpty(mapRealtyData) && !isEmpty(searchRealtyData) ? (
            <FlipView
              style={{ flex: 1 }}
              front={<Map mapRealtyData={mapRealtyData} searchRealtyData={searchRealtyData} />}
              back={<SearchBack {...this.props} />}
              isFlipped={this.state.isFlipped}
              flipAxis="y"
              flipEasing={Easing.out(Easing.ease)}
              flipDuration={500}
              perspective={1000}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

export default connect(state => ({ mapRealty: state.mapRealty, searchRealty: state.searchRealty }))(
  SearchTab
);
