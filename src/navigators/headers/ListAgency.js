import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { styles } from './styles';
import headerStrings from '../../localization/header';

export default class Header extends React.Component {
  _renderContent = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={styles.left} onPress={() => this.props.navigation.goBack()}>
          <Ionicons name="md-arrow-back" style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.searchBarInputContainer}>
          <Ionicons
            size={18}
            color="gray"
            name="ios-search"
            style={{ alignSelf: 'center', marginRight: 5 }}
          />
          <TextInput
            style={styles.input}
            value={this.props.value}
            onChangeText={this.props.onChangeText}
            placeholder={headerStrings.listAgency}
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
          />
        </View>
      </View>
    );
  };

  render() {
    return <View style={styles.wrapper}>{this._renderContent()}</View>;
  }
}
