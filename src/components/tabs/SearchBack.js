import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import errorStrings from '../../localization/error';
import { Separator, Empty } from '../flatlistHelpers';
import RealtyItem from '../RealtyItem';
import { _dims, LIMIT_SERVICES } from '../../utils/constants';
import * as routes from '../../routes/routes';
import { likeRealtyAction, unlikeRealtyAction } from '../../redux/realtyDetail/actions';
import { loadMoreMapRealtyAction, refreshMapRealtyAction } from '../../redux/mapRealty/actions';

class SearchBack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {}
    };
    this.onEndReachedCalledDuringMomentum = true;
  }

  _likeRealty = async realty => {
    if (!this.props.auth.user.id) {
      this.props.navigation.navigate(routes.login, { modal: true });
      return;
    }
    if (!this.props.agencyDetail.postingFavorite) {
      if (realty.is_favorite) {
        unlikeRealtyAction(realty);
      } else {
        likeRealtyAction(realty);
      }
    }
  };

  _onLoadMore = () => {
    const { mapRealty } = this.props;
    if (mapRealty.loadMore || this.onEndReachedCalledDuringMomentum) return;
    const len = mapRealty.data.length;
    const page = Math.round(len / LIMIT_SERVICES) + 1;
    this.setState({ options: Object.assign(this.state.options, { page }) }, () =>
      loadMoreMapRealtyAction(this.state.options)
    );

    this.onEndReachedCalledDuringMomentum = true;
  };

  _onRefresh = () => {
    if (this.props.mapRealty.refreshing) return;
    refreshMapRealtyAction(this.state.options);
  };

  _renderItem = ({ item }) => {
    return (
      <RealtyItem
        data={item}
        showPin={item.id % 2 === 0 && { color: 'gold' }}
        onPress={() => this.props.navigation.navigate(routes.realtyDetail, { data: item })}
        onLikeRealty={() => this._likeRealty(item)}
      />
    );
  };

  _renderFooter = () => {
    if (this.props.mapRealty.loadMore) {
      return (
        <ActivityIndicator
          style={{
            alignSelf: 'center',
            marginVertical: 10
          }}
        />
      );
    }
    return <View style={{ height: _dims.defaultPadding }} />;
  };

  render() {
    const { mapRealty } = this.props;
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <FlatList
          data={mapRealty.data}
          renderItem={this._renderItem}
          keyExtractor={item => `${item.id}`}
          ListHeaderComponent={() => <Separator height={_dims.defaultPadding} />}
          ListFooterComponent={this._renderFooter}
          ListEmptyComponent={<Empty title={errorStrings.emptyListSearch} />}
          ItemSeparatorComponent={() => <Separator height={_dims.defaultPadding} />}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
          refreshing={mapRealty.refreshing}
          onEndReachedThreshold={0}
          onRefresh={this._onRefresh}
          onEndReached={this._onLoadMore}
        />
      </View>
    );
  }
}
export default connect(state => ({
  mapRealty: state.mapRealty,
  auth: state.auth,
  agencyDetail: state.agencyDetail
}))(SearchBack);
