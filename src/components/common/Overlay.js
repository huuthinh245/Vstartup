import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { _dims } from '../../utils/constants';

export default class Overlay extends React.Component {
  static propTypes = {
    opacity: PropTypes.number
  };
  static defaultProps = {
    opacity: 0.4
  };
  render() {
    return this.props.visible ? (
      <View
        style={{
          width: _dims.screenWidth,
          height: _dims.screenHeight,
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: Number.MAX_SAFE_INTEGER - 1,
          backgroundColor: `rgba(0,0,0,${this.props.opacity})`,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator animating zIndex={Number.MAX_SAFE_INTEGER} />
      </View>
    ) : null;
  }
}
