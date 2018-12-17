import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { responsiveFontSize, _colors, _dims, _ios } from '../utils/constants';
import strings from '../localization/filter';
import emitter from '../emitter';

class TabFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [
        { id: 1, name: strings.projectType, value: 'any' },
        { id: 2, name: strings.price, value: 'any' },
        { id: 3, name: strings.bedroom, value: 'any' }
      ],
      bedArr: [
        { id: 0, value: '-' },
        { id: 1, value: '1' },
        { id: 2, value: '2' },
        { id: 3, value: '3' },
        { id: 4, value: '4' },
        { id: 5, value: '5+' }
      ],
      checkId: null,
      checkIdProject: null,
      checkBedId: null,
      translateY: new Animated.Value(0),
      flexible: false,
      priceRange: [0, 20]
    };
  }

  componentDidMount() {
    this._changeFilterTab = emitter.addListener(
      'changeFilterTab',
      dataFilter => {
        const { options } = this.props;
        if (dataFilter) {
          const dataConvert = this.convertRealtyTypes(dataFilter);

          const data = options.data.realtyTypes.filter(
            item => item.id === parseInt(dataConvert.type, 0)
          );
          const new_state = Object.assign({}, this.state);
          const new_arr = new_state.arr;
          Object.assign(new_arr[0], {
            value: data.length > 0 ? data[0].name : 'any'
          });
          Object.assign(new_arr[2], {
            value: dataConvert.bedroom
              ? this.state.bedArr[dataConvert.bedroom].value
              : 'any'
          });

          const newPrice = dataFilter.price
            ? dataFilter.price.split(',').map(Number)
            : [];
          Object.assign(new_state.bedArr, {
            value:
              newPrice[0] === 0
                ? `~ ${newPrice[1]} tỉ`
                : `${newPrice[0]} tỉ ~ ${newPrice[1]} tỉ`
          });
          this.setState({
            checkIdProject: parseInt(dataConvert.type, 0),
            arr: new_arr,
            priceRange: newPrice,
            checkBedId: dataConvert.bedroom ? dataConvert.bedroom : null
          });
        } else {
          const new_state = Object.assign({}, this.state);
          const new_arr = new_state.arr;
          Object.assign(new_arr[0], {
            value: 'any'
          });
          Object.assign(new_arr[1], {
            value: 'any'
          });
          Object.assign(new_arr[2], {
            value: 'any'
          });
          this.setState({
            checkIdProject: null,
            arr: new_arr,
            checkBedId: null
          });
        }
      }
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      const options = Object.assign({});
      if (nextState.arr[1].value !== 'any') {
        Object.assign(options, {
          price:
            nextState.arr[1].value !== 'any'
              ? `${this.state.priceRange[0]}, ${this.state.priceRange[1]}`
              : null
        });
      }
      Object.assign(options, {
        type: nextState.checkIdProject
          ? `${nextState.checkIdProject - 1}`
          : null
      });
      if (nextState.checkBedId) {
        Object.assign(options, { bedroom: nextState.checkBedId });
      }
      this.props.listenDataChange(options);
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    this._changeFilterTab.remove();
  }
  _onFilterPress = () => {
    this.props.onFilterPress();
  };
  convertRealtyTypes = info => {
    const { options } = this.props;
    const data = Object.assign({}, info);
    if (data.type) {
      Object.assign(data, {
        type: options.data.realtyTypes[parseInt(data.type, 0)].id
      });
    }
    return data;
  };

  _keyExtractor = item => item.id.toString();
  _checkId = item => {
    if (item.id === this.state.checkId) {
      this.setState({ checkId: null });
      this._translate(0);
      // this.setState({ checkId: null });
    } else {
      this._translate(1);
      this.setState({ checkId: item.id });
    }
  };
  _checkIdProjectFromFilter = item => {
    this.setState({
      checkIdProject: item.id
    });
  };
  _checkIdProject = item => {
    const { options } = this.props;
    if (item.id === this.state.checkIdProject) {
      this.setState({ checkIdProject: null });
      this.state.arr[0].value = 'any';
    } else {
      const dataProject = options.data.realtyTypes.filter(
        realtyTypes => realtyTypes.id === item.id
      );
      const new_state = Object.assign({}, this.state);
      const new_arr = new_state.arr;
      new_arr.filter(arr => {
        if (arr.id === this.state.checkId) {
          return Object.assign(arr, { value: dataProject[0].name });
        }
        return arr;
      });
      this.setState({
        checkIdProject: item.id,
        arr: new_arr
      });
    }
  };
  _translate = (value, callback) => {
    if (_ios) {
      Animated.timing(this.state.translateY, {
        toValue: value,
        duration: 400,
        useNativeDriver: true
      }).start();
    } else if (value && !this.state.flexible) {
      this.setState({ flexible: true });
      Animated.timing(this.state.translateY, {
        toValue: value,
        duration: 400,
        useNativeDriver: true
      }).start();
    } else if (value && this.state.flexible) {
      Animated.timing(this.state.translateY, {
        toValue: value,
        duration: 400,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(this.state.translateY, {
        toValue: value,
        duration: 400,
        useNativeDriver: true
      }).start(() => {
        this.setState({ flexible: false });
      });
    }
  };
  // _anim = (value, callback = () => {}) => {
  //   Animated.timing(this.state.translateY, {
  //     toValue: value,
  //     duration: 400,
  //     useNativeDriver: true
  //   }).start(() => {
  //     callback();
  //   });
  // };
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
  _closeModal = () => {
    Animated.timing(this.state.translateY, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true
    }).start(() => {
      this.setState({ checkId: null });
    });
  };

  _valueSliderChange = data => {
    const new_state = Object.assign({}, this.state);
    const new_arr = new_state.arr;
    Object.assign(new_arr[1], {
      value: data[0] === 0 ? `~ ${data[1]} tỉ` : `${data[0]} tỉ ~ ${data[1]} tỉ`
    });
    this.setState({
      arr: new_arr
    });
  };

  _checkIdBedRoom = item => {
    const new_state = Object.assign({}, this.state);
    const new_arr = new_state.arr;
    if (item.id === this.state.checkBedId) {
      Object.assign(new_arr[2], {
        value: 'any'
      });
      this.setState({
        checkBedId: null,
        arr: new_arr
      });
    } else {
      Object.assign(new_arr[2], {
        value: this.state.bedArr[item.id].value
      });
      this.setState({ checkBedId: item.id, arr: new_arr });
    }
  };
  _renderFilterData = () => {
    const { options } = this.props;
    const { bedArr, checkBedId } = this.state;
    switch (this.state.checkId) {
      case 1:
        return (
          <View style={{ flex: 1 }}>
            {options.data.realtyTypes.map(item => {
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={this._checkIdProject.bind(this, item)}
                >
                  <Text style={styles.projectItemStyle}>{item.name}</Text>
                  {item.id === this.state.checkIdProject && (
                    <Icon
                      name="ios-checkmark-outline"
                      size={36}
                      color="green"
                      style={{ position: 'absolute', right: 5 }}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        );
      case 2:
        return (
          <View style={styles.sliderWrapper}>
            <MultiSlider
              sliderLength={_dims.screenWidth - _dims.defaultPadding * 4}
              onValuesChange={this._valueSliderChange}
              selectedStyle={styles.selectedStyle}
              unselectedStyle={styles.unselectedStyle}
              values={this.state.priceRange}
              containerStyle={styles.sliderContainerStyle}
              trackStyle={styles.trackStyle}
              markerStyle={styles.markerStyle}
              min={0}
              max={20}
              step={1}
              // allowOverlap
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
          <View style={styles.wrapperBed}>
            {bedArr.map(item => {
              return (
                <TouchableOpacity
                  onPress={() => this._checkIdBedRoom(item)}
                  key={item.id}
                  style={[
                    styles.wrapperBedItem,
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
    return (
      <Animated.View
        style={[
          styles.wrapperBody,
          !_ios && this.state.flexible && { flex: 1 }
        ]}
      >
        <View style={styles.wrapperList}>
          <FlatList
            style={{ margin: 5 }}
            data={this.state.arr}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            horizontal
            ListFooterComponent={() => (
              <TouchableOpacity
                onPress={this._onFilterPress}
                style={[styles.wrapperItem, { marginLeft: 5 }]}
              >
                <Text style={styles.textItem}>{strings.filter}</Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
          />
        </View>

        <Animated.View
          style={[styles.modalStyle, { transform: [{ translateY }] }]}
          ref={abc => {
            this.abc = abc;
          }}
        >
          {this._renderFilterData()}
          <TouchableOpacity
            style={styles.buttonDoneStyle}
            onPress={this._closeModal}
          >
            <Text style={[styles.projectItemStyle, styles.buttonText]}>
              {strings.done}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperBody: {
    zIndex: 100001,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  wrapperList: {
    borderBottomWidth: 1,
    borderColor: 'silver',
    backgroundColor: '#fff',
    zIndex: 10000,
    height: responsiveFontSize(45)
  },
  wrapperItem: {
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 4
  },
  modalStyle: {
    position: 'absolute',
    width: '100%',
    top: responsiveFontSize(45),
    backgroundColor: '#fff'
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
  },
  wrapperBed: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10
  },
  wrapperBedItem: {
    borderWidth: 1,
    borderColor: _colors.mainColor,
    width: responsiveFontSize(14) * 4,
    height: responsiveFontSize(14) * 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  projectItemStyle: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  buttonDoneStyle: {
    borderTopWidth: 1,
    borderTopColor: _colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    color: _colors.mainColor,
    fontSize: responsiveFontSize(16)
  }
});

const mapStateToProps = state => {
  return {
    options: state.options
  };
};
export default connect(mapStateToProps)(TabFilter);
