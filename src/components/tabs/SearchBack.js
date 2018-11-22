import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import errorStrings from '../../localization/error';
import { Separator, Empty } from '../flatlistHelpers';
import RealtyItem from '../RealtyItem';
import { _dims, LIMIT_SERVICES } from '../../utils/constants';
import * as routes from '../../routes/routes';
import {
  likeRealtyAction,
  unlikeRealtyAction
} from '../../redux/realtyDetail/actions';
import {
  loadMoreSearchRealtyAction,
  refreshSearchRealtyAction
} from '../../redux/searchRealty/actions';

const indicator = {
  alignSelf: 'center',
  bottom: 10,
  position: 'absolute',
  zIndex: 100
};

class SearchBack extends React.Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
  }

  _likeRealty = async realty => {
    if (!this.props.auth.id) {
      this.props.navigation.navigate(routes.login, { modal: true });
      return;
    }
    if (realty.is_favorite) {
      unlikeRealtyAction(realty);
    } else {
      likeRealtyAction(realty);
    }
  };

  _onLoadMore = () => {
    const { data, loadMore, options } = this.props;
    if (loadMore || this.onEndReachedCalledDuringMomentum) return;
    const len = data.length;
    const page = Math.round(len / LIMIT_SERVICES) + 1;

    loadMoreSearchRealtyAction(Object.assign(options, { page }));

    this.onEndReachedCalledDuringMomentum = true;
  };

  _onRefresh = () => {
    if (this.props.refreshing) return;
    refreshSearchRealtyAction(this.props.options);
  };

  _renderItem = ({ item }) => {
    return (
      <RealtyItem
        data={item}
        showPin
        onPress={() =>
          this.props.navigation.navigate(routes.realtyDetail, { data: item })
        }
        onLikeRealty={() => this._likeRealty(item)}
      />
    );
  };

  render() {
    const { data, fetching, refreshing, loadMore } = this.props;
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        {fetching && (
          <ActivityIndicator
            style={{ alignSelf: 'center', marginVertical: 15 }}
          />
        )}
        <FlatList
          data={data}
          renderItem={this._renderItem}
          keyExtractor={item => `${item.id}`}
          ListHeaderComponent={() => (
            <Separator height={_dims.defaultPadding} />
          )}
          ListFooterComponent={
            <View style={{ height: _dims.defaultPadding }} />
          }
          ListEmptyComponent={
            !fetching && <Empty title={errorStrings.emptyListSearch} />
          }
          ItemSeparatorComponent={() => (
            <Separator height={_dims.defaultPadding} />
          )}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
          refreshing={refreshing}
          onEndReachedThreshold={0.1}
          onRefresh={this._onRefresh}
          onEndReached={this._onLoadMore}
        />
        {loadMore && <ActivityIndicator animating style={indicator} />}
      </View>
    );
  }
}
export default SearchBack;
