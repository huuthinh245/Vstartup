import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PixelRatio
} from 'react-native';
import FastImage from 'react-native-fast-image';

import strings from '../localization/projectDetail';
import { _colors, _dims, responsiveFontSize } from '../utils/constants';

export default class ProjectItem extends React.Component {
  render() {
    const { item, isMine } = this.props;
    console.log(item);
    return (
      <TouchableOpacity style={styles.item} onPress={this.props.onPress}>
        <FastImage
          style={styles.itemImage}
          source={{
            uri: item.thumb,
            priority: FastImage.priority.high
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.itemInfo}>
          <Text numberOfLines={2} style={styles.itemName}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={styles.itemPrice}>
            {item.price} {item.price_unit}
          </Text>
          <Text numberOfLines={1} style={styles.itemAddress}>
            {item.address}
          </Text>
          {isMine && (
            <Text numberOfLines={1} style={styles.itemCommission}>
              {`${strings.commission}: ${item.commission}`}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: _dims.defaultPadding
  },
  itemImage: {
    width: (_dims.screenWidth - _dims.defaultPadding * 2) / 4,
    height: (_dims.screenWidth - _dims.defaultPadding * 2) / 4,
    borderRadius: 20,
    borderWidth: 1 / PixelRatio.get(),
    borderColor: 'silver'
  },
  itemInfo: {
    flex: 1,
    marginLeft: _dims.defaultPadding,
    justifyContent: 'space-between'
  },
  titleItem: {
    flexDirection: 'row'
  },
  itemName: {
    color: '#333'
  },
  itemPrice: {
    color: '#44cee2',
    fontWeight: 'bold',
    marginVertical: 3
  },
  itemAddress: {
    color: '#777'
  },
  itemIcon: {
    paddingHorizontal: _dims.defaultPadding,
    color: _colors.mainColor,
    fontSize: responsiveFontSize(_dims.defaultFontTitle + 8)
  },
  itemCommission: {
    color: 'red'
  }
});
