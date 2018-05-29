import React from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Login from '../components/authorization/login';
import Separator from '../components/flatlistHelpers/Separator';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import { _dims, _colors, LIMIT_SERVICES } from '../utils/constants';
import FavoriteItem, { PlaceHolder } from '../components/RealtyItem';
import { likeRealtyAction, unlikeRealtyAction } from '../redux/realtyDetail/actions';
import {
  getListFavoriteAction,
  loadMoreListFavoriteAction,
  refreshListFavoriteAction
} from '../redux/listFavorite/actions';
import * as routes from '../routes/routes';

class FavoriteTab extends React.Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
  }
  componentDidMount() {
    if (this.props.auth.token) {
      getListFavoriteAction();
    }
  }

  _likeRealty = async realty => {
    if (this.props.realtyDetail.postingFavorite) return;
    if (realty.is_favorite) {
      unlikeRealtyAction(realty);
    } else {
      likeRealtyAction(realty);
    }
  };

  _onLoadMore = () => {
    if (
      this.props.listFavorite.loadMore ||
      this.props.listFavorite.fetching ||
      this.props.listFavorite.refreshing ||
      this.onEndReachedCalledDuringMomentum
    ) {
      return;
    }

    const len = this.props.listFavorite.data.length;
    const page = Math.round(len / LIMIT_SERVICES) + 1;
    loadMoreListFavoriteAction({ page });
    this.onEndReachedCalledDuringMomentum = true;
  };

  _onRefresh = () => {
    if (this.props.listFavorite.refreshing) return;
    refreshListFavoriteAction();
  };

  _renderItem = ({ item }) => {
    return (
      <FavoriteItem
        data={item}
        {...this.props}
        onPress={() => this.props.navigation.navigate(routes.realtyDetail, { data: item })}
        onLikeRealty={() => this._likeRealty(item)}
      />
    );
  };

  _renderFooter = () => {
    if (this.props.listFavorite.loadMore) {
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

  _renderWithAuth = () => {
    const { listFavorite } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header
          title={headerStrings.favoriteTitle}
          outer
          right={
            <TouchableOpacity>
              <Ionicons
                name="md-more"
                size={30}
                color={_colors.mainColor}
                style={{ padding: 10 }}
              />
            </TouchableOpacity>
          }
        />
        {listFavorite.fetching ? (
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
            data={listFavorite.data}
            renderItem={this._renderItem}
            keyExtractor={item => `${item.id}`}
            ListHeaderComponent={() => <Separator height={_dims.defaultPadding} />}
            ListFooterComponent={this._renderFooter}
            ItemSeparatorComponent={() => <Separator height={_dims.defaultPadding} />}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            refreshing={listFavorite.refreshing}
            onEndReachedThreshold={0}
            onRefresh={this._onRefresh}
            onEndReached={this._onLoadMore}
          />
        )}
      </View>
    );
  };

  render() {
    return this.props.auth.user.id ? this._renderWithAuth() : <Login {...this.props} />;
  }
}

export default connect(state => ({
  auth: state.auth,
  listFavorite: state.listFavorite,
  options: state.options,
  realtyDetail: state.realtyDetail
}))(FavoriteTab);
