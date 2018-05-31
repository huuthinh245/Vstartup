import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  PixelRatio
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { PlaceHolder } from '../components/RealtyItem';
import * as routes from '../routes/routes';
import strings from '../localization/profile';
import AirbnbRating from '../components/rating';
import Separator from '../components/flatlistHelpers/Separator';
import {
  responsiveFontSize,
  _dims,
  _colors,
  LIMIT_SERVICES,
  responsiveWidth
} from '../utils/constants';
import { getAgencyRealtyAction, loadMoreAgencyRealtyAction } from '../redux/agencyRealty/actions';

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

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate(routes.realtyDetail, { data: item });
        }}
        style={styles.item}
      >
        <FastImage
          style={styles.itemImage}
          source={{
            uri: item.thumb,
            priority: FastImage.priority.high
          }}
          resizeMode={FastImage.resizeMode.cover}
        />

        <View style={styles.itemInfo}>
          <Text numberOfLines={2} style={styles.itemName}>{item.title}</Text>
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
    return <Text>Empty</Text>;
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

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fbfbfb'
  },
  fab: {
    zIndex: 100,
    position: 'absolute',
    bottom: _dims.defaultPadding,
    right: _dims.defaultPadding
  },
  infoWrapper: {
    margin: _dims.defaultPadding,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: _dims.defaultPadding * 2,
    paddingVertical: _dims.defaultPadding,
    shadowColor: '#777',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  name: {
    alignSelf: 'center',
    fontSize: responsiveFontSize(_dims.defaultFontTitle),
    fontWeight: 'bold',
    marginBottom: 5
  },
  cameraWrapper: {
    position: 'absolute',
    bottom: _dims.defaultPadding,
    right: _dims.defaultPadding
  },
  camera: {
    fontSize: responsiveFontSize(_dims.defaultFontTitle + 20),
    color: _colors.mainColor
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    alignSelf: 'center',
    width: _dims.screenWidth / 2,
    height: _dims.screenWidth / 2,
    borderRadius: _dims.screenWidth / 4,
    marginVertical: _dims.defaultPadding
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: 'silver'
  },
  lineIcon: {
    fontSize: responsiveFontSize(_dims.defaultFontSubTitle + 4),
    color: _colors.mainColor,
    marginLeft: -_dims.defaultPadding / 2,
    marginRight: _dims.defaultPadding * 2
  },
  lineText: {
    flex: 1,
    color: '#555'
  },
  noBorderBottom: {
    borderBottomWidth: 0
  },
  showProj: {
    marginLeft: _dims.defaultPadding * 2,
    color: _colors.mainColor,
    marginTop: _dims.defaultPadding * 2,
    marginBottom: _dims.defaultPadding
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemImage: {
    width: (_dims.screenWidth - _dims.defaultPadding * 2) / 4,
    height: (_dims.screenWidth - _dims.defaultPadding * 2) / 4,
    borderRadius: 20
  },
  itemInfo: {
    flex: 1,
    marginLeft: _dims.defaultPadding
  },
  titleItem: {
    flexDirection: 'row'
  },
  itemName: {
    color: '#333',
    flex: 1
  },
  itemPrice: {
    color: '#44cee2',
    fontWeight: 'bold'
  },
  itemAddress: {
    color: '#777'
  },
  itemIcon: {
    paddingHorizontal: _dims.defaultPadding,
    color: _colors.mainColor,
    fontSize: responsiveFontSize(_dims.defaultFontTitle + 8)
  },
  separator: {
    height: 0.5,
    backgroundColor: '#44cee2',
    marginVertical: 5,
    marginHorizontal: _dims.defaultPadding
  },
  indicator: {
    alignSelf: 'center',
    marginVertical: 10
  },
  empty: {
    alignSelf: 'center',
    marginVertical: 10
  },
  dropdown: {
    backgroundColor: 'lightblue',
    borderRadius: 4,
    height: 100,
    zIndex: Number.MAX_SAFE_INTEGER - 2
  },
  row: {
    flexDirection: 'row',
    height: 50,
    width: responsiveWidth(70),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: 'silver',
    marginHorizontal: _dims.defaultPadding
  },
  rowText: {
    flex: 1,
    marginLeft: _dims.defaultPadding,
    color: '#555'
  }
});
