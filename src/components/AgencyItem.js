import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Placeholder from 'rn-placeholder';

import AirbnbRating from '../components/rating';

import { responsiveFontSize, _dims, responsiveHeight } from '../utils/constants';

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
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.infoWrapper}>
          <Text numberOfLines={1} style={styles.text}>
            {data.name}
          </Text>
          <AirbnbRating
            count={data.rating}
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
    <View style={[styles.placeHolder, props.style]}>
      <Placeholder.ImageContent
        size={responsiveHeight(20)}
        lineNumber={5}
        textSize={14}
        lineSpacing={5}
        width="90%"
        firstLineWidth="90%"
        lastLineWidth="30%"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: _dims.screenWidth / 2 - _dims.defaultPadding * 1.5,
    height: (_dims.screenWidth / 2 - _dims.defaultPadding * 1.5) * 1.25,
    borderRadius: 20,
    backgroundColor: '#ddd'
  },
  placeHolder: {
    width: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
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
