import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import errorStrings from '../../localization/error';
import { Separator, Empty } from '../flatlistHelpers';
import RealtyItem from '../RealtyItem';
import { _dims, LIMIT_SERVICES } from '../../utils/constants';
import * as routes from '../../routes/routes';
import { likeRealtyAction, unlikeRealtyAction } from '../../redux/realtyDetail/actions';
import { loadMoreMapRealtyAction, refreshMapRealtyAction } from '../../redux/searchRealty/actions';

const indicator = {
  alignSelf: 'center',
  bottom: 10,
  position: 'absolute',
  zIndex: 100
};

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
    const { searchRealty } = this.props;
    if (searchRealty.loadMore || this.onEndReachedCalledDuringMomentum) return;
    const len = searchRealty.data.length;
    const page = Math.round(len / LIMIT_SERVICES) + 1;
    this.setState({ options: Object.assign(this.state.options, { page }) }, () =>
      loadMoreMapRealtyAction(this.state.options)
    );

    this.onEndReachedCalledDuringMomentum = true;
  };

  _onRefresh = () => {
    if (this.props.searchRealty.refreshing) return;
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

  render() {
    const { searchRealty } = this.props;
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <FlatList
          data={searchRealty.data}
          renderItem={this._renderItem}
          keyExtractor={item => `${item.id}`}
          ListHeaderComponent={() => <Separator height={_dims.defaultPadding} />}
          ListFooterComponent={<View style={{ height: _dims.defaultPadding }} />}
          ListEmptyComponent={<Empty title={errorStrings.emptyListSearch} />}
          ItemSeparatorComponent={() => <Separator height={_dims.defaultPadding} />}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
          refreshing={searchRealty.refreshing}
          onEndReachedThreshold={0.1}
          onRefresh={this._onRefresh}
          onEndReached={this._onLoadMore}
        />
        {this.props.searchRealty.loadMore && <ActivityIndicator animating style={indicator} />}
      </View>
    );
  }
}
export default connect(state => ({
  searchRealty: state.searchRealty,
  auth: state.auth,
  agencyDetail: state.agencyDetail
}))(SearchBack);
