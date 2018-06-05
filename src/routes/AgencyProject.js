import React from 'react';
import { View, TouchableOpacity, Text, FlatList, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';

import { Empty } from '../components/flatlistHelpers';

import Header from '../navigators/headers/CommonHeader';
import errorStrings from '../localization/error';
import headerStrings from '../localization/header';
import * as routes from '../routes/routes';
import { _dims, LIMIT_SERVICES } from '../utils/constants';
import {
  getAgencyProjectAction,
  loadMoreAgencyProjectAction
} from '../redux/agencyProject/actions';
import { styles } from '../components/AuthDetail';

class AgencyProject extends React.Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
  }

  componentDidMount() {
    const { user } = this.props.navigation.state.params;
    getAgencyProjectAction({ author_id: user.id });
  }

  _onLoadMore = () => {
    if (this.props.agencyProject.fetching || this.onEndReachedCalledDuringMomentum) return;
    const { user } = this.props.navigation.state.params;
    const len = this.props.agencyProject.data.length;
    const page = Math.round(len / LIMIT_SERVICES) + 1;
    loadMoreAgencyProjectAction({ author_id: user.id, page });
  };

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate(routes.projectDetail, { data: item });
        }}
        style={styles.item}
      >
        <View style={styles.itemImage}>
          <FastImage
            source={{
              uri: item.thumb,
              priority: FastImage.priority.high
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>

        <View style={styles.itemInfo}>
          <Text numberOfLines={2} style={styles.itemName}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={styles.itemPrice}>
            {item.price} {item.price_unit}
          </Text>
          <Text numberOfLines={1} style={styles.itemAddress}>
            {item.address}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  _renderFooter = () => {
    if (this.props.agencyProject.fetching || !this.props.agencyProject.loadMore) return null;
    return <ActivityIndicator animating style={styles.indicator} />;
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Header title={headerStrings.agencyProject} />
        {this.props.agencyProject.fetching ? (
          <ActivityIndicator animating style={styles.indicator} />
        ) : (
          <FlatList
            style={{ marginHorizontal: _dims.defaultPadding, paddingBottom: 100 }}
            data={this.props.agencyProject.data[this.props.navigation.state.params.user.id]}
            renderItem={this._renderItem}
            keyExtractor={item => `${item.id}`}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={() => <Empty title={errorStrings.emptyListContact} />}
            ListHeaderComponent={() => <View style={{ height: _dims.defaultPadding }} />}
            ListFooterComponent={this._renderFooter}
            onEndReached={this._onLoadMore}
            onEndReachedThreshold={0}
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
          />
        )}
      </View>
    );
  }
}

export default connect(state => ({ agencyProject: state.agencyProject }))(AgencyProject);
