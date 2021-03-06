import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  findNodeHandle,
  Share,
  StyleSheet,
  ActivityIndicator,
  Animated
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import Accordion from 'react-native-collapsible/Accordion';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import call from 'react-native-phone-call';
import { connect } from 'react-redux';
import YouTube, { YouTubeStandaloneAndroid } from 'react-native-youtube';
import ActionSheet from 'react-native-actionsheet';

import PlaceHolder from '../components/flatlistHelpers/PlaceHolder_Detail';
import * as routes from './routes';
import {
  _colors,
  _dims,
  responsiveFontSize,
  responsiveWidth,
  _ios
} from '../utils/constants';
import SliderEntry from '../components/SliderEntry';
import strings from '../localization/realtyDetail';
import alertStrings from '../localization/alert';
import Header from '../navigators/headers/CommonHeader';
import { _alert } from '../utils/alert';
import emitter from '../emitter';
import {
  getRealtyDetailAction,
  likeRealtyAction,
  unlikeRealtyAction
} from '../redux/realtyDetail/actions';
import { PHONE_REGEX, EMAIL_REGEX } from '../utils/validation';
import { postContactAction } from '../redux/contact/actions';

class RealtyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.auth.user.name,
      email: this.props.auth.user.email,
      phone: this.props.auth.user.phone
    };
    this.fabBottom = new Animated.Value(1);
  }

  componentDidMount() {
    const { id } = this.props.navigation.state.params.data;
    const userId = this.props.auth.user.id;
    const opts = {};
    if (userId) {
      opts.userId = userId;
    }
    getRealtyDetailAction(id, opts);
  }

  _likeRealty = async realty => {
    if (!this.props.auth.user.id) {
      this.props.navigation.navigate(routes.login, { modal: true });
      return;
    }
    if (!this.props.realtyDetail.postingFavorite) {
      if (realty.is_favorite) {
        unlikeRealtyAction(realty);
      } else {
        likeRealtyAction(realty);
      }
    }
  };

  _share = item => {
    Share.share(
      {
        message: `url: ${item.url}`,
        url: item.url
      },
      {
        // Android only:
        dialogTitle: 'Share url',
        // iOS only:
        excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter']
      }
    );
  };

  _sendContact = () => {
    const { params } = this.props.navigation.state;
    const { realtyDetail, auth } = this.props;
    const realty = realtyDetail.data[params.data.id];
    if (this.props.listContact.sending) return;
    if (!this.state.name) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.nameEmpty
      });
      this.name.focus();
    } else if (!EMAIL_REGEX.test(this.state.email)) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.emailInvalid
      });
      this.email.focus();
    } else if (!PHONE_REGEX.test(this.state.phone)) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: alertStrings.phoneInvalid
      });
      this.phone.focus();
    } else {
      callback = () =>
        _alert(alertStrings.success, alertStrings.postContactSuccess);
      const obj = {
        body: {
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone,
          realty_id: realty.id,
          to_user_id: realty.author_id,
          user_id: auth.user ? auth.user.id : ''
        },
        callback
      };

      postContactAction(obj);
    }
  };

  _renderLoadDone = realty => {
    if (!realty) {
      return null;
    }
    const SECTIONS = [
      {
        title: strings.describe,
        content: realty.body
      },
      {
        title: strings.utils,
        content: realty.utility
      },
      {
        title: strings.location,
        content: realty.thumb_map
      },
      {
        title: strings.video,
        content: realty.video
      }
    ];
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: _dims.defaultPadding }} />
        <Carousel
          style={{ marginTop: _dims.defaultPadding }}
          ref={c => {
            this._slider1Ref = c;
          }}
          data={realty.image}
          renderItem={this._renderItemWithParallax}
          sliderWidth={_dims.screenWidth}
          itemWidth={_dims.screenWidth * 0.75}
          hasParallaxImages
          enableMomentum
          activeSlideAlignment="center"
          activeAnimationType="timing"
          activeAnimationOptions={{
            friction: 4,
            tension: 40
          }}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          inactiveSlideShift={_dims.defaultPadding * 2}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
        />
        <View style={{ paddingHorizontal: _dims.defaultPadding }}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title} numberOfLines={3}>
              {realty.title}
            </Text>
            <Ionicons
              name={`ios-heart${!realty.is_favorite ? '-outline' : ''}`}
              style={styles.socialButton}
              color="tomato"
              onPress={() => this._likeRealty(realty)}
            />
            <FeatherIcons
              onPress={() => this._share(realty)}
              name="share-2"
              style={styles.socialButton}
              color={_colors.mainColor}
            />
          </View>
          <Text style={styles.colorGray}>{realty.address}</Text>
          <View style={styles.infoWrapper}>
            <View style={styles.info}>
              <Text style={[styles.infoText, styles.fontBold]}>
                {realty.bedroom}
              </Text>
              <Text style={[styles.infoText, styles.color4]}>
                {strings.bedroom}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={[styles.infoText, styles.fontBold]}>
                {realty.bathroom}
              </Text>
              <Text style={[styles.infoText, styles.color4]}>
                {strings.bathroom}
              </Text>
            </View>
            <View style={[styles.info, styles.noBorderRight]}>
              <Text style={[styles.infoText, styles.fontBold]}>
                {realty.area}
                <Text style={[styles.infoText, styles.fontNormal]}> m²</Text>
              </Text>
              <Text style={[styles.infoText, styles.color4]}>
                {strings.area}
              </Text>
            </View>
          </View>
          <View style={styles.priceWrapper}>
            <Text style={[styles.priceMethod, styles.color4]}>
              {realty.method.name}
            </Text>
            <Text style={styles.price}>
              {realty.price} {realty.price_unit.name}
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: _dims.defaultPadding }}>
          <Accordion
            sections={SECTIONS}
            renderSectionTitle={this._renderSectionTitle}
            touchableComponent={TouchableOpacity}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            initiallyActiveSection={-1}
          />
        </View>
        <Text style={styles.contact}>{strings.contactAgency}</Text>
        <View style={styles.userContact}>
          <Text style={styles.userNameContact}>{realty.contact_name}</Text>
          <TouchableOpacity
            onPress={() => {
              call({
                number: realty.contact_phone,
                prompt: true
              }).catch(err => _alert(alertStrings.error, err.message));
            }}
            style={styles.callWrapper}
          >
            <Ionicons name="ios-call" style={styles.call} />
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <View style={styles.line}>
            <Ionicons name="ios-person" style={styles.lineIcon} />
            <TextInput
              ref={name => {
                this.name = name;
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
          <View style={styles.line}>
            <Ionicons name="ios-mail" style={styles.lineIcon} />
            <TextInput
              ref={email => {
                this.email = email;
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
          <View style={styles.line}>
            <Ionicons name="ios-call" style={styles.lineIcon} />
            <TextInput
              ref={phone => {
                this.phone = phone;
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
        </View>
        <TouchableOpacity style={styles.submit} onPress={this._sendContact}>
          {this.props.listContact.sending ? (
            <ActivityIndicator animating color="#fff" />
          ) : (
            <Text style={styles.submitText}>{strings.submit}</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  _renderItemWithParallax = ({ item }, parallaxProps) => {
    return <SliderEntry data={item} parallax parallaxProps={parallaxProps} />;
  };

  _renderSectionTitle = () => {
    return <View style={{ height: 1 }} />;
  };

  _renderHeader = (section, index, isActive) => {
    const plus = isActive ? 6 : 2;
    const size = responsiveFontSize(_dims.defaultFontSize + plus);
    return (
      <View style={styles.header}>
        <Text style={[styles.headerText, isActive && { fontWeight: 'bold' }]}>
          {section.title}
        </Text>
        <Ionicons
          style={[
            styles.headerIcon,
            isActive && {
              transform: [{ rotate: '90deg' }]
            }
          ]}
          name="ios-arrow-forward"
          size={size}
        />
      </View>
    );
  };

  _renderContent = (section, i, isActive, sections) => {
    const _content = '---------------------';
    if (i === 0) {
      return (
        <View style={styles.content}>
          {section.content ? (
            <Text style={styles.colorGray}>{section.content}</Text>
          ) : (
            <Text style={[styles.colorGray, { textAlign: 'center' }]}>
              {_content}
            </Text>
          )}
        </View>
      );
    }
    if (i === 1) {
      if (section.content.length === 0) {
        return (
          <View style={styles.content}>
            <Text style={[styles.colorGray, { textAlign: 'center' }]}>
              {_content}
            </Text>
          </View>
        );
      }
      return (
        <View style={styles.content}>
          <FlatList
            data={section.content}
            renderItem={({ item }) => (
              <Text style={{ paddingVertical: _dims.defaultPadding * 2 }}>
                {item.name}
              </Text>
            )}
            keyExtractor={() => `${Math.random()}`}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: 'silver' }} />
            )}
          />
        </View>
      );
    }
    if (i === 2) {
      return (
        <TouchableOpacity style={styles.content}>
          <FastImage
            style={styles.onMap}
            source={{
              uri: section.content,
              priority: FastImage.priority.high
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
      );
    }
    if (section.content && _ios) {
      return <YouTube videoId={section.content} style={styles.youtube} />;
    } else if (section.content) {
      return (
        <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
          <TouchableOpacity
            onPress={() => {
              YouTubeStandaloneAndroid.playVideo({
                apiKey: 'AIzaSyCigMlG2q9yWMg1sV2vwfCjZr_jmXSQJis',
                videoId: section.content,
                autoplay: true
              }).catch(errorMessage => _alert('Youtube error', errorMessage));
            }}
          >
            <Text style={styles.youtubeLink}>Play video</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };
  _handleTextRef = ref => {
    this.text = ref;
  };

  _onScroll = event => {
    const { height } = event.nativeEvent.contentSize;
    const offsetY = event.nativeEvent.contentOffset.y;
    const toValue =
      _dims.screenHeight + offsetY >= height - _dims.defaultPadding * 4 ? 0 : 1;
    Animated.timing(this.fabBottom, {
      toValue,
      duration: 50
    }).start();
  };

  render() {
    const { params } = this.props.navigation.state;
    const realty = this.props.realtyDetail.data[params.data.id];
    const bottom = this.fabBottom.interpolate({
      inputRange: [0, 1],
      outputRange: [-responsiveWidth(15), 0]
    });
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          onLeftPress={() => {
            const onBack = this.props.navigation.getParam('onBack');
            if (onBack) {
              onBack();
            } else {
              this.props.navigation.goBack();
            }
          }}
          title={params.data.title}
          right={
            realty && this.props.auth.user.id === realty.author_id
              ? // <TouchableOpacity onPress={() => this.actionSheetRealty.show()}>
                //   <Ionicons
                //     name="md-more"
                //     size={30}
                //     color={_colors.mainColor}
                //     style={{ padding: 10 }}
                //   />
                // </TouchableOpacity>
                null
              : null
          }
        />
        {!this.props.realtyDetail.fetching && realty && realty.id ? (
          <Animated.View style={[styles.fabWrapper, { bottom }]}>
            <TouchableOpacity
              onPress={() => this.scroll.scrollToEnd({ animated: true })}
              style={styles.fab}
            >
              <Ionicons name="ios-person" style={styles.fabIcon} />
              <Text style={styles.fabText}>{strings.contactAgency}</Text>
            </TouchableOpacity>
          </Animated.View>
        ) : null}

        <KeyboardAwareScrollView
          ref={ref => {
            this.scroll = ref;
          }}
          onScroll={this._onScroll}
        >
          {this.props.realtyDetail.fetching ? (
            <PlaceHolder />
          ) : (
            this._renderLoadDone(realty)
          )}
        </KeyboardAwareScrollView>
        <ActionSheet
          ref={o => {
            this.actionSheetRealty = o;
          }}
          options={[strings.hideRealty, strings.editRealty, strings.cancel]}
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
  realtyDetail: state.realtyDetail,
  auth: state.auth,
  listContact: state.listContact
}))(RealtyDetail);

const buttonColor = '#f1f9ff';
const priceColor = '#ff9240';

export const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  fontTitle: {
    fontSize: responsiveFontSize(_dims.defaultFontTitle)
  },
  fontBold: {
    fontWeight: 'bold'
  },
  fontNormal: {
    fontWeight: 'normal'
  },
  color4: {
    color: '#444'
  },
  fabWrapper: {
    position: 'absolute',
    width: _dims.screenWidth,
    zIndex: Number.MAX_SAFE_INTEGER
  },
  fab: {
    flexDirection: 'row',
    height: responsiveWidth(15),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: _colors.mainColor
  },
  fabIcon: {
    fontSize: responsiveFontSize(_dims.defaultFontTitle + 6),
    color: '#fff',
    marginRight: _dims.defaultPadding
  },
  fabText: {
    color: '#fff',
    fontSize: responsiveFontSize(_dims.defaultFontTitle),
    fontWeight: 'bold'
  },
  titleWrapper: {
    flexDirection: 'row',
    marginTop: responsiveWidth(5)
  },
  title: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(_dims.defaultFontTitle + 2),
    color: 'black'
  },
  colorGray: {
    color: '#777'
  },
  socialButton: {
    fontSize: responsiveFontSize(_dims.defaultFontTitle + 3),
    padding: 5,
    marginLeft: 5
  },
  infoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: responsiveWidth(5)
  },
  info: {
    flexGrow: 1,
    borderRightWidth: 2,
    borderColor: _colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoText: {
    fontSize: responsiveFontSize(_dims.defaultFontSubTitle)
  },
  noBorderRight: {
    borderRightWidth: 0
  },
  priceWrapper: {
    alignSelf: 'center',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveWidth(2),
    marginTop: responsiveWidth(5),
    marginBottom: responsiveWidth(2),
    minWidth: responsiveWidth(50),
    backgroundColor: buttonColor,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  price: {
    color: priceColor,
    fontSize: responsiveFontSize(_dims.defaultFontTitle + 4),
    marginTop: responsiveWidth(2),
    fontWeight: 'bold'
  },
  priceMethod: {
    fontSize: responsiveFontSize(_dims.defaultFontTitle)
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  header: {
    flexDirection: 'row',
    backgroundColor: buttonColor,
    padding: 20
  },
  headerText: {
    flex: 1,
    color: _colors.mainColor
  },
  headerIcon: {
    color: _colors.mainColor
  },
  content: {
    padding: _dims.defaultPadding,
    backgroundColor: 'transparent'
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)'
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)'
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  activeSelector: {
    fontWeight: 'bold'
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10
  },
  investor: {
    width: responsiveWidth(20),
    height: responsiveWidth(20)
  },
  onMap: {
    width: _dims.screenWidth - _dims.defaultPadding * 2,
    height: (_dims.screenWidth - _dims.defaultPadding * 2) * 0.5,
    borderRadius: 2,
    alignSelf: 'center'
  },
  contact: {
    fontWeight: 'bold',
    marginHorizontal: _dims.defaultPadding,
    marginTop: _dims.defaultPadding * 2,
    color: _colors.mainColor
  },
  userContact: {
    flexDirection: 'row',
    marginHorizontal: _dims.defaultPadding,
    alignItems: 'center',
    marginTop: _dims.defaultPadding
  },
  userNameContact: {
    fontSize: responsiveFontSize(_dims.defaultFontTitle),
    flex: 1,
    fontWeight: 'bold'
  },
  callWrapper: {
    width: responsiveWidth(16),
    height: responsiveWidth(16),
    borderColor: '#3bcce1',
    borderWidth: 1,
    borderRadius: responsiveWidth(16) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20
  },
  call: {
    color: _colors.mainColor,
    fontSize: responsiveFontSize(_dims.defaultFontTitle + 6)
  },
  form: {
    marginHorizontal: _dims.defaultPadding,
    marginVertical: _dims.defaultPadding * 3
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: _colors.mainColor,
    marginBottom: _dims.defaultPadding * 2
  },
  lineIcon: {
    color: _colors.mainColor,
    fontSize: responsiveFontSize(_dims.defaultFontTitle + 6)
  },
  input: {
    backgroundColor: 'transparent',
    flex: 1,
    marginLeft: 7,
    color: 'black'
  },
  submit: {
    padding: 20,
    minWidth: responsiveWidth(50),
    alignSelf: 'center',
    backgroundColor: '#3bcce1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginTop: _dims.defaultPadding,
    marginBottom: _dims.defaultPadding * 4
  },
  submitText: {
    color: '#fff',
    fontSize: responsiveFontSize(_dims.defaultFontTitle + 2),
    fontWeight: 'bold'
  },
  youtube: {
    alignSelf: 'stretch',
    height: (_dims.screenWidth - _dims.defaultPadding * 2) * 0.75,
    marginTop: 5
  },
  youtubeLink: {
    color: _colors.mainColor,
    paddingHorizontal: 10,
    textDecorationLine: 'underline'
  }
});
