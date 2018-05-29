import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  findNodeHandle,
  Share
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import Accordion from 'react-native-collapsible/Accordion';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import call from 'react-native-phone-call';
import { connect } from 'react-redux';
import Spinner from 'react-native-spinkit';
import YouTube from 'react-native-youtube';

import * as routes from './routes';
import { _colors, _dims, responsiveFontSize, pluralNoun } from '../utils/constants';
import SliderEntry from '../components/SliderEntry';
import strings from '../localization/projectDetail';
import Header from '../navigators/headers/CommonHeader';
import { _alert } from '../utils/alert';
import { styles } from './ProjectDetail';
import {
  getRealtyDetailAction,
  likeRealtyAction,
  unlikeRealtyAction
} from '../redux/realtyDetail/actions';

class RealtyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: 1,
      fabVisible: true,
      name: '',
      email: '',
      phone: ''
    };
  }

  componentDidMount() {
    const { id } = this.props.navigation.state.params.data;
    getRealtyDetailAction({ id });
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

  _share = () => {
    Share.share(
      {
        message: "BAM: we're helping your business with awesome React Native apps",
        url: 'http://bam.tech',
        title: 'Wow, did you see that?'
      },
      {
        // Android only:
        dialogTitle: 'Share BAM goodness',
        // iOS only:
        excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter']
      }
    );
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
        {this.state.fabVisible && (
          <TouchableOpacity
            onPress={() => this.scroll.scrollToEnd({ animated: true })}
            style={[styles.fab, !this.state.fabVisible && { display: 'none' }]}
          >
            <Ionicons name="ios-person" style={styles.fabIcon} />
            <Text style={styles.fabText}>{strings.contactAgency}</Text>
          </TouchableOpacity>
        )}
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
          firstItem={this.state.slider1ActiveSlide}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          inactiveSlideShift={_dims.defaultPadding * 2}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
        />
        <View style={{ paddingHorizontal: _dims.defaultPadding }}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title} numberOfLines={1}>
              {realty.title}
            </Text>
            <Ionicons
              name={`ios-heart${realty.is_favorite ? '-outline' : ''}`}
              style={styles.socialButton}
              color="red"
              onPress={() => this._likeRealty(realty)}
            />
            <FeatherIcons
              onPress={this._share}
              name="share-2"
              style={styles.socialButton}
              color={_colors.mainColor}
            />
          </View>
          <Text style={styles.colorGray}>{realty.address}</Text>
          <View style={styles.infoWrapper}>
            <View style={styles.info}>
              <Text style={[styles.infoText, styles.fontBold]}>{realty.bedroom}</Text>
              <Text style={[styles.infoText, styles.color4]}>
                {pluralNoun(realty.bedroom, strings.bedroom)}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={[styles.infoText, styles.fontBold]}>{realty.bathroom}</Text>
              <Text style={[styles.infoText, styles.color4]}>
                {pluralNoun(realty.bathroom, strings.bathroom)}
              </Text>
            </View>
            <View style={[styles.info, styles.noBorderRight]}>
              <Text style={[styles.infoText, styles.fontBold]}>
                {realty.area}
                <Text style={[styles.infoText, styles.fontNormal]}> m²</Text>
              </Text>
              <Text style={[styles.infoText, styles.color4]}>{strings.area}</Text>
            </View>
          </View>
          <View style={styles.priceWrapper}>
            <Text style={[styles.priceMethod, styles.color4]}>{realty.method}</Text>
            <Text style={styles.price}>
              {realty.price} {realty.price_unit}
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: _dims.defaultPadding }}>
          <Accordion
            sections={SECTIONS}
            renderSectionTitle={this._renderSectionTitle}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            initiallyActiveSection={0}
          />
        </View>
        <Text style={styles.contact}>{strings.contactAgency}</Text>
        <View style={styles.userContact}>
          <Text style={styles.userNameContact}>{realty.contact_name}</Text>
          <TouchableOpacity
            onPress={async () => {
              try {
                await call({
                  number: realty.contact_phone,
                  prompt: true
                });
              } catch (e) {
                _alert(e.message);
              }
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
              onChangeText={name => this.setState({ name })}
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              onFocus={event => {
                this.scroll.scrollToFocusedInput(findNodeHandle(event.target));
              }}
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
              onChangeText={email => this.setState({ email })}
              returnKeyType="next"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              onFocus={event => {
                this.scroll.scrollToFocusedInput(findNodeHandle(event.target));
              }}
            />
          </View>
          <View style={styles.line}>
            <Ionicons name="ios-call" style={styles.lineIcon} />
            <TextInput
              ref={phone => {
                this.phone = phone;
              }}
              style={styles.input}
              placeholder={strings.name}
              onChangeText={phone => this.setState({ phone })}
              returnKeyType="go"
              autoCapitalize="none"
              keyboardType="phone-pad"
              autoCorrect={false}
              clearButtonMode="always"
              onFocus={event => {
                this.scroll.scrollToFocusedInput(findNodeHandle(event.target));
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.submit}
          onPress={() => this.scroll.scrollToEnd({ animated: true })}
        >
          <Text style={styles.submitText}>{strings.submit}</Text>
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
        <Text style={[styles.headerText, isActive && { fontWeight: 'bold' }]}>{section.title}</Text>
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
            <Text style={[styles.colorGray, { textAlign: 'center' }]}>{_content}</Text>
          )}
        </View>
      );
    }
    if (i === 1) {
      if (section.content.length === 0) {
        return (
          <View style={styles.content}>
            <Text style={[styles.colorGray, { textAlign: 'center' }]}>{_content}</Text>
          </View>
        );
      }
      return (
        <View style={styles.content}>
          <FlatList
            data={section.content}
            renderItem={({ item }) => (
              <Text style={{ paddingVertical: _dims.defaultPadding * 2 }}>{item.name}</Text>
            )}
            keyExtractor={() => `${Math.random()}`}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'silver' }} />}
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
    return (
      <YouTube
        apiKey="AIzaSyCigMlG2q9yWMg1sV2vwfCjZr_jmXSQJis"
        videoId="KVZ-P-ZI6W4"
        style={styles.youtube}
      />
    );
  };

  _handleTextRef = ref => {
    this.text = ref;
  };

  render() {
    const { params } = this.props.navigation.state;
    const realty = this.props.realtyDetail.data[params.data.id];

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header onLeftPress={() => this.props.navigation.goBack()} title={params.data.title} />
        <KeyboardAwareScrollView
          ref={scroll => {
            this.scroll = scroll;
          }}
          onScroll={event => {
            return;
            const { height } = event.nativeEvent.contentSize;
            const offsetY = event.nativeEvent.contentOffset.y;
            if (_dims.screenHeight + offsetY >= height - _dims.defaultPadding * 4) {
              this.setState({ fabVisible: false });
            } else {
              this.setState({ fabVisible: true });
            }
          }}
        >
          {this.props.realtyDetail.fetching ? (
            <Spinner
              isVisible
              type="Circle"
              color="orange"
              size={_dims.indicator}
              style={{ alignSelf: 'center', marginTop: 10 }}
            />
          ) : (
            this._renderLoadDone(realty)
          )}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default connect(state => ({ realtyDetail: state.realtyDetail, auth: state.auth }))(
  RealtyDetail
);
