import { Dimensions, PixelRatio, Platform } from 'react-native';
import JSON from 'circular-json';

const { width, height } = Dimensions.get('window');

export const responsiveWidth = widthPercent =>
  PixelRatio.roundToNearestPixel(width * widthPercent / 100);

export const responsiveHeight = heightPercent =>
  PixelRatio.roundToNearestPixel(height * heightPercent / 100);

export const responsiveFontSize = fontSize => fontSize * PixelRatio.getFontScale();

export const _colors = {
  viewBG: '#eee',
  mainColor: 'rgb(0,122,255)',
  overlay: 'rgba(0,0,0,0.5)'
};

export const _ios = Platform.OS === 'ios';

export const _dims = {
  screenWidth: width,
  screenHeight: height,
  navBarHeight: _ios ? 80 : 60,
  defaultPadding: responsiveWidth(3),
  defaultFontSize: 16,
  defaultFontInput: 18,
  defaultFontTitle: 20,
  defaultFontSubTitle: 14,
  indicator: responsiveFontSize(22)
};

export const json = obj => JSON.stringify(obj);

export const LIMIT_SERVICES = 10;

export const pluralNoun = (number, noun) => (number <= 1 ? noun : `${noun}s`);
