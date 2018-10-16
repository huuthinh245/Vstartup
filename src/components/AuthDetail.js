import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
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
import * as Progress from 'react-native-progress';

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
import { postContactAction } from '../redux/contact/actions';
import { imagePicker, cameraPicker } from '../utils/imagePicker';
import { logoutAction, updateAvatarAction } from '../redux/auth/actions';
import { _alert } from '../utils/alert';
import Overlay from './common/Overlay';
import { PHONE_REGEX, EMAIL_REGEX } from '../utils/validation';
import emitter from '../emitter';

const size = _ios
  ? responsiveFontSize(_dims.defaultFontTitle + 2)
  : responsiveFontSize(_dims.defaultFontTitle + 18);

class AuthDetail extends React.Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
    this.state = {
      name: this.props.auth.user.name,
      email: this.props.auth.user.email,
      phone: this.props.auth.user.phone
    };
  }

  componentDidMount() {
    const { data } = this.props;
    if (data.role_id === 3) {
      getAgencyRealtyAction({ author_id: data.id });
    }
  }

  _navigate = (route, params) => this.props.navigation.navigate(route, params);

  _showHeaderPopup = ref => {
    const { user } = this.props.auth;
    const { data } = this.props;

    const edit = (
      <Icon name="edit" size={size} color="#ffffff" family="FontAwesome" />
    );
    const changePassword = (
      <Icon name="lock" size={size} color="#ffffff" family="FontAwesome" />
    );
    const logOut = (
      <Icon name="sign-out" size={size} color="#ffffff" family="FontAwesome" />
    );
    const manage = (
      <Icon name="envelope" size={size} color="#ffffff" family="FontAwesome" />
    );
    const project = (
      <Icon name="tasks" size={size} color="#ffffff" family="FontAwesome" />
    );

    let menus;
    if (data.id !== user.id) {
      menus = [{ menus: [{ label: strings.manageProject, icon: project }] }];
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
      if (data.id === user.id) {
        let _index = index;
        if (data.role_id === 3) _index = index - 2;

        if (_index === -2) {
          this._navigate(routes.contacts);
        } else if (_index === -1) {
          this._navigate(routes.agencyProject, { user });
        } else if (_index === 0) {
          this._navigate(routes.additionalInformation);
        } else if (_index === 1) {
          this._navigate(routes.changePassword);
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
      } else {
        this._navigate(routes.agencyProject, { user: data });
      }
    };

    RNPopover.Show(ref, {
      menus,
      onDone: (status, index) => {
        if (_ios) handleOnDone(status);
        else handleOnDone(index);
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
            <Ionicons
              name="md-more"
              size={30}
              color={_colors.mainColor}
              style={{ padding: 10 }}
            />
          </TouchableOpacity>
        }
      />
    );
  };

  _onLoadMore = () => {
    const { data, agencyRealty } = this.props;

    if (
      agencyRealty.loadMore ||
      this.onEndReachedCalledDuringMomentum ||
      data.role_id !== 3
    ) {
      return;
    }
    const len = agencyRealty.data[data.id].length;
    const page = Math.round(len / LIMIT_SERVICES) + 1;
    loadMoreAgencyRealtyAction({ author_id: data.id, page });
  };

  _onRefresh = () => {
    if (this.props.agencyRealty.refreshing || this.props.data.role_id !== 3) {
      return;
    }
    refreshAgencyRealtyAction({ author_id: this.props.data.id });
  };

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this._navigate(routes.realtyDetail, { data: item })}
        style={styles.item}
      >
        <FastImage
          source={{
            uri: item.thumb,
            priority: FastImage.priority.high
          }}
          style={styles.itemImage}
          resizeMode={FastImage.resizeMode.cover}
        />
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

  _uploadAvatar = image => {
    const form = [];
    form.push({
      name: 'file',
      type: image.mime,
      filename: image.filename,
      data: RNFetchBlob.wrap(image.path)
    });

    updateAvatarAction({ data: form, token: this.props.auth.token });
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
            count={data.rating}
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
            <Text style={[styles.lineText, !data.email && { color: 'silver' }]}>
              {data.email || strings.unset}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (!data.lat) return;
              this._navigate(routes.pickObjOnMap, {
                coordinate: [data.lat, data.lng]
              });
            }}
            style={[styles.line, styles.noBorderBottom]}
          >
            <Ionicons name="md-pin" style={styles.lineIcon} />
            <Text
              style={[styles.lineText, !data.address && { color: 'silver' }]}
            >
              {data.address || strings.unset}
            </Text>
          </TouchableOpacity>
        </View>
        {data.id !== user.id && (
          <View>
            <Text style={styles.showProj}>{strings.contactWith}</Text>
            <View style={styles.form}>
              <View style={styles.formLine}>
                <Ionicons name="ios-person" style={styles.formLineIcon} />
                <TextInput
                  ref={name => {
                    this.nameDom = name;
                  }}
                  style={styles.input}
                  placeholder={strings.name}
                  value={this.state.name}
                  onChangeText={name => this.setState({ name })}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="always"
                />
              </View>
              <View style={styles.formLine}>
                <Ionicons name="ios-mail" style={styles.formLineIcon} />
                <TextInput
                  ref={email => {
                    this.emailDom = email;
                  }}
                  style={styles.input}
                  placeholder={strings.email}
                  value={this.state.email}
                  onChangeText={email => this.setState({ email })}
                  returnKeyType="next"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="always"
                />
              </View>
              <View style={styles.formLine}>
                <Ionicons name="ios-call" style={styles.formLineIcon} />
                <TextInput
                  ref={phone => {
                    this.phoneDom = phone;
                  }}
                  style={styles.input}
                  placeholder={strings.phone}
                  value={this.state.phone}
                  onChangeText={phone => this.setState({ phone })}
                  returnKeyType="go"
                  autoCapitalize="none"
                  keyboardType="phone-pad"
                  autoCorrect={false}
                  clearButtonMode="always"
                />
              </View>
              <TouchableOpacity
                style={styles.submit}
                onPress={this._sendContact}
              >
                <Text style={styles.submitText}>{strings.sendContact}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {data.role_id === 3 && (
          <Text style={styles.showProj}>{strings.showProj}</Text>
        )}
        {this.props.agencyRealty.fetching && <PlaceHolder />}
      </View>
    );
  };

  _renderEmpty = () => {
    const { user } = this.props.auth;
    const { data, agencyRealty } = this.props;
    if (agencyRealty.fetching || data.role_id !== 3) return null;
    const str =
      user.id === data.id
        ? errorStrings.emptyListMyRealty
        : errorStrings.emptyListAgencyRealty;
    return <Empty title={str} />;
  };

  _sendContact = () => {
    if (this.props.listContact.sending) return;
    if (!this.state.name) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.nameEmpty
      });
      this.nameDom.focus();
    } else if (!EMAIL_REGEX.test(this.state.email)) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.emailInvalid
      });
      this.emailDom.focus();
    } else if (!PHONE_REGEX.test(this.state.phone)) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.phoneInvalid
      });
      this.phoneDom.focus();
    } else {
      callback = () =>
        _alert(alertStrings.success, alertStrings.postContactSuccess);
      const obj = {
        body: {
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone
        },
        callback
      };

      postContactAction(obj);
    }
  };

  render() {
    const { data, agencyRealty } = this.props;
    const { user } = this.props.auth;
    return (
      <View style={styles.wrapper}>
        <Overlay
          visible={this.props.auth.fetching || this.props.listContact.sending}
        />
        {this._renderHeader()}
        {this.props.auth.updating && (
          <View style={styles.progress}>
            <Progress.Pie indeterminate size={50} />
          </View>
        )}
        {data.id === user.id &&
          data.role_id === 3 && (
            <TouchableOpacity
              style={styles.fab}
              onPress={() =>
                this.props.navigation.navigate(routes.createRealty)
              }
            >
              <Ionicons
                name="ios-add-circle"
                color="#65b6fb"
                size={responsiveFontSize(_dims.defaultFontSize * 4)}
              />
            </TouchableOpacity>
          )}

        <FlatList
          style={{
            marginHorizontal: _dims.defaultPadding,
            paddingBottom: _dims.defaultPadding
          }}
          data={agencyRealty.data[data.id]}
          renderItem={this._renderItem}
          keyExtractor={item => `${item.id}`}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={this._renderEmpty}
          ListHeaderComponent={this._renderProfile}
          ListFooterComponent={() => (
            <View style={{ height: _dims.defaultPadding }} />
          )}
          onEndReached={this._onLoadMore}
          onEndReachedThreshold={0.1}
          onMomentumScrollBegin={() => {
            this.onEndReachedCalledDuringMomentum = false;
          }}
          refreshing={this.props.data.role_id === 3 && agencyRealty.refreshing}
        />
        {this.props.agencyRealty.loadMore && (
          <ActivityIndicator animating style={styles.indicator} />
        )}
        <ActionSheet
          ref={o => {
            this.actionSheetAuth = o;
          }}
          options={[strings.actionCamera, strings.actionPhoto, strings.cancel]}
          cancelButtonIndex={2}
          onPress={index => {
            if (index === 1) {
              imagePicker({ multiple: false, callback: this._uploadAvatar });
            } else if (index === 0) {
              cameraPicker({ callback: this._uploadAvatar });
            }
          }}
        />
      </View>
    );
  }
}

export default connect(state => ({
  auth: state.auth,
  agencyRealty: state.agencyRealty,
  listContact: state.listContact
}))(AuthDetail);

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff'
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
    marginTop: _dims.defaultPadding * 3,
    marginBottom: _dims.defaultPadding,
    fontSize: responsiveFontSize(_dims.defaultFontTitle)
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
    bottom: 10,
    position: 'absolute',
    zIndex: 100
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
  },
  progress: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    zIndex: Number.MAX_SAFE_INTEGER,
    width: _dims.screenWidth,
    height: _dims.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  form: {
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
    elevation: 1,
    marginHorizontal: _dims.defaultPadding,
    padding: _dims.defaultPadding
  },
  formLine: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: _colors.mainColor,
    marginBottom: _dims.defaultPadding * 2
  },
  formLineIcon: {
    color: _colors.mainColor,
    fontSize: responsiveFontSize(_dims.defaultFontTitle + 6)
  },
  input: {
    backgroundColor: 'transparent',
    flex: 1
  },
  submit: {
    padding: 10,
    minWidth: responsiveWidth(40),
    alignSelf: 'center',
    backgroundColor: _colors.mainColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginTop: _dims.defaultPadding,
    marginBottom: _dims.defaultPadding * 2
  },
  submitText: {
    color: '#fff',
    fontSize: responsiveFontSize(_dims.defaultFontTitle + 2),
    fontWeight: 'bold'
  }
});
