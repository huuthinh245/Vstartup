import React from 'react';
import { View, TouchableOpacity, Text, FlatList, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { PlaceHolder } from '../components/RealtyItem';
import * as routes from '../routes/routes';
import errorStrings from '../localization/error';
import strings from '../localization/profile';
import AirbnbRating from '../components/rating';
import { Empty, Separator } from '../components/flatlistHelpers';
import { responsiveFontSize, _dims, LIMIT_SERVICES } from '../utils/constants';
import {
  getAgencyRealtyAction,
  loadMoreAgencyRealtyAction,
  refreshAgencyRealtyAction
} from '../redux/agencyRealty/actions';
import { styles } from './AuthDetail';

class AgencyDetail extends React.Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
  }

  componentDidMount() {
    const { user } = this.props;
    getAgencyRealtyAction({ author_id: user.id });
  }

  _onLoadMore = () => {
    if (this.props.agencyRealty.loadMore || this.onEndReachedCalledDuringMomentum) return;
    const { user } = this.props;
    const len = this.props.agencyRealty.data[user.id].length;
    const page = Math.round(len / LIMIT_SERVICES) + 1;
    loadMoreAgencyRealtyAction({ author_id: user.id, page });
  };

  _onRefresh = () => {
    if (this.props.agencyRealty.refreshing || this.props.agencyRealty.fetching) return;
    const { user } = this.props;
    refreshAgencyRealtyAction({ author_id: user.id });
  };

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate(routes.realtyDetail, { data: item });
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
          <Text numberOfLines={1} style={styles.itemName}>
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

  _renderProfile = () => {
    const { user } = this.props;
    return (
      <View>
        <View style={styles.imageWrapper}>
          <FastImage
            style={styles.image}
            source={{
              uri: user.avatar,
              priority: FastImage.priority.high
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <Text style={styles.name}>{user.name}</Text>

        {user.role_id === 3 && (
          <AirbnbRating
            count={4}
            size={responsiveFontSize(_dims.defaultFontSubTitle)}
            showRating={false}
          />
        )}

        <View style={styles.infoWrapper}>
          <View style={styles.line}>
            <Ionicons name="ios-call" style={styles.lineIcon} />
            <Text style={[styles.lineText, !user.phone && { color: 'silver' }]}>
              {user.phone || strings.unset}
            </Text>
          </View>
          <View style={styles.line}>
            <Ionicons name="ios-mail" style={styles.lineIcon} />
            <Text style={styles.lineText}>{user.email}</Text>
          </View>
          <View style={[styles.line, styles.noBorderBottom]}>
            <Ionicons name="md-pin" style={styles.lineIcon} />
            <Text style={[styles.lineText, !user.address && { color: 'silver' }]}>
              {user.address || strings.unset}
            </Text>
          </View>
        </View>
        {user.role_id === 3 && <Text style={styles.showProj}>{strings.showProj}</Text>}

        {this.props.agencyRealty.fetching && (
          <View>
            <PlaceHolder />
            <Separator height={_dims.defaultPadding} />
            <PlaceHolder />
          </View>
        )}
      </View>
    );
  };

  _renderFooter = () => {
    if (this.props.agencyRealty.fetching || !this.props.agencyRealty.loadMore) return null;
    return <ActivityIndicator animating style={styles.indicator} />;
  };

  _renderEmpty = () => {
    const { user } = this.props;
    if (
      this.props.agencyRealty.fetching ||
      !this.props.agencyRealty.data[user.id] ||
      this.props.agencyRealty.data[user.id].length === 0
    ) {
      return null;
    }
    return <Empty title={errorStrings.emptyListAgencyRealty} />;
  };

  render() {
    const { user, agencyRealty } = this.props;
    return (
      <View style={styles.wrapper}>
        <FlatList
          style={{ marginHorizontal: _dims.defaultPadding }}
          data={!agencyRealty.fetching && agencyRealty.data[user.id]}
          renderItem={this._renderItem}
          keyExtractor={item => `${item.id}`}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={this._renderEmpty}
          ListHeaderComponent={this._renderProfile}
          ListFooterComponent={this._renderFooter}
          onEndReached={this._onLoadMore}
          refreshing={this.props.agencyRealty.refreshing}
          onRefresh={this._onRefresh}
          onEndReachedThreshold={0}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
        />
      </View>
    );
  }
}

export default connect(state => ({
  agencyRealty: state.agencyRealty
}))(AgencyDetail);
