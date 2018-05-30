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
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import RNPopover from 'react-native-popover-menu';

import Overlay from '../components/common/Overlay';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import alertStrings from '../localization/alert';
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
import { getMyRealtyAction, loadMoreMyRealtyAction } from '../redux/myRealty/actions';
import { imagePicker } from '../utils/imagePicker';
import { userApi } from '../utils/api';
import { logoutAction } from '../redux/auth/actions';
import { _alert } from '../utils/alert';

class AuthDetail extends React.Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
  }

  componentDidMount() {
    const { user } = this.props.auth;
    getMyRealtyAction({ author_id: user.id });
  }

  _showHeaderPopup = ref => {
    const edit = (
      <Icon name="edit" style={{ width: 40 }} size={24} color="#fff" family="FontAwesome" />
    );
    const changePassword = (
      <Icon name="lock" style={{ width: 40 }} size={24} color="#fff" family="FontAwesome" />
    );
    const logOut = (
      <Icon name="sign-out" style={{ width: 40 }} size={24} color="#fff" family="FontAwesome" />
    );

    const menus = [
      {
        menus: [
          { label: strings.editAccount, icon: edit },
          { label: strings.changePassword, icon: changePassword },
          { label: strings.logOut, icon: logOut }
        ]
      }
    ];

    RNPopover.Show(ref, {
      menus,
      onDone: index => {
        if (index === 0) {
          this.props.navigation.navigate(routes.additionalInformation, {
            user: this.props.auth.user
          });
        } else if (index === 1) {
          this.props.navigation.navigate(routes.changePassword);
        } else {
          _alert(strings.logOut, strings.areYouSure, [
            {
              text: alertStrings.ok,
              onPress: () => logoutAction()
            },
            {
              text: alertStrings.cancel
            }
          ]);
        }
      },
      theme: 'dark',
      tintColor: 'rgb(0,0,0)',
      rowHeight: 50,
      perferedWidth: responsiveWidth(70)
    });
  };

  _showItemPopup = ref => {
    const hide = <Icon name="eye-slash" size={24} color="#fff" family="FontAwesome" />;
    const edit = <Icon name="edit" size={24} color="#fff" family="FontAwesome" />;

    const menus = [
      {
        menus: [
          { label: strings.hideRealty, icon: hide },
          { label: strings.editRealty, icon: edit }
        ]
      }
    ];

    RNPopover.Show(ref, {
      menus,
      onDone: index => {
        if (index === 0) {
        } else if (index === 1) {
        }
      },
      tintColor: 'haha',
      theme: 'dark',
      rowHeight: 50,
      perferedWidth: responsiveWidth(70)
    });
  };

  _renderHeader = () => {
    return (
      <Header
        title={headerStrings.profileTitle}
        outer
        right={
          <TouchableOpacity
            ref={ref => {
              this.headerPopup = ref;
            }}
            onPress={() => this._showHeaderPopup(this.headerPopup)}
          >
            <Ionicons name="md-more" size={30} color={_colors.mainColor} style={{ padding: 10 }} />
          </TouchableOpacity>
        }
      />
    );
  };

  _onLoadMore = () => {
    if (this.props.myRealty.fetching || this.onEndReachedCalledDuringMomentum) return;
    const { user } = this.props.auth;
    const len = this.props.myRealty.data.length;
    const page = Math.round(len / LIMIT_SERVICES) + 1;
    loadMoreMyRealtyAction({ author_id: user.id, page });
  };

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate(routes.realtyDetail, { data: item });
        }}
        ref={ref => {
          this[`realty(${item.id})`] = ref;
        }}
        onLongPress={() => this._dropdown.show()}
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
          <View style={styles.titleItem}>
            <Text numberOfLines={2} style={styles.itemName}>
              {item.title}
            </Text>
            <Ionicons
              name="md-more"
              style={styles.itemIcon}
              onPress={() => this._showItemPopup(this[`realty(${item.id})`])}
            />
          </View>

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
    const { user } = this.props.auth;
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
          <TouchableOpacity
            style={styles.cameraWrapper}
            onPress={() =>
              imagePicker('photo', false, image => {
                userApi
                  .uploadAvatar({ avatar: { uri: image.sourceURL } })
                  .then(value => console.log(value))
                  .catch(error => {
                    console.log(error);
                  });
              })
            }
          >
            <Ionicons name="ios-camera" style={styles.camera} />
          </TouchableOpacity>
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

        <Text style={styles.showProj}>{strings.showProj}</Text>

        {this.props.myRealty.fetching && (
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
    if (this.props.myRealty.fetching || !this.props.myRealty.loadMore) return null;
    return <ActivityIndicator animating style={styles.indicator} />;
  };

  _renderEmpty = () => {
    if (this.props.myRealty.fetching || this.props.myRealty.data.length === 0) return null;
    return <Text>Empty</Text>;
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Overlay visible={this.props.auth.fetching} />
        {this._renderHeader()}
        <TouchableOpacity style={styles.fab} onPress={() => {}}>
          <Ionicons
            name="ios-add-circle"
            color="#65b6fb"
            size={responsiveFontSize(_dims.defaultFontSize * 4)}
          />
        </TouchableOpacity>
        <FlatList
          style={{ marginHorizontal: _dims.defaultPadding, paddingBottom: 100 }}
          data={this.props.myRealty.data}
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

export default connect(state => ({ auth: state.auth, myRealty: state.myRealty }))(AuthDetail);

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
