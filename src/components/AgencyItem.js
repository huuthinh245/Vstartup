import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Placeholder from 'rn-placeholder';

import AirbnbRating from '../components/rating';

import { responsiveFontSize, _dims } from '../utils/constants';

export default class AgencyItem extends React.Component {
  render() {
    const { data, style } = this.props;
    return (
      <TouchableOpacity style={[styles.wrapper, style]} onPress={this.props.onPress}>
        <FastImage
          style={styles.image}
          source={{
            uri: data.avatar,
            priority: FastImage.priority.high
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.infoWrapper}>
          <Text numberOfLines={1} style={styles.text}>
            {data.name}
          </Text>
          <AirbnbRating
            count={data % 5}
            size={responsiveFontSize(_dims.defaultFontSubTitle + 2)}
            showRating={false}
          />
          <Text numberOfLines={1} style={[styles.text, styles.sub]}>
            {data.phone}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export const PlaceHolder = props => {
  return (
    <View style={styles.placeHolder}>
      <Placeholder.ImageContent
        size={_dims.screenWidth / 2 - _dims.defaultPadding * 1.5}
        animate="fade"
        lineNumber={4}
        lineSpacing={5}
        lastLineWidth="30%"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: _dims.screenWidth / 2 - _dims.defaultPadding * 1.5,
    height: _dims.screenWidth / 2 - _dims.defaultPadding * 1.5,
    borderRadius: 20,
    backgroundColor: 'green'
  },
  image: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 20
  },
  sub: {
    fontSize: responsiveFontSize(_dims.defaultFontSubTitle)
  },
  infoWrapper: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 5
  },
  text: {
    flex: 1,
    textAlign: 'center',
    color: '#fff'
  }
});
