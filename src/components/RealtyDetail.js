import React, { Component } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import Accordion from 'react-native-collapsible/Accordion';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import call from 'react-native-phone-call';
import { connect } from 'react-redux';

import { _colors, _dims, responsiveFontSize } from '../utils/constants';
import SliderEntry from './SliderEntry';
import strings from '../localization/projectDetail';
import Header from '../navigators/headers/CommonHeader';
import { _alert } from '../utils/alert';
import { styles } from './ProjectDetail';
import { realtyApi } from '../utils/api';
import alertStrings from '../localization/alert';
import { GET_REALTY_DETAIL, GET_REALTY_DETAIL_SUCCESS } from '../redux/realtyDetail/reducer';
import Spin from './common/Spinner';

class RealtyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: 1,
      fabVisible: true,
      error: null
    };
  }

  componentDidMount() {
    const { id } = this.props.navigation.state.params.data;
    const callback = (error, data, response) => {
      if (error) {
        _alert(alertStrings.error, response.body.message);
        this.setState({ error });
      } else {
        this.props.dispatch({
          type: GET_REALTY_DETAIL_SUCCESS,
          payload: data
        });
      }
    };
    this.props.dispatch({ type: GET_REALTY_DETAIL });
    realtyApi.viewRealty(id, callback);
  }

  _renderLoadDone = realty => {
    if (this.state.error || !realty) {
      return null;
    }
    const SECTIONS = [
      {
        title: strings.describe,
        content: realty.body
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
        content: realty.thumb
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
            <Ionicons name="md-heart-outline" style={styles.socialButton} color="red" />
            <FeatherIcons name="share-2" style={styles.socialButton} color={_colors.mainColor} />
          </View>
          <Text style={styles.address}>{realty.address}</Text>
          <View style={styles.infoWrapper}>
            <View style={styles.info}>
              <Text style={styles.fontBold}>{realty.bedroom}</Text>
              <Text>{strings.bedroom}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.fontBold}>{realty.bathroom}</Text>
              <Text>{strings.bathroom}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.fontBold}>{realty.area}</Text>
              <Text>{strings.area}</Text>
            </View>
          </View>
          <View style={styles.priceWrapper}>
            <Text style={[styles.fontTitle, styles.fontBold]}>{realty.method}</Text>
            <Text style={styles.price}>{realty.price}</Text>
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
    );
  };
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
    const { params } = this.props.navigation.state;
    const realty = this.props.realtyDetail.data[params.data.id];

    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} title={params.data.title} />
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
          {this.props.realtyDetail.loading ? <ActivityIndicator /> : this._renderLoadDone(realty)}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default connect(state => ({ realtyDetail: state.realtyDetail }))(RealtyDetail);
