import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import Separator from '../flatlistHelpers/Separator';
import RealtyItem, { PlaceHolder } from '../RealtyItem';
import { _dims, LIMIT_SERVICES } from '../../utils/constants';
import * as routes from '../../routes/routes';
import { likeRealtyAction, unlikeRealtyAction } from '../../redux/realtyDetail/actions';
import { loadMoreListRealtyAction, refreshListRealtyAction } from '../../redux/listRealty/actions';

class SearchFront extends React.Component {
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
    if (!this.props.listRealty.postingFavorite) {
      if (realty.is_favorite) {
        unlikeRealtyAction(realty);
      } else {
        likeRealtyAction(realty);
      }
    }
  };

  _onLoadMore = () => {
    if (this.props.listRealty.loadMore || this.onEndReachedCalledDuringMomentum) return;
    const len = this.props.listRealty.data.length;
    const page = Math.round(len / LIMIT_SERVICES) + 1;
    this.setState({ options: Object.assign(this.state.options, { page }) }, () =>
      loadMoreListRealtyAction(this.state.options)
    );

    this.onEndReachedCalledDuringMomentum = true;
  };

  _onRefresh = () => {
    if (this.props.listRealty.refreshing) return;
    refreshListRealtyAction(this.state.options);
  };

  _renderItem = ({ item }) => {
    return (
      <RealtyItem
        data={item}
        {...this.props}
        showPin={item.id % 2 === 0 && { color: 'gold' }}
        onPress={() => this.props.navigation.navigate(routes.realtyDetail, { data: item })}
        onLikeRealty={() => this._likeRealty(item)}
      />
    );
  };

  _renderFooter = () => {
    if (this.props.listRealty.loadMore) {
      return (
        <ActivityIndicator
          style={{
            alignSelf: 'center',
            marginVertical: 10
          }}
        />
      );
    }
    return null;
  };

  render() {
    const { listRealty } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {listRealty.fetching ? (
          <View>
            <PlaceHolder />
            <Separator height={_dims.defaultPadding} />
            <PlaceHolder />
            <Separator height={_dims.defaultPadding} />
            <PlaceHolder />
            <Separator height={_dims.defaultPadding} />
            <PlaceHolder />
            <Separator height={_dims.defaultPadding} />
            <PlaceHolder />
          </View>
        ) : (
          <FlatList
            style={{ flex: 1, marginHorizontal: _dims.defaultPadding }}
            data={listRealty.data}
            renderItem={this._renderItem}
            keyExtractor={item => `${item.id}`}
            ListHeaderComponent={() => <Separator height={_dims.defaultPadding} />}
            ListFooterComponent={this._renderFooter}
            ItemSeparatorComponent={() => <Separator height={_dims.defaultPadding} />}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            refreshing={listRealty.refreshing}
            onEndReachedThreshold={0}
            onRefresh={this._onRefresh}
            onEndReached={this._onLoadMore}
          />
        )}
      </View>
    );
  }
}
export default connect(state => ({ listRealty: state.listRealty, auth: state.auth }))(SearchFront);
