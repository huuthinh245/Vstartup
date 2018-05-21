import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import Spin from '../common/Spinner';

import Separator from '../flatlistHelpers/Separator';
import RealtyItem from '../RealtyItem';
import { _dims, json, LIMIT_SERVICES } from '../../utils/constants';
import * as routes from '../../navigators/defineRoutes';

class SearchFront extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  _renderItem = ({ item }) => {
    return (
      <RealtyItem
        data={item}
        {...this.props}
        showPin={item.id % 2 === 0 && { color: 'gold' }}
        onPress={() => this.props.navigation.navigate(routes.realtyDetail, { data: item })}
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.listRealty.loading && <Spin />}
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
export default connect(state => ({ listRealty: state.listRealty }))(SearchFront);
