import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { _dims, responsiveWidth } from '../utils/constants';
import SliderEntry from './SliderEntry';
import RealtyItem from './RealtyItem';
import * as routes from '../routes/routes';

export default class CarouselView extends Component {
  _renderItemWithParallax = ({ item }, parallaxProps) => {
    if (this.props.isRealty) {
      return (
        <RealtyItem
          containerStyle={{ width: responsiveWidth(75) }}
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
        data={this.props.data}
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
