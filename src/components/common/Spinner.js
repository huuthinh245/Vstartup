import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-native-spinkit';
import { responsiveFontSize, _dims, responsiveHeight } from '../../utils/constants';

export default class Spin extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string
  };
  static defaultProps = {
    color: 'orange',
    size: responsiveFontSize(_dims.defaultFontInput + 6),
    type: 'Circle'
  };
  render() {
    return (
      <Spinner
        isVisible
        size={this.props.size}
        type={this.props.type}
        color={this.props.color}
        style={{
          alignSelf: 'center',
          position: 'absolute',
          top: responsiveHeight(35),
          zIndex: Number.MAX_SAFE_INTEGER
        }}
      />
    );
  }
}
