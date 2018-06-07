import React from 'react';
import { View, StyleSheet } from 'react-native';
import Placeholder from 'rn-placeholder';

import { responsiveHeight, _dims } from '../../utils/constants';

export const PlaceHolder = props => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.sepa} />
      <Placeholder.ImageContent
        size={responsiveHeight(20)}
        lineNumber={5}
        textSize={14}
        lineSpacing={5}
        width="90%"
        firstLineWidth="90%"
        lastLineWidth="30%"
      />
      <View style={styles.sepa} />
      <Placeholder.ImageContent
        size={responsiveHeight(20)}
        lineNumber={5}
        textSize={14}
        lineSpacing={5}
        width="90%"
        firstLineWidth="90%"
        lastLineWidth="30%"
      />
      <View style={styles.sepa} />
      <Placeholder.ImageContent
        size={responsiveHeight(20)}
        lineNumber={5}
        textSize={14}
        lineSpacing={5}
        width="90%"
        firstLineWidth="90%"
        lastLineWidth="30%"
      />
      <View style={styles.sepa} />
      <Placeholder.ImageContent
        size={responsiveHeight(20)}
        lineNumber={5}
        textSize={14}
        lineSpacing={5}
        width="90%"
        firstLineWidth="90%"
        lastLineWidth="30%"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  placeHolder: {
    width: '100%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sepa: {
    height: _dims.defaultPadding * 2
  }
});
