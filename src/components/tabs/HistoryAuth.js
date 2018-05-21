import React from 'react';
import { View, FlatList } from 'react-native';
import Spinner from 'react-native-spinkit';

import Separator from '../flatlistHelpers/Separator';
import ProjectItem from '../ProjectItem';
import { _dims, json } from '../../utils/constants';
import * as routes from '../../navigators/defineRoutes';
import Spin from '../common/Spinner';
import { realtyApi } from '../../utils/api';

export default class HistoryAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: false,
      loading: false
    };
  }

  componentDidMount() {
    realtyApi.listRealty();
  } 

  _renderItem = ({ item }) => {
    return (
      <ProjectItem
        data={item}
        {...this.props}
        onPress={() => this.props.navigation.navigate(routes.realtyDetail, { data: item })}
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={{
            flex: 1,
            marginHorizontal: _dims.defaultPadding
          }}
          data={this.state.data}
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
