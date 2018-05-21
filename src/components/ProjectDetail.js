import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import Accordion from 'react-native-collapsible/Accordion';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import call from 'react-native-phone-call';

import { _colors, _dims, responsiveFontSize, responsiveWidth } from '../utils/constants';
import SliderEntry from './SliderEntry';
import strings from '../localization/projectDetail';
import Header from '../navigators/headers/CommonHeader';
import { _alert } from '../utils/alert';

export const ENTRIES1 = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/UYiroysl.jpg'
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg'
  },
  {
    title: 'Acrocorinth, Greece',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
  },
  {
    title: 'Middle Earth, Germany',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/lceHsT6l.jpg'
  }
];

const SECTIONS = [
  {
    title: strings.describe,
    content:
      'This major release v1.0.0-beta supports anchor state 🎉, which means that you can have a middle state between collapsed and expanded.'
  },
  {
    title: strings.utils,
    content: ['Gan truong hoc', 'Gan cho', 'Co garage oto']
  },
  {
    title: strings.investors,
    content: [
      'https://bikenconnect.com/landing/images/bike/1.jpg',
      'https://bikenconnect.com/landing/images/bike/1.jpg'
    ]
  },
  {
    title: strings.location,
    content: 'https://bikenconnect.com/landing/images/bike/1.jpg'
  },
  {
    title: strings.video,
    content: 'https://www.youtube.com/watch?v=nTaX4reePfA'
  }
];

export default class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: 1,
      fabVisible: true
    };
  }
  _renderItemWithParallax = ({ item }, parallaxProps) => {
    return <SliderEntry data={item} parallax parallaxProps={parallaxProps} />;
  };

  _renderSectionTitle = () => {
    return <View style={{ height: 1 }} />;
  };

  _renderHeader = (section, index, isActive) => {
    const plus = isActive ? 8 : 4;
    const size = responsiveFontSize(_dims.defaultFontTitle + plus);
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
    if (i === 0) {
      return (
        <View style={styles.content}>
          <Text>{section.content}</Text>
        </View>
      );
    }
    if (i === 1) {
      return (
        <View style={styles.content}>
          <FlatList
            data={section.content}
            renderItem={({ item }) => (
              <Text style={{ paddingVertical: _dims.defaultPadding * 2 }}>{item}</Text>
            )}
            keyExtractor={() => `${Math.random()}`}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'silver' }} />}
          />
        </View>
      );
    }
    if (i === 2) {
      return (
        <View style={styles.content}>
          <FlatList
            style={{ alignSelf: 'center' }}
            data={section.content}
            renderItem={({ item }) => {
              return (
                <FastImage
                  style={styles.investor}
                  source={{
                    uri: item,
                    priority: FastImage.priority.high
                  }}
                  resizeMode={FastImage.resizeMode.center}
                />
              );
            }}
            keyExtractor={() => `${Math.random()}`}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: _dims.defaultPadding }} />}
          />
        </View>
      );
    }
    if (i === 3) {
      return (
        <TouchableOpacity style={styles.content}>
          <FastImage
            style={styles.onMap}
            source={{
              uri: section.content,
              priority: FastImage.priority.high
            }}
            resizeMode={FastImage.resizeMode.center}
          />
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.content}>
        <Text>{section.content}</Text>
      </View>
    );
  };

  _handleTextRef = ref => {
    this.text = ref;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          navigation={this.props.navigation}
          title={this.props.navigation.state.params.data.name}
        />
        {this.state.fabVisible && (
          <TouchableOpacity
            onPress={() => this.scroll.scrollToEnd({ animated: true })}
            style={[styles.fab, !this.state.fabVisible && { display: 'none' }]}
          >
            <Ionicons name="ios-person" style={styles.fabIcon} />
            <Text style={styles.fabText}>{strings.contactAgency}</Text>
          </TouchableOpacity>
        )}
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          ref={scroll => {
            this.scroll = scroll;
          }}
          onScroll={event => {
            const { height } = event.nativeEvent.contentSize;
            const offsetY = event.nativeEvent.contentOffset.y;
            if (_dims.screenHeight + offsetY >= height - _dims.defaultPadding * 4) {
              this.setState({ fabVisible: false });
            } else {
              this.setState({ fabVisible: true });
            }
          }}
        >
          <View>
            <View style={{ height: _dims.defaultPadding }} />
            <Carousel
              style={{ marginTop: _dims.defaultPadding }}
              ref={c => {
                this._slider1Ref = c;
              }}
              data={ENTRIES1}
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
                  Cantavil hoan cau
                </Text>
                <Ionicons name="md-heart-outline" style={styles.socialButton} color="red" />
                <FeatherIcons
                  name="share-2"
                  style={styles.socialButton}
                  color={_colors.mainColor}
                />
              </View>
              <Text style={styles.address}>
                600 Dien Bien Phu, Phuong Trung My Tay, quan Hai Ba Trung, TP Ho Chi Minh
              </Text>
              <View style={styles.infoWrapper}>
                <View style={styles.info}>
                  <Text style={styles.fontBold}>5</Text>
                  <Text>Block</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.fontBold}>5</Text>
                  <Text>Block</Text>
                </View>
                <View style={styles.info}>
                  <Text style={styles.fontBold}>5</Text>
                  <Text>Block</Text>
                </View>
                <View style={[styles.info, styles.noBorderRight]}>
                  <Text style={styles.fontBold}>36.768 m2</Text>
                  <Text>Dien tich</Text>
                </View>
              </View>
              <View style={styles.priceWrapper}>
                <Text style={[styles.fontTitle, styles.fontBold]}>Can ho, chung cu</Text>
                <Text style={styles.price}>37 - 45tr / m2</Text>
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
            <Text style={styles.contact}>Lien he nha moi gioi</Text>
            <View style={styles.userContact}>
              <Text style={styles.userNameContact}>NGUYEN THANH DAT</Text>
              <TouchableOpacity
                onPress={async () => {
                  try {
                    await call({
                      number: '+84919549468',
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
                <TextInput style={styles.input} placeholder={strings.name} />
              </View>
              <View style={styles.line}>
                <Ionicons name="ios-mail" style={styles.lineIcon} />
                <TextInput style={styles.input} placeholder={strings.email} />
              </View>
              <View style={styles.line}>
                <Ionicons name="ios-call" style={styles.lineIcon} />
                <TextInput style={styles.input} placeholder={strings.phone} />
              </View>
            </View>
            <TouchableOpacity
              style={styles.submit}
              onPress={() => this.scroll.scrollToEnd({ animated: true })}
            >
              <Text style={styles.submitText}>{strings.submit}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

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
    fontSize: responsiveFontSize(_dims.defaultFontTitle + 4)
  },
  address: {
    fontSize: responsiveFontSize(_dims.defaultFontTitle),
    marginTop: responsiveWidth(5)
  },
  socialButton: {
    fontSize: responsiveFontSize(_dims.defaultFontTitle + 6),
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
  noBorderRight: {
    borderRightWidth: 0
  },
  priceWrapper: {
    alignSelf: 'center',
    padding: responsiveWidth(5),
    marginVertical: responsiveWidth(5),
    minWidth: responsiveWidth(50),
    backgroundColor: 'lightblue',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  price: {
    color: 'orange',
    fontSize: responsiveFontSize(_dims.defaultFontTitle + 10),
    marginTop: responsiveWidth(2),
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'lightblue',
    padding: 20
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: responsiveFontSize(_dims.defaultFontTitle),
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
    fontSize: responsiveFontSize(_dims.defaultFontTitle),
    fontWeight: 'bold',
    marginHorizontal: _dims.defaultPadding,
    marginTop: _dims.defaultPadding * 2
  },
  userContact: {
    flexDirection: 'row',
    marginHorizontal: _dims.defaultPadding,
    alignItems: 'center',
    marginTop: _dims.defaultPadding
  },
  userNameContact: {
    fontSize: responsiveFontSize(_dims.defaultFontTitle),
    flex: 1
  },
  callWrapper: {
    width: responsiveWidth(16),
    height: responsiveWidth(16),
    borderColor: _colors.mainColor,
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
    backgroundColor: _colors.mainColor,
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
  }
});
