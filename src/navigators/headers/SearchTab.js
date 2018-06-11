import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { styles } from './styles';
import headerStrings from '../../localization/header';

export default class Header extends React.Component {
  _renderContent = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity activeOpacity={0.8} style={styles.left} onPress={this.props.onFlipPress}>
          <Ionicons name={this.props.flipIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.searchBarInputContainer}
          onPress={this.props.onTitlePress}
        >
          <Ionicons
            size={18}
            color="gray"
            name="ios-search"
            style={{ alignSelf: 'center', marginRight: 5 }}
          />
          <Text style={styles.searchBarInput}>
            {this.props.title || headerStrings.searchCityPlaceholder}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.left}
          onPress={this.props.onFilterPress}
        >
          <Text style={styles.iconText}>{headerStrings.filter}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return <View style={styles.wrapper}>{this._renderContent()}</View>;
  }
}
