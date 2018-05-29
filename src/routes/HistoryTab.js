import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Login from '../components/authorization/login';
import Separator from '../components/flatlistHelpers/Separator';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import { _dims, _colors } from '../utils/constants';
import { PlaceHolder } from '../components/RealtyItem';
import * as routes from '../routes/routes';
import HistoryItem from '../components/HistoryItem';
import { getListHistoryAction, refreshListHistoryAction } from '../redux/listHistory/actions';

class HistoryTab extends React.Component {
  componentDidMount() {
    if (this.props.auth.token) {
      getListHistoryAction();
    }
  }

  _onRefresh = () => {
    if (this.props.listHistory.refreshing) return;
    refreshListHistoryAction();
  };

  _renderItem = ({ item }) => {
    return (
      <HistoryItem
        data={item}
        {...this.props}
        onPress={() => this.props.navigation.navigate(routes.realtyDetail, { data: item })}
      />
    );
  };

  _renderWithAuth = () => {
    const { listHistory } = this.props;
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
        {listHistory.fetching ? (
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
            data={listHistory.data}
            renderItem={this._renderItem}
            keyExtractor={item => `${item.id}`}
            ListHeaderComponent={() => <Separator height={_dims.defaultPadding} />}
            ItemSeparatorComponent={() => <Separator height={_dims.defaultPadding} />}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            refreshing={listHistory.refreshing}
            onRefresh={this._onRefresh}
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
  listHistory: state.listHistory
}))(HistoryTab);
