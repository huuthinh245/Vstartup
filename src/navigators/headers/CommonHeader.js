import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { styles } from './styles';

export default class Header extends React.Component {
  _renderContent = () => {
    if (this.props.modal) {
      return (
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.left} />
          <View style={styles.titleWrapper}>
            <Text numberOfLines={1} style={styles.title}>
              {this.props.title}
            </Text>
          </View>
          <TouchableOpacity style={styles.left} onPress={this.props.onRightPress}>
            <Ionicons name="ios-close" style={[styles.icon, { fontSize: 30 }]} />
          </TouchableOpacity>
        </View>
      );
    }
    if (this.props.outer) {
      return (
        <View style={styles.titleWrapper}>
          <View style={styles.left}>
            {this.props.left && (
              <TouchableOpacity style={styles.left} onPress={this.props.onLeftPress}>
                <Text>{this.props.left}</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text numberOfLines={1} style={styles.title}>
            {this.props.title}
          </Text>
          <View style={styles.left}>{this.props.right}</View>
        </View>
      );
    }
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={styles.left} onPress={this.props.onLeftPress}>
          <Ionicons name="md-arrow-back" style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.titleWrapper}>
          <Text numberOfLines={1} style={styles.title}>
            {this.props.title}
          </Text>
        </View>
        {this.props.right ? (
          <View style={styles.left}>{this.props.right}</View>
        ) : (
          <View style={styles.left} />
        )}
      </View>
    );
  };

  render() {
    return <View style={[this.props.containerStyle, styles.wrapper]}>{this._renderContent()}</View>;
  }
}
