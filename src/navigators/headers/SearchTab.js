import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { styles } from './styles';
import headerStrings from '../../localization/header';

export default class Header extends React.Component {
  _renderContent = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.left}
          onPress={this.props.onFlipPress}
        >
          <Ionicons name={this.props.flipIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.searchBarInputContainer}
          onPress={this.props.onTitlePress}
        >
          <Ionicons
            size={20}
            color="gray"
            name="ios-search"
            style={{ alignSelf: 'center', marginRight: 2 }}
          />
          <Text style={styles.searchBarInput}>
            {this.props.title || headerStrings.searchCityPlaceholder}
          </Text>
          {this.props.title ? (
            <Ionicons
              size={24}
              color="gray"
              name="ios-close-circle"
              style={{
                alignSelf: 'center',
                marginLeft: 10,
                width: 24,
                height: 24
              }}
              onPress={this.props.clearAddress}
            />
          ) : null}
          {this.props.adding ? (
            <ActivityIndicator />
          ) : (
            <Ionicons
              size={24}
              color={this.props.bookmarked ? 'rgb(0,122,255)' : 'gray'}
              name={
                this.props.bookmarked ? 'ios-bookmark' : 'ios-bookmark-outline'
              }
              style={{ alignSelf: 'center', marginLeft: 7 }}
              onPress={this.props.bookmarkAddress}
            />
          )}
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
