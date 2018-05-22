import React from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import Separator from '../flatlistHelpers/Separator';
import RealtyItem from '../RealtyItem';
import { _dims } from '../../utils/constants';
import * as routes from '../../navigators/defineRoutes';
import Spin from '../common/Spinner';

class FavoriteAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loading: true
    };
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
          data={this.props.listRealty}
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

export default connect(state => ({ listRealty: state.listRealty }))(FavoriteAuth);
