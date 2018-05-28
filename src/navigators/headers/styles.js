import { StyleSheet } from 'react-native';
import { _colors, _dims, _ios, responsiveFontSize } from '../../utils/constants';

export const styles = StyleSheet.create({
  wrapper: {
    height: _dims.navBarHeight,
    paddingTop: _ios ? 20 : 0,
    backgroundColor: _colors.header,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'silver',
    zIndex: Number.MAX_SAFE_INTEGER,
    flexDirection: 'row'
  },
  suggestHeader: {
    height: _dims.navBarHeight,
    paddingTop: _ios ? 20 : 0,
    justifyContent: 'center',
    borderWidth: 0
  },
  searchBarInputContainer: {
    backgroundColor: '#fff',
    height: 28,
    borderRadius: 5,
    paddingTop: 4.5,
    paddingBottom: 4.5,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 8,
    marginRight: 8,
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  searchBarInput: {
    backgroundColor: '#FFFFFF',
    fontSize: 15,
    flex: 1
  },
  suggestInput: {
    margin: 0,
    padding: 0,
    backgroundColor: 'red'
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
  }
});
