import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { _colors } from '../../utils/constants';
  
const ExtendsionItem = ({ title, onPress, checked, style }) => {
  return(
    <TouchableOpacity
      style={[{ flexDirection: 'row', paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: _colors.mainColor }, style]}
      onPress={onPress}
    >
      <Text style={{ flex: 1 }}>{title}</Text>
      <CheckBox
        iconRight
        containerStyle={{ backgroundColor: '#fff', borderWidth: 0, alignSelf: 'flex-end', margin: 0, padding: 0 }}
        checked={checked}    
        checkedColor={_colors.mainColor}
        uncheckedColor={_colors.mainColor}
        onPress={onPress}
      />
    </TouchableOpacity>
  );
};

export default ExtendsionItem;