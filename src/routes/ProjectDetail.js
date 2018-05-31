import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  findNodeHandle,
  Share,
  StyleSheet
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
import { _colors, _dims, responsiveFontSize, pluralNoun, responsiveWidth } from '../utils/constants';
import SliderEntry from '../components/SliderEntry';
import strings from '../localization/projectDetail';
import Header from '../navigators/headers/CommonHeader';
import { _alert } from '../utils/alert';
import {
  getProjectDetailAction,
} from '../redux/projectDetail/actions';

class ProjectDetail extends Component {
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
    getProjectDetailAction({ id });
  }

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

  _renderLoadDone = project => {
    if (!project) {
      return null;
    }
    const SECTIONS = [
      {
        title: strings.describe,
        content: project.body
      },
      {
        title: strings.utils,
        content: project.utility
      },
      {
        title: strings.location,
        content: project.thumb_map
      },
      {
        title: strings.video,
        content: project.video
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
          data={project.image}
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
              {project.title}
            </Text>
            <FeatherIcons
              onPress={this._share}
              name="share-2"
              style={styles.socialButton}
              color={_colors.mainColor}
            />
          </View>
          <Text style={styles.colorGray}>{project.address}</Text>
          <View style={styles.infoWrapper}>
            <View style={styles.info}>
              <Text style={[styles.infoText, styles.fontBold]}>{project.bedroom}</Text>
              <Text style={[styles.infoText, styles.color4]}>
                {pluralNoun(project.bedroom, strings.bedroom)}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={[styles.infoText, styles.fontBold]}>{project.bathroom}</Text>
              <Text style={[styles.infoText, styles.color4]}>
                {pluralNoun(project.bathroom, strings.bathroom)}
              </Text>
            </View>
            <View style={[styles.info, styles.noBorderRight]}>
              <Text style={[styles.infoText, styles.fontBold]}>
                {project.area}
                <Text style={[styles.infoText, styles.fontNormal]}> m²</Text>
              </Text>
              <Text style={[styles.infoText, styles.color4]}>{strings.area}</Text>
            </View>
          </View>
          <View style={styles.priceWrapper}>
            <Text style={[styles.priceMethod, styles.color4]}>{project.method}</Text>
            <Text style={styles.price}>
              {project.price} {project.price_unit}
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
          <Text style={styles.userNameContact}>{project.contact_name}</Text>
          <TouchableOpacity
            onPress={async () => {
              try {
                await call({
                  number: project.contact_phone,
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
    const project = this.props.projectDetail.data[params.data.id];

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
          {this.props.projectDetail.fetching ? (
            <Spinner
              isVisible
              type="Circle"
              color="orange"
              size={_dims.indicator}
              style={{ alignSelf: 'center', marginTop: 10 }}
            />
          ) : (
            this._renderLoadDone(project)
          )}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default connect(state => ({ projectDetail: state.projectDetail, auth: state.auth }))(
  ProjectDetail
);

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
  fab: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: Number.MAX_SAFE_INTEGER,
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
    fontSize: responsiveFontSize(_dims.defaultFontTitle + 2)
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
    flex: 1
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
  }
});
