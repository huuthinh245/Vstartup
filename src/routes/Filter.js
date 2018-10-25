import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  PixelRatio,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import ModalDropdown from 'react-native-modal-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  _dims,
  _colors,
  responsiveFontSize,
  responsiveWidth
} from '../utils/constants';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import strings from '../localization/filter';

const dataSelect = [
  { id: 0, value: '_' },
  { id: 1, value: '1' },
  { id: 2, value: '2' },
  { id: 3, value: '3' },
  { id: 4, value: '4' },
  { id: 5, value: '>= 5' }
];

class Filter extends React.Component {
  constructor(props) {
    super(props);
    const { options } = this.props.navigation.state.params;
    const utilsId = options.utils ? options.utils.split(',').map(Number) : [];
    const utils = utilsId.map(id => {
      const item = this.props.options.data.utils.find(i => i.id === id);
      if (item) {
        return item;
      }
    });

    this.state = {
      scrollEnabled: true,
      method: options.method || this.props.options.data.methods[0].id,
      utils,
      priceRange: (options.price && JSON.parse(`[${options.price}]`)) || [
        0,
        20
      ],
      areaRange: (options.area && JSON.parse(`[${options.area}]`)) || [0, 1000],
      toilet: options.toilet || 0,
      bedroom: options.bedroom || 0,
      bathroom: options.bathroom || 0,
      realtyType: options.type || 0
    };
  }

  initOptions = {
    method: this.props.options.data.methods[0].id,
    utils: [],
    priceRange: [0, 20],
    areaRange: [0, 1000],
    toilet: 0,
    bedroom: 0,
    bathroom: 0,
    realtyType: 0
  };

  _renderDropdownItem = (option, index, isSelected) => {
    return (
      <View
        style={{
          height: 50,
          paddingHorizontal: _dims.defaultPadding,
          justifyContent: 'center',
          backgroundColor: isSelected ? _colors.popup : '#aaa'
        }}
      >
        <Text style={{ color: isSelected ? '#fff' : '#eee' }}>{option}</Text>
      </View>
    );
  };

  _renderItem = ({ item }) => {
    const copy = _.map(this.state.utils, _.clone);
    const name = _.some(this.state.utils, { id: item.id })
      ? 'check-box'
      : 'check-box-outline-blank';
    return (
      <TouchableOpacity
        style={styles.checkboxItem}
        onPress={() => {
          if (!_.some(copy, { id: item.id })) {
            copy.push(item);
            this.setState({ utils: copy });
          } else {
            const newData = _.reject(copy, obj => obj.id === item.id);
            this.setState({ utils: newData });
          }
        }}
      >
        <Text numberOfLines={1} style={styles.checkboxText}>
          {item.name}
        </Text>
        <MaterialIcons
          size={responsiveFontSize(_dims.defaultFontTitle + 8)}
          color="#3bcce1"
          name={name}
        />
      </TouchableOpacity>
    );
  };

  _disableScroll = () => this.setState({ scrollEnabled: false });
  _enableScroll = () => this.setState({ scrollEnabled: true });

  _clear = () => {
    const opts = Object.assign({}, this.state, this.initOptions);
    this.setState(opts);
  };

  _cancel = () => {
    const { options } = this.props.navigation.state.params;
    const opts = {
      lat: options.lat,
      lng: options.lng
    };
    this.props.navigation.state.params.onDone(opts);
    this.props.navigation.goBack();
  };

  _onSave = () => {
    const opts = this.state;
    const result = Object.assign(
      {},
      this.props.navigation.state.params.options
    );
    Object.assign(result, { method: this.state.method });
    Object.assign(result, { price: opts.priceRange.toString() });
    Object.assign(result, { area: opts.areaRange.toString() });
    if (opts.bedroom !== 0) {
      Object.assign(result, { bedroom: opts.bedroom });
    }
    if (opts.bathroom !== 0) {
      Object.assign(result, { bathroom: opts.bathroom });
    }
    if (opts.toilet !== 0) {
      Object.assign(result, { toilet: opts.toilet });
    }
    if (opts.utils.length > 0) {
      Object.assign(result, {
        utils: opts.utils.map(item => item.id).toString()
      });
    }
    if (opts.realtyType !== 0) {
      Object.assign(result, { type: `${opts.realtyType}` });
    }
    if (
      JSON.stringify(this.props.navigation.state.params.options) !==
      JSON.stringify(result)
    ) {
      this.props.navigation.state.params.onDone(result);
    }
    this.props.navigation.goBack();
  };

  _setMethod = index => {
    const { method } = this.state;
    const { methods } = this.props.options.data;
    if (methods[index].id !== method) {
      this.setState({ method: methods[index].id });
    }
  };

  render() {
    const { method } = this.state;
    const { methods } = this.props.options.data;
    const highlight = {
      color: '#3bcce1'
    };
    return (
      <View style={styles.wrapper}>
        <Header
          onLeftPress={() => this.props.navigation.goBack()}
          title={headerStrings.filterScreen}
          right={
            <TouchableOpacity onPress={this._onSave}>
              <Text style={{ color: _colors.mainColor }}>
                {headerStrings.save}
              </Text>
            </TouchableOpacity>
          }
        />
        <ScrollView scrollEnabled={this.state.scrollEnabled}>
          <View style={styles.innerWrapper}>
            <View style={styles.radios}>
              <TouchableOpacity
                onPress={this._setMethod.bind(this, 0)}
                style={styles.radio}
              >
                <Ionicons
                  name={
                    method === methods[0].id
                      ? 'ios-radio-button-on'
                      : 'ios-radio-button-off'
                  }
                  style={[
                    styles.radioIcon,
                    method === methods[0].id && highlight
                  ]}
                />
                <Text
                  style={[
                    styles.radioText,
                    method === methods[0].id && highlight
                  ]}
                >
                  {methods[0].name}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this._setMethod.bind(this, 1)}
                style={styles.radio}
              >
                <Ionicons
                  name={
                    method === methods[1].id
                      ? 'ios-radio-button-on'
                      : 'ios-radio-button-off'
                  }
                  style={[
                    styles.radioIcon,
                    method === methods[1].id && highlight
                  ]}
                />
                <Text
                  style={[
                    styles.radioText,
                    method === methods[1].id && highlight
                  ]}
                >
                  {methods[1].name}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>{strings.price}</Text>
            <View style={styles.sliderWrapper}>
              <MultiSlider
                sliderLength={_dims.screenWidth - _dims.defaultPadding * 4}
                onValuesChangeStart={this._disableScroll}
                onValuesChangeFinish={this._enableScroll}
                onValuesChange={values => this.setState({ priceRange: values })}
                selectedStyle={styles.selectedStyle}
                unselectedStyle={styles.unselectedStyle}
                values={this.state.priceRange}
                containerStyle={styles.sliderContainerStyle}
                trackStyle={styles.trackStyle}
                markerStyle={styles.markerStyle}
                min={0}
                max={20}
                allowOverlap
                snapped
              />
              <View style={styles.sliderValueWrapper}>
                <Text style={styles.sliderValue}>
                  {`${this.state.priceRange[0]} ${strings.billion}`}
                </Text>
                <Text style={[styles.sliderValue, styles.alignEnd]}>
                  {`${this.state.priceRange[1]} ${strings.billion}`}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.sliderWrapper,
                { marginTop: _dims.defaultPadding }
              ]}
            >
              <Text style={styles.title}>{strings.area}</Text>
              <MultiSlider
                sliderLength={_dims.screenWidth - _dims.defaultPadding * 4}
                onValuesChangeStart={this._disableScroll}
                onValuesChangeFinish={this._enableScroll}
                onValuesChange={values => this.setState({ areaRange: values })}
                selectedStyle={styles.selectedStyle}
                unselectedStyle={styles.unselectedStyle}
                values={this.state.areaRange}
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
                <Text style={styles.sliderValue}>
                  {`${this.state.areaRange[0]} ${strings.square}`}
                </Text>
                <Text style={[styles.sliderValue, styles.alignEnd]}>
                  {`${this.state.areaRange[1]} ${strings.square}`}
                </Text>
              </View>
            </View>

            <View style={styles.wrap}>
              <View style={styles.part}>
                <Text style={styles.label}>{strings.toilet}</Text>
                <ModalDropdown
                  renderRow={this._renderDropdownItem}
                  dropdownStyle={[
                    styles.dropdown_2_dropdown,
                    {
                      width: (_dims.screenWidth - _dims.defaultPadding * 4) / 3,
                      height: dataSelect.length * 50
                    }
                  ]}
                  dropdownTextStyle={{
                    fontSize: responsiveFontSize(_dims.defaultFontSize)
                  }}
                  options={dataSelect.map(item => item.value)}
                  defaultIndex={parseInt(this.state.toilet, 10)}
                  onSelect={index =>
                    this.setState({ toilet: parseInt(index, 10) })
                  }
                >
                  <Text style={styles.value}>
                    {dataSelect[this.state.toilet].value}
                  </Text>
                </ModalDropdown>
              </View>

              <View
                style={[
                  styles.part,
                  { marginHorizontal: _dims.defaultPadding }
                ]}
              >
                <Text style={styles.label}>{strings.bathroom}</Text>
                <ModalDropdown
                  renderRow={this._renderDropdownItem}
                  dropdownStyle={[
                    styles.dropdown_2_dropdown,
                    {
                      width: (_dims.screenWidth - _dims.defaultPadding * 4) / 3,
                      height: dataSelect.length * 50
                    }
                  ]}
                  dropdownTextStyle={{
                    fontSize: responsiveFontSize(_dims.defaultFontSize)
                  }}
                  options={dataSelect.map(item => item.value)}
                  defaultIndex={parseInt(this.state.bathroom, 10)}
                  onSelect={index =>
                    this.setState({ bathroom: parseInt(index, 10) })
                  }
                >
                  <Text style={styles.value}>
                    {dataSelect[this.state.bathroom].value}
                  </Text>
                </ModalDropdown>
              </View>
              <View style={styles.part}>
                <Text style={styles.label}>{strings.bedroom}</Text>
                <ModalDropdown
                  renderRow={this._renderDropdownItem}
                  dropdownStyle={[
                    styles.dropdown_2_dropdown,
                    {
                      width: (_dims.screenWidth - _dims.defaultPadding * 4) / 3,
                      height: dataSelect.length * 50
                    }
                  ]}
                  dropdownTextStyle={{
                    fontSize: responsiveFontSize(_dims.defaultFontSize)
                  }}
                  options={dataSelect.map(item => item.value)}
                  defaultIndex={parseInt(this.state.bedroom, 10)}
                  onSelect={index =>
                    this.setState({ bedroom: parseInt(index, 10) })
                  }
                >
                  <Text style={styles.value}>
                    {dataSelect[this.state.bedroom].value}
                  </Text>
                </ModalDropdown>
              </View>
            </View>
            <Text
              style={[
                styles.title,
                {
                  marginBottom: _dims.defaultPadding,
                  marginTop: _dims.defaultPadding
                }
              ]}
            >
              {strings.utils}
            </Text>
            <FlatList
              renderItem={this._renderItem}
              data={_.values(this.props.options.data.utils)}
              extraData={this.state.utils}
              keyExtractor={() => `${Math.random()}`}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: _dims.defaultPadding * 2
              }}
            >
              <Text
                style={{
                  fontSize: responsiveFontSize(_dims.defaultFontSubTitle),
                  color: _colors.mainColor,
                  marginRight: _dims.defaultPadding
                }}
              >
                {strings.projectType}
              </Text>
              <View style={{ flex: 1 }}>
                <ModalDropdown
                  renderRow={this._renderDropdownItem}
                  dropdownStyle={[
                    styles.dropdown_2_dropdown,
                    { width: '80%', height: dataSelect.length * 50 }
                  ]}
                  adjustFrame={style => {
                    style.left -=
                      responsiveWidth(10) - _dims.defaultPadding * 1.5;
                    return style;
                  }}
                  dropdownTextStyle={{
                    fontSize: responsiveFontSize(_dims.defaultFontSize)
                  }}
                  options={this.props.options.data.realtyTypes.map(
                    item => item.name
                  )}
                  defaultIndex={parseInt(this.state.realtyType, 10)}
                  onSelect={index =>
                    this.setState({ realtyType: parseInt(index, 10) })
                  }
                >
                  <Text style={[styles.value, { flex: 1 }]}>
                    {
                      this.props.options.data.realtyTypes[this.state.realtyType]
                        .name
                    }
                  </Text>
                </ModalDropdown>
              </View>
            </View>
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={this._clear}>
              <Text style={styles.buttonTex}>{strings.clear}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this._cancel}>
              <Text style={styles.buttonTex}>{strings.cancel}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(state => ({ options: state.options }))(Filter);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff'
  },
  innerWrapper: {
    paddingHorizontal: _dims.defaultPadding,
    paddingTop: _dims.defaultPadding,
    paddingBottom: _dims.defaultPadding * 2
  },
  title: {
    marginBottom: _dims.defaultPadding * 1.5,
    color: _colors.mainColor,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    textAlign: 'left',
    marginRight: _dims.defaultPadding
  },
  radios: {
    paddingVertical: 10,
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  radio: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  radioIcon: {
    marginRight: 7,
    fontSize: responsiveFontSize(_dims.defaultFontInput + 8),
    color: 'gray'
  },
  radioText: {
    fontSize: responsiveFontSize(_dims.defaultFontInput + 4),
    fontWeight: '500',
    color: 'gray'
  },
  sliderWrapper: {
    alignSelf: 'center'
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
  alignEnd: {
    alignContent: 'flex-end'
  },
  dropdownWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  dropdown: {
    alignSelf: 'flex-end',
    width: responsiveWidth(80),
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: 'lightblue'
  },
  dropdownBed: {
    width: responsiveWidth(50) - _dims.defaultPadding * 1.5
  },
  dropdownBath: {
    width: responsiveWidth(50) - _dims.defaultPadding * 1.5
  },
  dropdownDropdown: {
    borderColor: 'cornflowerblue',
    borderWidth: 2,
    borderRadius: 3
  },
  selectWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3bcce1',
    padding: _dims.defaultPadding,
    alignContent: 'flex-end'
  },
  selectText: {
    flex: 1,
    color: '#777',
    fontSize: responsiveFontSize(_dims.defaultFontSubTitle + 1)
  },
  checkboxItem: {
    paddingVertical: 10,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: '#3bcce1',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkboxText: {
    flex: 1,
    color: '#555'
  },
  dropdownRow: {
    flexDirection: 'row',
    height: 40,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderColor: 'silver',
    marginHorizontal: _dims.defaultPadding
  },
  dropdownRowText: {
    flex: 1,
    textAlign: 'left',
    color: '#333'
  },
  submit: {
    padding: 20,
    backgroundColor: _colors.mainColor,
    flexDirection: 'row',
    marginTop: _dims.defaultPadding * 2
  },
  submitText: {
    color: '#fff'
  },
  viewSubmit: {
    flex: 1
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
  wrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15
  },
  part: {
    flex: 1
  },
  label: {
    color: 'gray',
    marginBottom: 5,
    textAlign: 'center'
  },
  value: {
    borderWidth: 1,
    borderColor: '#3bcce1',
    padding: 10,
    textAlign: 'center'
  },
  dropdown_2_dropdown: {
    width: '90%',
    height: 320,
    borderColor: 'rgba(192,192,192,0.4)',
    borderWidth: 1,
    borderRadius: 3
  },
  buttons: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  button: {
    paddingVertical: 10,
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#3bcce1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  buttonTex: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(_dims.defaultFontInput + 2)
  }
});
