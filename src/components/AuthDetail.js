import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  PixelRatio,
  Linking
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import RNPopover from 'react-native-popover-menu';
import ActionSheet from 'react-native-actionsheet';
import RNFetchBlob from 'react-native-fetch-blob';
import call from 'react-native-phone-call';

import Overlay from '../components/common/Overlay';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import errorStrings from '../localization/error';
import alertStrings from '../localization/alert';
import * as routes from '../routes/routes';
import strings from '../localization/profile';
import AirbnbRating from '../components/rating';
import { Empty, PlaceHolder } from '../components/flatlistHelpers';
import {
  responsiveFontSize,
  _dims,
  _colors,
  LIMIT_SERVICES,
  responsiveWidth,
  _ios
} from '../utils/constants';
import {
  getAgencyRealtyAction,
  loadMoreAgencyRealtyAction,
  refreshAgencyRealtyAction
} from '../redux/agencyRealty/actions';
import { imagePicker, cameraPicker } from '../utils/imagePicker';
import { userApi } from '../utils/api';
import { logoutAction, updateAvatarAction } from '../redux/auth/actions';
import { _alert } from '../utils/alert';

const size = _ios
  ? responsiveFontSize(_dims.defaultFontTitle + 2)
  : responsiveFontSize(_dims.defaultFontTitle + 18);

class AuthDetail extends React.Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
    this.state = {
      uploading: false
    };
  }

  componentDidMount() {
    const { data } = this.props;
    getAgencyRealtyAction({ author_id: data.id });
  }

  _showHeaderPopup = ref => {
    const { user } = this.props.auth;
    const { data } = this.props;

    const edit = <Icon name="edit" size={size} color="#ffffff" family="FontAwesome" />;
    const changePassword = <Icon name="lock" size={size} color="#ffffff" family="FontAwesome" />;
    const logOut = <Icon name="sign-out" size={size} color="#ffffff" family="FontAwesome" />;
    const manage = <Icon name="envelope" size={size} color="#ffffff" family="FontAwesome" />;
    const project = <Icon name="tasks" size={size} color="#ffffff" family="FontAwesome" />;

    let menus;
    if (data.id !== user.id) {
      menus = [
        {
          menus: [{ label: strings.manageProject, icon: project }]
        }
      ];
    } else if (user.role_id !== 3) {
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
      let _index = index;
      if (user.id === data.id) _index = index - 2;
      else if (user.role_id === 3) _index = index - 1;

      if (_index === -2) {
        this.props.navigation.navigate(routes.contacts, {
          user: data
        });
      } else if (_index === -1) {
        this.props.navigation.navigate(routes.agencyProject, {
          user: data
        });
      }
      if (_index === 0) {
        this.props.navigation.navigate(routes.additionalInformation, {
          user: data
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
    const { user } = this.props.auth;
    const { data } = this.props;
    if (data.id !== user.id) {
      return (
        <Header
          title={headerStrings.profileTitle}
          onLeftPress={() => this.props.navigation.goBack()}
          right={
            data.role_id === 3 ? (
              <TouchableOpacity
                ref={ref => {
                  this.headerDom = ref;
                }}
                onPress={() => this._showHeaderPopup(this.headerDom)}
              >
                <Ionicons
                  name="md-more"
                  size={30}
                  color={_colors.mainColor}
                  style={{ padding: 10 }}
                />
              </TouchableOpacity>
            ) : null
          }
        />
      );
    }
    return (
      <Header
        title={headerStrings.profileTitle}
        outer
        right={
          <TouchableOpacity
            ref={ref => {
              this.headerDom = ref;
            }}
            onPress={() => this._showHeaderPopup(this.headerDom)}
          >
            <Ionicons name="md-more" size={30} color={_colors.mainColor} style={{ padding: 10 }} />
          </TouchableOpacity>
        }
      />
    );
  };

  _onLoadMore = () => {
    const { data, agencyRealty } = this.props;

    if (agencyRealty.fetching || this.onEndReachedCalledDuringMomentum) return;
    const len = agencyRealty.data[data.id].length;
    const page = Math.round(len / LIMIT_SERVICES) + 1;
    loadMoreAgencyRealtyAction({ author_id: data.id, page });
  };

  _onRefresh = () => {
    if (this.props.agencyRealty.refreshing) return;
    refreshAgencyRealtyAction({ author_id: this.props.data.id });
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

  _uploadAvatar = async image => {
    // const { Blob } = RNFetchBlob.polyfill;
    // const blob = await Blob.build(image.data, { type: 'image/png;base64' });

    // const body = new FormData();
    // body.append('file', blob);
    // fetch('https://rems.dfm-engineering.com/api/v1/user/avatar', {
    //   method: 'POST',
    //   Authorization: `Bearer ${this.props.auth.token}`,
    //   'Content-Type': 'multipart/form-data',
    //   body
    // }).then(value => {
    //   console.log(value);
    //   return value.json();
    // })
    //   .then(val => console.log(val))
    //   .catch(error => console.log(error.code, error.message));

    // return;

    // RNFetchBlob.fetch(
    //   'POST',
    //   'https://rems.dfm-engineering.com/api/v1/user/avatar',
    //   {
    //     Authorization: `Bearer ${this.props.auth.token}`,
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   [
    //     {
    //       name: 'file',
    //       filename: 'avatar-png.png',
    //       type: 'image/png',
    //       data: image.data
    //     }
    //   ]
    // )
    //   .then(resp => {
    //     console.log(resp);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    // const body = new FormData();
    // body.append('file', {
    //   type: 'image/jpeg',
    //   name: 'photo.jpg',
    //   uri: image.path
    // });
    // this.setState({ uploading: true });
    // try {
    //   const val = await fetch('https://rems.dfm-engineering.com/api/v1/user/avatar', {
    //     method: 'POST',
    //     Authorization: `Bearer ${this.props.auth.token}`,
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'multipart/form-data'
    //     },
    //     body: JSON.stringify(body)
    //   });
    //   this.setState({ uploading: false });
    //   console.log(val);
    // } catch (error) {
    //   this.setState({ uploading: false });
    //   console.log(error.code, error.message);
    // }

    // console.log(image);

    // const body = new FormData();
    // body.append('file', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAc1gAAHNYBTCInoQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIHSURBVGiB7dbHahVRHIDxgaxUsCSW2I1uYskmij6DCK4FX0AsERsKbuyP4MPYxYUVa4xKbNGFZaFuFcnPRe6FazznOslMchyZbznl//++xWEmy2pqampqavKDfmxN7VEIbME3/MD21D6TApsbEU2+Y1tHarGJgL4syy5kWdbZcrkjy7J5aYwmATbhqz+5iBmp/XKBjZGIS1WK6MeXQMRlzEztlwv04XMg4kqVIjb8DxHr8SkQcbVKEesiEdcwK7VfLrAWHwMR16sU0YsPgYibmJ3aLxdYg/eBiFtVi3gXiZiT2i8XWB2JuF2liB6MBCLuFIrAYewo0bXdrsV4EYh4ggVFBh9vDBrFrhKdQ7tW4W0g4i7mFhl8bNzAKYvBUgwHIu4VimgMPx8Y/BM7S/Jv7lmIwcCuIXSXteRcYMEodpc0f4nwmXisyJmILDs7FTHGDvbzwOxiB/svS8+UGYPuNhELy/Yfv/x0JGbPBOd041lg1uCUR7RInIrE7M35/nw8Csx4Om0RLTInJxODLjyMRCyaLv/xUiciMfsiz3fhQeCdoWQRLXK5YtDZJqKc70RRcDQSM9C434n7gWeGsSy1/2+If2f240bg3gh6UnsHwZGAcIiXWJ7aty3Gfvfb8eqfj2iCQ5GI11iR2m9C4GDlI5rgQCPiDVam9ikEBtCb2qOmpqamWvwC3iRBKYTf2LIAAAAASUVORK5CYII=');
    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://rems.dfm-engineering.com/api/v1/user/avatar', true);
    // xhr.setRequestHeader('Content-type', 'multipart/form-data');
    // xhr.setRequestHeader('Authorization', `Bearer ${this.this.props.auth.token}`);

    // xhr.onreadystatechange = (result, error) => {
    //   if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    //     console.log(result, error, xhr);
    //   }
    // };
    // xhr.send({ form: body });

    // const body = new FormData();
    // body.append('file', `data:image/png;base64,${image.data}`);
    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://rems.dfm-engineering.com/api/v1/user/avatar', true);
    // xhr.setRequestHeader('Content-type', 'multipart/form-data');
    // xhr.setRequestHeader('Authorization', `Bearer ${this.props.auth.token}`);

    // xhr.onreadystatechange = (error, result) => {
    //   if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    //     console.log(result);
    //   }else {
    //     console.log(error);
    //   }
    // };
    // xhr.send({ form: body });

    const body = new FormData();
    body.append('file', {
      type: 'image/jpeg',
      name: 'photo.jpg',
      uri: image.path
    });
    this.props.dispatch(updateAvatarAction(body, this.props.auth.token));
  };

  _renderProfile = () => {
    const { user } = this.props.auth;
    const { data } = this.props;
    return (
      <View>
        <View style={styles.imageWrapper}>
          <FastImage
            style={styles.image}
            source={{
              uri: data.avatar,
              priority: FastImage.priority.high
            }}
            resizeMode={FastImage.resizeMode.cover}
          />

          {user.id === data.id && (
            <TouchableOpacity
              style={styles.cameraWrapper}
              onPress={() => this.actionSheetAuth.show()}
            >
              <Ionicons name="ios-camera" style={styles.camera} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.name}>{data.name}</Text>

        {data.role_id === 3 && (
          <AirbnbRating
            count={4}
            size={responsiveFontSize(_dims.defaultFontSubTitle)}
            showRating={false}
          />
        )}

        <View style={styles.infoWrapper}>
          <TouchableOpacity
            onPress={() => {
              if (user.id !== data.id && data.phone) {
                call({
                  number: data.phone,
                  prompt: true
                }).catch(err => _alert(alertStrings.error, err.message));
              }
            }}
            style={styles.line}
          >
            <Ionicons name="ios-call" style={styles.lineIcon} />
            <Text style={[styles.lineText, !data.phone && { color: 'silver' }]}>
              {data.phone || strings.unset}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (user.id !== data.id && data.email) {
                Linking.openURL(`mailto:${data.email}`).catch(err =>
                  _alert(alertStrings.error, err.message)
                );
              }
            }}
            style={styles.line}
          >
            <Ionicons name="ios-mail" style={styles.lineIcon} />
            <Text style={styles.lineText}>{data.email}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate(routes.pickObjOnMap, {
                coordinate: [data.lat, data.lng]
              })
            }
            style={[styles.line, styles.noBorderBottom]}
          >
            <Ionicons name="md-pin" style={styles.lineIcon} />
            <Text style={[styles.lineText, !data.address && { color: 'silver' }]}>
              {data.address || strings.unset}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.showProj}>{strings.showProj}</Text>

        {this.props.agencyRealty.fetching && <PlaceHolder />}
      </View>
    );
  };

  _renderFooter = () => {
    if (this.props.agencyRealty.fetching || !this.props.agencyRealty.loadMore) {
      return <View style={{ height: _dims.defaultPadding }} />;
    }
    return <ActivityIndicator animating style={styles.indicator} />;
  };

  _renderEmpty = () => {
    const { user } = this.props.auth;
    const { data, agencyRealty } = this.props;
    if (agencyRealty.fetching) {
      return null;
    }
    const str =
      user.id === data.id ? errorStrings.emptyListMyRealty : errorStrings.emptyListAgencyRealty;
    return <Empty title={str} />;
  };

  render() {
    const { data, agencyRealty } = this.props;
    const { user } = this.props.auth;
    return (
      <View style={styles.wrapper}>
        <Overlay visible={this.state.uploading} />
        {this._renderHeader()}
        {data.id === user.id && (
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
        )}

        <FlatList
          style={{ marginHorizontal: _dims.defaultPadding, paddingBottom: 100 }}
          data={agencyRealty.data[data.id]}
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
          refreshing={agencyRealty.refreshing}
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
                callback: this._uploadAvatar
              });
            } else if (index === 0) {
              cameraPicker({
                callback: this._uploadAvatar
              });
            }
          }}
        />
      </View>
    );
  }
}

export default connect(state => ({ auth: state.auth, agencyRealty: state.agencyRealty }))(
  AuthDetail
);

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
