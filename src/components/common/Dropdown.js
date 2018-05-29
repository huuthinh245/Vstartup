import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import { _colors, width, responsiveFontSize, _dims } from '../../utils/constants';

const styles = StyleSheet.create({
  picker: {
    flexDirection: 'row',
  },
  dropdown_1: {
    justifyContent: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: _colors.mainColor,
    marginHorizontal: 20
  },
  dropdown_2_dropdown: {
    flex: 1,
    width: width / 2 - 40,
  },
});

const Dropdown = ({ defaultValue, onSelect, data, style }) => {
  return (
    <ModalDropdown
      defaultValue={defaultValue}
      style={[styles.dropdown_1, style]}
      textStyle={{ paddingVertical: 20, fontSize: responsiveFontSize(_dims.defaultFontSize), marginLeft: 5 }}
      dropdownStyle={styles.dropdown_2_dropdown}
      dropdownTextStyle={{ fontSize: responsiveFontSize(_dims.defaultFontSize) }}
      options={data}
      onSelect={onSelect}
    />
  );
};
export default Dropdown;