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
import ActionSheet from 'react-native-actionsheet';
import RNGooglePlaces from 'react-native-google-places';

import Overlay from '../components/common/Overlay';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import alertStrings from '../localization/alert';
import { PlaceHolder } from '../components/RealtyItem';
import * as routes from '../routes/routes';
import strings from '../localization/profile';
import AirbnbRating from '../components/rating';
import { Separator, Empty } from '../components/flatlistHelpers';
import {
  responsiveFontSize,
  _dims,
  _colors,
  LIMIT_SERVICES,
  responsiveWidth,
  _ios
} from '../utils/constants';
import {
  getMyRealtyAction,
  loadMoreMyRealtyAction,
  refreshMyRealtyAction
} from '../redux/myRealty/actions';
import { imagePicker, cameraPicker } from '../utils/imagePicker';
import { userApi } from '../utils/api';
import { logoutAction } from '../redux/auth/actions';
import { _alert } from '../utils/alert';

const size = _ios
  ? responsiveFontSize(_dims.defaultFontTitle + 2)
  : responsiveFontSize(_dims.defaultFontTitle + 18);

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
    const edit = <Icon name="edit" size={size} color="#ffffff" family="FontAwesome" />;
    const changePassword = <Icon name="lock" size={size} color="#ffffff" family="FontAwesome" />;
    const logOut = <Icon name="sign-out" size={size} color="#ffffff" family="FontAwesome" />;
    const manage = <Icon name="envelope" size={size} color="#ffffff" family="FontAwesome" />;
    const project = <Icon name="tasks" size={size} color="#ffffff" family="FontAwesome" />;

    let menus;

    if (this.props.auth.user.role_id !== 3) {
      menus = [
        {
          menus: [
            { label: strings.editAccount, icon: edit },
            { label: strings.changePassword, icon: changePassword },
            { label: strings.logOut, icon: logOut }
          ]
        }
      ];
    } else {
      menus = [
        {
          menus: [
            { label: strings.manageContact, icon: manage },
            { label: strings.manageProject, icon: project },
            { label: strings.editAccount, icon: edit },
            { label: strings.changePassword, icon: changePassword },
            { label: strings.logOut, icon: logOut }
          ]
        }
      ];
    }

    handleOnDone = index => {
      const _index = this.props.auth.user.role_id !== 3 ? index : index - 2;
      if (_index === -2) {
        this.props.navigation.navigate(routes.contacts, {
          user: this.props.auth.user
        });
      } else if (_index === -1) {
        this.props.navigation.navigate(routes.agencyProject, {
          user: this.props.auth.user
        });
      }
      if (_index === 0) {
        this.props.navigation.navigate(routes.additionalInformation, {
          user: this.props.auth.user
        });
      } else if (_index === 1) {
        this.props.navigation.navigate(routes.changePassword);
      } else if (_index === 2) {
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
    };

    RNPopover.Show(ref, {
      menus,
      onDone: (status, index) => {
        if (_ios) {
          handleOnDone(status);
        } else {
          handleOnDone(index);
        }
      },
      tintColor: _colors.popup,
      theme: 'dark',
      rowHeight: 50,
      perferedWidth: responsiveWidth(70)
    });
  };

  _showItemPopup = ref => {
    const hide = <Icon name="eye-slash" size={size} color="#ffffff" family="FontAwesome" />;
    const edit = <Icon name="edit" size={size} color="#ffffff" family="FontAwesome" />;

    const menus = [
      {
        menus: [
          { label: strings.hideRealty, icon: hide },
          { label: strings.editRealty, icon: edit }
        ]
      }
    ];

    handleOnDone = index => {
      if (index === 0) {
        // hide realty
      } else if (index === 1) {
        // edit realty
      }
    };

    RNPopover.Show(ref, {
      menus,
      onDone: (status, index) => {
        if (_ios) {
          handleOnDone(status);
        } else {
          handleOnDone(index);
        }
      },
      tintColor: _colors.popup,
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

  _onRefresh = () => {
    if (this.props.myRealty.fetching || this.props.myRealty.refreshing) return;
    const { user } = this.props.auth;
    refreshMyRealtyAction({ author_id: user.id });
  };

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        ref={ref => {
          this[`realty(${item.id})`] = ref;
        }}
        onPress={() => {
          this.props.navigation.navigate(routes.realtyDetail, { data: item });
        }}
        onLongPress={() => this._showItemPopup(this[`realty(${item.id})`])}
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
            delayLongPress={2000}
            style={styles.cameraWrapper}
            onPress={() => this.actionSheetAuth.show()}
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
    return <Empty title={errorStrings.emptyListAgencyRealty} />;
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Overlay visible={this.props.auth.fetching} />
        {this._renderHeader()}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => this.props.navigation.navigate(routes.createRealty)}
        >
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
          refreshing={this.props.myRealty.refreshing}
          onRefresh={this._onRefresh}
        />
        <ActionSheet
          ref={o => {
            this.actionSheetAuth = o;
          }}
          options={[strings.actionCamera, strings.actionPhoto, strings.cancel]}
          cancelButtonIndex={2}
          onPress={index => {
            if (index === 1) {
              imagePicker({
                multiple: false,
                callback: image => {
                  userApi
                    .uploadAvatar({ avatar: { uri: image.sourceURL } })
                    .then(value => console.log(value))
                    .catch(error => {
                      console.log(error);
                    });
                }
              });
            } else if (index === 0) {
              cameraPicker({
                callback: image => console.log(image)
              });
            }
          }}
        />
      </View>
    );
  }
}

export default connect(state => ({ auth: state.auth, myRealty: state.myRealty }))(AuthDetail);

export const styles = StyleSheet.create({
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
    height: (_dims.screenWidth / 2) * 1.25,
    borderRadius: 20,
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
    alignItems: 'center'
  },
  itemImage: {
    width: (_dims.screenWidth - _dims.defaultPadding * 2) / 4,
    height: (_dims.screenWidth - _dims.defaultPadding * 2) / 4,
    borderRadius: 20,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: 'silver'
  },
  itemInfo: {
    flex: 1,
    marginLeft: _dims.defaultPadding,
    justifyContent: 'space-between'
  },
  titleItem: {
    flexDirection: 'row'
  },
  itemName: {
    color: '#333'
  },
  itemPrice: {
    color: '#44cee2',
    fontWeight: 'bold',
    marginVertical: 3
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
    height: 1 / PixelRatio.get(),
    backgroundColor: '#44cee2',
    marginVertical: _dims.defaultPadding,
    marginLeft: _dims.screenWidth / 4 + _dims.defaultPadding / 2
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
