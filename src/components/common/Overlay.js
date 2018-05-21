import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Spinner from 'react-native-spinkit';
import { responsiveFontSize, _dims, responsiveHeight } from '../../utils/constants';

export default class Overlay extends React.Component {
  static propTypes = {
    opacity: PropTypes.number,
    visible: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string
  };
  static defaultProps = {
    opacity: 0.4,
    color: 'orange',
    size: responsiveFontSize(_dims.defaultFontInput + 6),
    type: 'Circle',
    visible: true
  };
  render() {
    return (
      <View style={{ zIndex: Number.MAX_SAFE_INTEGER, backgroundColor: 'red', flex: 1 }}>
        {this.props.visible && (
          <View
            style={{
              width: _dims.screenWidth,
              height: _dims.screenHeight,
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: `rgba(0,0,0,${this.props.opacity})`,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Spinner
              size={this.props.size}
              type={this.props.type}
              color={this.props.color}
              style={{
                alignSelf: 'center',
                position: 'absolute',
                top: responsiveHeight(35)
              }}
            />
          </View>
        )}
      </View>
    );
  }
}
