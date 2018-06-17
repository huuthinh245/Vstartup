import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import {
  responsiveFontSize,
  _dims,
  responsiveHeight,
  _colors,
  LIMIT_SERVICES
} from '../utils/constants';
import Header from '../navigators/headers/ListAgency';
import errorStrings from '../localization/error';
import AgencyItem from '../components/AgencyItem';
import { Separator, PlaceHolder, Empty } from '../components/flatlistHelpers';
import * as routes from './routes';
import {
  getListAgencyAction,
  refreshListAgencyAction,
  loadMoreListAgencyAction,
  searchListAgencyAction
} from '../redux/listAgency/actions';
import Overlay from '../components/common/Overlay';

class ListAgency extends React.Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
    this.state = {
      keyword: ''
    };
  }

  componentDidMount() {
    getListAgencyAction();
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
    loadMoreListAgencyAction({ page, keyword: this.state.keyword });
    this.onEndReachedCalledDuringMomentum = true;
  };

  _onRefresh = () => {
    if (this.props.listAgency.refreshing) return;
    refreshListAgencyAction({ keyword: this.state.keyword });
  };

  _renderFooter = () => {
    if (this.props.listAgency.fetching || !this.props.listAgency.loadMore) {
      return <View style={{ height: _dims.defaultPadding }} />;
    }
    return <ActivityIndicator animating style={{ alignSelf: 'center', marginVertical: 10 }} />;
  };

  render() {
    const { listAgency } = this.props;
    return (
      <View style={styles.wrapper}>
        <Header
          navigation={this.props.navigation}
          value={this.state.keyword}
          onChangeText={keyword => {
            this.setState({ keyword }, () => {
              if (!this.props.listAgency.searching) {
                searchListAgencyAction({ keyword });
              }
            });
          }}
        />
        {listAgency.fetching ? (
          <PlaceHolder />
        ) : (
          <View style={{ flex: 1 }}>
            <Overlay visible={listAgency.searching} />
            <FlatList
              style={{ flex: 1, marginHorizontal: _dims.defaultPadding }}
              data={listAgency.data}
              numColumns={2}
              renderItem={this._renderItem}
              keyExtractor={item => `${item.id}`}
              ListHeaderComponent={() => <Separator height={_dims.defaultPadding} />}
              ListFooterComponent={() => <View style={{ height: _dims.defaultPadding }} />}
              ItemSeparatorComponent={() => <Separator height={_dims.defaultPadding} />}
              ListEmptyComponent={() => <Empty title={errorStrings.emptyAgency} />}
              onMomentumScrollBegin={() => {
                this.onEndReachedCalledDuringMomentum = false;
              }}
              refreshing={listAgency.refreshing}
              onEndReachedThreshold={0.1}
              onRefresh={this._onRefresh}
              onEndReached={this._onLoadMore}
            />
            {listAgency.loadMore && <ActivityIndicator animating style={styles.indicator} />}
          </View>
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
  },
  indicator: {
    alignSelf: 'center',
    bottom: 10,
    position: 'absolute',
    zIndex: 100
  }
});
