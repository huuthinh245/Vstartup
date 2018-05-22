import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropsTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

import { styles } from './ProjectItem';

export default class ProjectItem extends React.Component {
  static propsType = {
    selected: PropsTypes.bool,
    showPin: PropsTypes.object
  };

  static defaultProps = {
    showPin: {
      color: 'red'
    },
    selected: false
  };

  render() {
    const { data } = this.props;
    return (
      <TouchableOpacity style={styles.wrapper} onPress={this.props.onPress} activeOpacity={0.8}>
        {this.props.selected && (
          <View style={styles.checkedOverlay}>
            <Ionicons name="md-checkmark-circle" style={styles.checked} />
          </View>
        )}

        <FastImage
          style={styles.image}
          source={{
            uri: 'https://unsplash.it/400/400?image=1',
            priority: FastImage.priority.high
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={1} onPress={this.props.onLikeRealty}>
            <Ionicons
              style={styles.favoriteButton}
              name={`ios-heart${data.is_favorite ? '-outline' : ''}`}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.infoWrapper}>
          <View style={{ flexDirection: 'row' }}>
            {this.props.showPin && (
              <Ionicons style={[styles.pin, { color: this.props.showPin.color }]} name="md-pin" />
            )}
            <Text numberOfLines={1} style={[styles.text, styles.title]}>
              {data.title}
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.text}>
            {data.price} {data.price_unit} - {data.area}
          </Text>
          <Text numberOfLines={1} style={[styles.text, styles.address]}>
            {data.address}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
