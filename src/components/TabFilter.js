import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated
} from 'react-native';
import { connect } from 'react-redux';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { responsiveFontSize, _colors, _dims } from '../utils/constants';

class TabFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [
        { id: 1, name: 'Loại bất động sản', value: 'any' },
        { id: 2, name: 'Giá', value: 'any' },
        { id: 3, name: 'Phòng ngủ', value: 'any' }
      ],
      bedArr: [
        { id: 0, value: '0+' },
        { id: 1, value: '1+' },
        { id: 2, value: '2+' },
        { id: 3, value: '3+' },
        { id: 4, value: '4+' },
        { id: 5, value: '5+' }
      ],
      checkId: null,
      checkBedId: null,
      translateY: new Animated.Value(0)
    };
  }

  _keyExtractor = item => item.id.toString();
  _checkId = item => {
    if (item.id === this.state.checkId) {
      this._translate(0);
      this.setState({ checkId: null });
    } else {
      this._translate(1);
      this.setState({ checkId: item.id });
    }
  };
  _translate = value => {
    Animated.timing(this.state.translateY, {
      toValue: value,
      duration: 600,
      useNativeDriver: true
    }).start();
  };
  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={this._checkId.bind(this, item)}
        style={[
          styles.wrapperItem,
          this.state.checkId === item.id && {
            backgroundColor: _colors.mainColor
          }
        ]}
      >
        <Text
          style={[
            styles.textItem,
            this.state.checkId === item.id && { color: '#fff' }
          ]}
        >
          {item.id !== 4 ? `${item.name}: ${item.value}` : item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  _renderFilterData = () => {
    const { options } = this.props;
    const { bedArr, checkBedId } = this.state;
    switch (this.state.checkId) {
      case 1:
        return options.data.projectTypes.map(item => {
          return <Text key={item.id}>{item.name}</Text>;
        });
      case 2:
        return (
          <View style={styles.sliderWrapper}>
            <MultiSlider
              sliderLength={_dims.screenWidth - _dims.defaultPadding * 4}
              // onValuesChangeStart={this._disableScroll}
              // onValuesChangeFinish={this._enableScroll}
              // onValuesChange={values => this.setState({ priceRange: values })}
              selectedStyle={styles.selectedStyle}
              unselectedStyle={styles.unselectedStyle}
              values={[0, 1000]}
              containerStyle={styles.sliderContainerStyle}
              trackStyle={styles.trackStyle}
              markerStyle={styles.markerStyle}
              min={0}
              max={1000}
              step={100}
              allowOverlap
              snapped
            />
            <View style={styles.sliderValueWrapper}>
              <Text style={styles.sliderValue}>0</Text>
              <Text style={[styles.sliderValue, styles.alignEnd]}>20</Text>
            </View>
          </View>
        );
      // eslint-disable-next-line no-fallthrough
      case 3:
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 10
            }}
          >
            {bedArr.map(item => {
              return (
                <TouchableOpacity
                  onPress={() => this.setState({ checkBedId: item.id })}
                  key={item.id}
                  style={[
                    {
                      borderWidth: 1,
                      borderColor: _colors.mainColor,
                      width: responsiveFontSize(14) * 4,
                      height: responsiveFontSize(14) * 4,
                      alignItems: 'center',
                      justifyContent: 'center'
                    },
                    checkBedId === item.id && {
                      backgroundColor: _colors.mainColor
                    }
                  ]}
                >
                  <Text
                    style={{
                      alignSelf: 'center',
                      color:
                        checkBedId === item.id ? '#fff' : _colors.mainColor,
                      fontSize: responsiveFontSize(14)
                    }}
                  >
                    {item.value}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      default:
        return <View style={{ height: 100 }} />;
    }
  };
  render() {
    const translateY = this.state.translateY.interpolate({
      inputRange: [0, 1],
      outputRange: [-500, 0]
    });
    const { options } = this.props;
    return (
      <View style={{ zIndex: 10001, backgroundColor: 'yellow' }}>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'silver',
            backgroundColor: '#fff',
            zIndex: 10000,
            height: responsiveFontSize(45)
          }}
        >
          <FlatList
            style={{ margin: 5 }}
            data={this.state.arr}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            horizontal
            ListFooterComponent={() => (
              <TouchableOpacity
                onPress={() => alert('go filter')}
                style={[styles.wrapperItem, { marginLeft: 5 }]}
              >
                <Text style={styles.textItem}>lọc</Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
          />
        </View>

        <Animated.View
          style={{
            position: 'absolute',
            width: '100%',
            top: responsiveFontSize(45),
            backgroundColor: '#fff',
            transform: [{ translateY }]
          }}
        >
          {this._renderFilterData()}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperItem: {
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 4
  },

  textItem: {
    fontSize: responsiveFontSize(16),
    color: _colors.mainColor,
    marginVertical: 5,
    marginHorizontal: 3
  },
  sliderWrapper: {
    alignSelf: 'center',
    marginTop: 50
  },
  selectedStyle: {
    backgroundColor: '#3bcce1'
  },
  unselectedStyle: {
    backgroundColor: '#b4f6ff'
  },
  sliderContainerStyle: {
    height: 10
  },
  trackStyle: {
    borderRadius: 7,
    height: 3
  },
  markerStyle: {
    height: 18,
    width: 18,
    borderRadius: 9,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#3bcce1'
  },
  sliderValueWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: _dims.defaultPadding
  },
  sliderValue: {
    alignSelf: 'flex-start',
    color: '#555'
  }
});

const mapStateToProps = state => {
  return {
    options: state.options
  };
};
export default connect(mapStateToProps)(TabFilter);
