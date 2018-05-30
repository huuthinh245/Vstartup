import React from 'react';
import { FlatList, ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import Separator from '../components/flatlistHelpers/Separator';
import { _dims, LIMIT_SERVICES, _colors } from '../utils/constants';
import FavoriteItem, { PlaceHolder } from '../components/RealtyItem';
import { likeRealtyAction, unlikeRealtyAction } from '../redux/realtyDetail/actions';
import {
  getListFavoriteAction,
  loadMoreListFavoriteAction,
  refreshListFavoriteAction
} from '../redux/listFavorite/actions';
import * as routes from '../routes/routes';

class ListFavorite extends React.Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
  }
  componentDidMount() {
    getListFavoriteAction();
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

  render = () => {
    const { listFavorite } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header title={headerStrings.favoriteTitle} outer />
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
            data={this.props.listFavorite.data}
            renderItem={this._renderItem}
            keyExtractor={item => `${item.id}`}
            ListHeaderComponent={() => <Separator height={_dims.defaultPadding} />}
            ListFooterComponent={this._renderFooter}
            ItemSeparatorComponent={() => <Separator height={_dims.defaultPadding} />}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            refreshing={this.props.listFavorite.refreshing}
            onEndReachedThreshold={0}
            onRefresh={this._onRefresh}
            onEndReached={this._onLoadMore}
          />
        )}
      </View>
    );
  };
}

export default connect(state => ({
  listFavorite: state.listFavorite,
  realtyDetail: state.realtyDetail
}))(ListFavorite);
