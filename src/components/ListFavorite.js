import React from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';

import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import errorStrings from '../localization/error';
import { Separator, Empty, PlaceHolder } from '../components/flatlistHelpers';
import { _dims, LIMIT_SERVICES } from '../utils/constants';
import FavoriteItem from '../components/RealtyItem';
import { likeRealtyAction, unlikeRealtyAction } from '../redux/realtyDetail/actions';
import {
  getListFavoriteAction,
  loadMoreListFavoriteAction,
  refreshListFavoriteAction
} from '../redux/listFavorite/actions';
import * as routes from '../routes/routes';

const indicator = {
  alignSelf: 'center',
  bottom: 10,
  position: 'absolute',
  zIndex: 100
};

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

  render = () => {
    const { listFavorite } = this.props;

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header title={headerStrings.favoriteTitle} outer />
        {listFavorite.fetching ? (
          <PlaceHolder />
        ) : (
          <View style={{ flex: 1 }}>
            <FlatList
              data={listFavorite.data}
              renderItem={this._renderItem}
              keyExtractor={item => `${item.id}`}
              ListHeaderComponent={() => <Separator height={_dims.defaultPadding} />}
              ListFooterComponent={() => <View style={{ height: _dims.defaultPadding }} />}
              ItemSeparatorComponent={() => <Separator height={_dims.defaultPadding} />}
              ListEmptyComponent={<Empty title={errorStrings.emptyListFavorite} />}
              onMomentumScrollBegin={() => {
                this.onEndReachedCalledDuringMomentum = false;
              }}
              refreshing={listFavorite.refreshing}
              onEndReachedThreshold={0.1}
              onRefresh={this._onRefresh}
              onEndReached={this._onLoadMore}
            />
            {this.props.listFavorite.loadMore && <ActivityIndicator animating style={indicator} />}
          </View>
        )}
      </View>
    );
  };
}

export default connect(state => ({
  listFavorite: state.listFavorite,
  realtyDetail: state.realtyDetail
}))(ListFavorite);
