import React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import Separator from '../flatlistHelpers/Separator';
import RealtyItem from '../RealtyItem';
import { _dims } from '../../utils/constants';
import * as routes from '../../navigators/defineRoutes';
import Spin from '../common/Spinner';
import {
  GET_LIST_FAVORITE_SUCCESS,
  REFRESH_LIST_FAVORITE_SUCCESS
} from '../../redux/listFavorite/reducer';

import { realtyApi } from '../../utils/api';
import alertStrings from '../../localization/alert';

class FavoriteAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loading: true
    };
  }

  componentDidMount() {
    const callback = (error, data, response) => {
      this.setState({ loading: false });
      if (error) {
        _alert(alertStrings.error, response.body.message);
      } else {
        this.props.dispatch({
          type: GET_LIST_FAVORITE_SUCCESS,
          payload: data
        });
      }
    };
    realtyApi.listFavorite({ page: 1 }, callback);
  }

  _renderItem = ({ item }) => {
    return (
      <RealtyItem
        data={item}
        {...this.props}
        onPress={() => this.props.navigation.navigate(routes.realtyDetail, { data: item })}
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.loading && <Spin />}
        <FlatList
          style={{
            flex: 1,
            marginHorizontal: _dims.defaultPadding
          }}
          data={this.props.listFavorite}
          renderItem={this._renderItem}
          keyExtractor={item => `${Math.random()}`}
          ItemSeparatorComponent={() => <Separator height={_dims.defaultPadding} />}
          ListHeaderComponent={() => <Separator height={_dims.defaultPadding} />}
          ListFooterComponent={() => <Separator height={_dims.defaultPadding} />}
          refreshing={this.state.refreshing}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
          onEndReachedThreshold={0}
          onRefresh={this._onRefresh}
          onEndReached={this._onLoadMore}
        />
      </View>
    );
  }
}

export default connect(state => ({ listFavorite: state.listFavorite }))(FavoriteAuth);
