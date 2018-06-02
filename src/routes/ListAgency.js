import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';

import {
  responsiveFontSize,
  _dims,
  responsiveHeight,
  _colors,
  LIMIT_SERVICES
} from '../utils/constants';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import AgencyItem, { PlaceHolder } from '../components/AgencyItem';
import Separator from '../components/flatlistHelpers/Separator';
import * as routes from './routes';
import {
  getListAgencyAction,
  refreshListAgencyAction,
  loadMoreListAgencyAction
} from '../redux/listAgency/actions';

class ListAgency extends React.Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
  }

  componentDidMount() {
    getListAgencyAction({ page: 1 });
  }
  _renderItem = ({ item, index }) => {
    const style =
      index % 2 === 0
        ? { marginRight: _dims.defaultPadding / 2 }
        : { marginLeft: _dims.defaultPadding / 2 };
    return (
      <AgencyItem
        onPress={() => this.props.navigation.navigate(routes.agencyDetail, { data: item })}
        data={item}
        style={style}
      />
    );
  };

  _onLoadMore = () => {
    if (this.props.listAgency.loadMore || this.onEndReachedCalledDuringMomentum) return;

    const len = this.props.listAgency.data.length;
    const page = Math.round(len / LIMIT_SERVICES) + 1;
    loadMoreListAgencyAction({ page });
    this.onEndReachedCalledDuringMomentum = true;
  };

  _onRefresh = () => {
    if (this.props.listAgency.refreshing) return;
    refreshListAgencyAction();
  };

  render() {
    const { listAgency } = this.props;
    return (
      <View style={styles.wrapper}>
        <Header
          onLeftPress={() => this.props.navigation.goBack()}
          title={headerStrings.listAgency}
        />
        {listAgency.fetching ? (
          <View style={{ padding: _dims.defaultPadding }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <PlaceHolder />
              <PlaceHolder />
            </View>
            <Separator height={_dims.defaultPadding} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <PlaceHolder />
              <PlaceHolder />
            </View>
            <Separator height={_dims.defaultPadding} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <PlaceHolder />
              <PlaceHolder />
            </View>
            <Separator height={_dims.defaultPadding} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <PlaceHolder />
              <PlaceHolder />
            </View>
            <Separator height={_dims.defaultPadding} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <PlaceHolder />
              <PlaceHolder />
            </View>
            <Separator height={_dims.defaultPadding} />
          </View>
        ) : (
          <FlatList
            style={{ flex: 1, marginHorizontal: _dims.defaultPadding }}
            data={listAgency.data}
            numColumns={2}
            renderItem={this._renderItem}
            keyExtractor={item => `${item.id}`}
            ListHeaderComponent={() => <Separator height={_dims.defaultPadding} />}
            ListFooterComponent={this._renderFooter}
            ItemSeparatorComponent={() => <Separator height={_dims.defaultPadding} />}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            refreshing={listAgency.refreshing}
            onEndReachedThreshold={0}
            onRefresh={this._onRefresh}
            onEndReached={this._onLoadMore}
          />
        )}
      </View>
    );
  }
}

export default connect(state => ({ listAgency: state.listAgency }))(ListAgency);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    marginVertical: _dims.defaultPadding * 2,
    marginLeft: _dims.defaultPadding
  },
  innerWrapper: {
    padding: _dims.defaultPadding
  },
  hoishiWrapper: {
    borderBottomWidth: 1,
    borderColor: _colors.mainColor,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: responsiveHeight(3)
  },
  hoishiIcon: {
    color: _colors.mainColor,
    fontSize: responsiveFontSize(_dims.defaultFontSize + 7),
    alignSelf: 'center'
  },
  hoishiInput: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: _dims.defaultPadding
  }
});
