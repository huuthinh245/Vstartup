import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropsTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

import { styles } from './ProjectItem';

export default class RealtyItem extends React.Component {
  static propsType = {
    showPin: PropsTypes.object
  };

  static defaultProps = {
    showPin: {
      color: 'tomato'
    }
  };

  render() {
    const { data } = this.props;
    return (
      <TouchableOpacity
        style={[styles.wrapper, this.props.containerStyle]}
        onPress={this.props.onPress}
        activeOpacity={0.8}
      >
        <FastImage
          style={styles.image}
          source={{
            uri: data.thumb,
            priority: FastImage.priority.high
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Ionicons
          style={styles.favoriteButton}
          name={`ios-heart${!data.is_favorite ? '-outline' : ''}`}
        />
        <View style={styles.infoWrapper}>
          <Text numberOfLines={1} style={[styles.text, styles.title]}>
            {data.title}
          </Text>
          <Text numberOfLines={1} style={styles.text}>
            {data.price} {data.price_unit} - {data.area}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {this.props.showPin && (
              <Ionicons style={[styles.pin, { color: this.props.showPin.color }]} name="md-pin" />
            )}
            <Text numberOfLines={1} style={[styles.text, styles.address]}>
              {data.address}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
