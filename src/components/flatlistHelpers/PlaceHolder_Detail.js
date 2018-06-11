import React from 'react';
import { View, StyleSheet } from 'react-native';
import Placeholder from 'rn-placeholder';

import { responsiveHeight, _dims, responsiveWidth } from '../../utils/constants';

export default class PlaceHolder extends React.Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={{ alignItems: 'center' }}>
          <Placeholder.Box height={responsiveHeight(20)} width="80%" radius={5} />
        </View>
        <View style={styles.indicator} />
        <View style={styles.indicator} />
        <Placeholder.ImageContent
          size={90}
          lineNumber={5}
          textSize={14}
          lineSpacing={5}
          width="100%"
          lastLineWidth="30%"
        />
        <View style={styles.indicator} />
        <View style={styles.indicator} />
        <View style={styles.indicator} />
        <Placeholder.Paragraph
          lineNumber={7}
          textSize={14}
          lineSpacing={5}
          width="100%"
          lastLineWidth="70%"
        />

        <View style={styles.indicator} />
        <View style={styles.indicator} />
        <Placeholder.Paragraph
          lineNumber={5}
          textSize={14}
          lineSpacing={5}
          width="100%"
          lastLineWidth="30%"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    padding: _dims.defaultPadding
  },
  indicator: {
    height: _dims.defaultPadding
  },
  media: {}
});
