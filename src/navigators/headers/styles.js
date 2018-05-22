import { StyleSheet } from 'react-native';
import { _colors, _dims, _ios, responsiveFontSize } from '../../utils/constants';

export const styles = StyleSheet.create({
  wrapper: {
    height: _dims.navBarHeight,
    paddingTop: _ios ? 20 : 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'silver'
  },
  searchBarInputWrapper: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'silver',
    paddingHorizontal: 10,
    marginVertical: 8
  },
  searchBarInput: {
    fontSize: responsiveFontSize(_dims.defaultFontSize),
    flex: 1,
    padding: 5,
    backgroundColor: 'transparent'
  },
  searchBarInputClear: {
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  left: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: _dims.navBarHeight * 0.75
  },
  center: {
    flex: 1
  },
  icon: {
    fontSize: 30,
    color: _colors.mainColor,
    fontWeight: 'bold'
  },
  iconText: {
    fontSize: responsiveFontSize(_dims.defaultFontInput),
    color: _colors.mainColor
  },
  titleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    color: '#000',
    fontSize: responsiveFontSize(_dims.defaultFontTitle),
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
