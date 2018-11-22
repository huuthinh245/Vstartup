import {
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity
} from 'react-native-global-props';

import { responsiveFontSize, _dims, _ios } from './constants';

const customTextInputProps = {
  underlineColorAndroid: 'rgba(0,0,0,0)',
  placeholderTextColor: 'silver',
  style: {
    padding: 10,
    fontSize: responsiveFontSize(_dims.defaultFontInput),
    color: 'black'
  }
};

const customTextProps = {
  style: {
    fontSize: responsiveFontSize(_dims.defaultFontSize),
    fontFamily: _ios ? 'HelveticaNeue' : 'Roboto',
    color: 'black'
  }
};

const customImageProps = {
  resizeMode: 'cover'
};

const customTouchableOpacityProps = {
  hitSlop: { top: 5, right: 5, left: 5, bottom: 5 },
  activeOpacity: 0.7
};

export const configProps = () => {
  setCustomTextInput(customTextInputProps);
  setCustomText(customTextProps);
  setCustomImage(customImageProps);
  setCustomTouchableOpacity(customTouchableOpacityProps);
};
