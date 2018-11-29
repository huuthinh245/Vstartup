import { StyleSheet } from 'react-native';
import {
  _colors,
  _dims,
  _ios,
  responsiveFontSize,
  isIphoneX
} from '../../utils/constants';

export const styles = StyleSheet.create({
  wrapper: {
    height: isIphoneX ? 88 : 64,
    paddingTop: isIphoneX ? 32 : _ios ? 20 : 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    zIndex: Number.MAX_SAFE_INTEGER,
    flexDirection: 'row',
    borderColor: 'silver',
    borderBottomWidth: 1
  },
  searchBarInputContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 4,
    marginRight: 4,
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: _colors.mainColor,
    borderWidth: 1,
    borderRadius: 5
  },
  searchBarInput: {
    backgroundColor: '#fff',
    fontSize: 15,
    flex: 1,
    color: 'gray',
    margin: 7
  },
  searchBarInputClear: {
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  left: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: _dims.navBarHeight * 0.75
  },
  center: {
    flex: 1
  },
  icon: {
    fontSize: 24,
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
  },
  input: {
    flex: 1,
    padding: 0,
    margin: 0,
    alignSelf: 'center',
    height: 30,
    color: 'black'
  }
});
