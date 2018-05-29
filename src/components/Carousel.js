import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { _dims } from '../utils/constants';
import SliderEntry from './SliderEntry';
import RealtyItem from './RealtyItem';
import * as routes from '../routes/routes';

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

export default class ProjectDetail extends Component {
  _renderItemWithParallax = ({ item }, parallaxProps) => {
    if (this.props.isRealty) {
      return (
        <RealtyItem
          data={item}
          onPress={() => this.props.navigation.navigate(routes.projectDetail, { data: item })}
        />
      );
    }
    return <SliderEntry data={item} parallax parallaxProps={parallaxProps} />;
  };

  render() {
    return (
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
        firstItem={0}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.7}
        inactiveSlideShift={_dims.defaultPadding * 2}
        containerCustomStyle={this.props.isRealty ? styles.slider : {}}
        contentContainerCustomStyle={styles.sliderContentContainer}
      />
    );
  }
}

export const styles = StyleSheet.create({
  slider: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    zIndex: Number.MAX_SAFE_INTEGER - 1
  },
  sliderContentContainer: {}
});
