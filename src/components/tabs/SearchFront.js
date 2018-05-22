import React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Spin from '../common/Spinner';

import Separator from '../flatlistHelpers/Separator';
import RealtyItem from '../RealtyItem';
import { _dims, json, LIMIT_SERVICES } from '../../utils/constants';
import * as routes from '../../navigators/defineRoutes';
import { likeRealtyAction, unlikeRealtyAction } from '../../redux/realtyDetail/actions';

class SearchFront extends React.Component {
  _likeRealty = async realty => {
    if (!this.props.auth.user.id) {
      this.props.navigation.navigate(routes.login, { modal: true });
      return;
    }
    if (!this.props.realtyDetail.postingFavorite) {
      if (realty.is_favorite) {
        unlikeRealtyAction(realty);
      } else {
        likeRealtyAction(realty);
      }
    }
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.listRealty.fetching && <Spin />}
        <FlatList
          style={{
            flex: 1,
            marginHorizontal: _dims.defaultPadding
          }}
          data={this.props.listRealty.data}
          renderItem={this._renderItem}
          keyExtractor={item => `${item.id}`}
          ItemSeparatorComponent={() => <Separator height={_dims.defaultPadding} />}
          ListHeaderComponent={() => <Separator height={_dims.defaultPadding} />}
          ListFooterComponent={() => <Separator height={_dims.defaultPadding} />}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
          refreshing={this.props.listRealty.refreshing}
          onEndReachedThreshold={0}
          onRefresh={this._onRefresh}
          onEndReached={this._onLoadMore}
        />
      </View>
    );
  }
}
export default connect(state => ({ listRealty: state.listRealty, auth: state.auth }))(SearchFront);
