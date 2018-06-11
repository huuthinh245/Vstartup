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
import { Dropdown } from 'react-native-material-dropdown';

import { _dims, _colors, responsiveFontSize, responsiveWidth } from '../utils/constants';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import strings from '../localization/filter';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    const { options } = this.props.navigation.state.params;
    console.log(options);
    this.state = {
      scrollEnabled: true,
      utils: options.utils || [],
      priceRange: options.price || [0, 20],
      areaRange: options.area || [0, 1000],
      beds: options.bedroom || { id: 0, value: strings.pleaseSelect },
      baths: options.bathroom || { id: 0, value: strings.pleaseSelect },
      realtyType: options.type || { id: 0, value: strings.pleaseSelect }
    };
  }

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

  _onSave = () => {
    const opts = this.state;
    const result = {};
    Object.assign(result, { price: opts.priceRange });
    Object.assign(result, { area: opts.areaRange });
    if (opts.beds.id !== 0) {
      Object.assign(result, { bedroom: opts.beds });
    }
    if (opts.baths.id !== 0) {
      Object.assign(result, { bathroom: opts.baths });
    }
    if (opts.utils.length > 0) {
      Object.assign(result, { utils: opts.utils });
    }
    if (opts.realtyType.id !== 0) {
      Object.assign(result, { type: opts.realtyType });
    }
    this.props.navigation.state.params.onDone(result);
    this.props.navigation.goBack();
  };

  render() {
    const dataRealtyType = [{ id: 0, value: strings.pleaseSelect }].concat(
      this.props.options.data.realtyTypes.map(item => ({
        id: item.id,
        value: item.name
      }))
    );

    const dataBed = [
      { id: 0, value: strings.pleaseSelect },
      { id: 1, value: '1' },
      { id: 2, value: '2' },
      { id: 3, value: '3' },
      { id: 4, value: '4' },
      { id: 5, value: strings.moreThanFive }
    ];

    const dataBath = [
      { id: 0, value: strings.pleaseSelect },
      { id: 1, value: '1' },
      { id: 2, value: '2' },
      { id: 3, value: '3' },
      { id: 4, value: '4' },
      { id: 5, value: strings.moreThanFive }
    ];

    return (
      <View style={styles.wrapper}>
        <Header
          onLeftPress={() => this.props.navigation.goBack()}
          title={headerStrings.filterScreen}
          right={
            <TouchableOpacity onPress={this._onSave}>
              <Text style={{ color: _colors.mainColor }}>{headerStrings.save}</Text>
            </TouchableOpacity>
          }
        />
        <ScrollView scrollEnabled={this.state.scrollEnabled}>
          <View style={styles.innerWrapper}>
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

            <View style={[styles.sliderWrapper, { marginTop: _dims.defaultPadding }]}>
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

            <View style={{ flexDirection: 'row' }}>
              <Dropdown
                label={strings.bedroom}
                containerStyle={{
                  flex: 1,
                  marginRight: _dims.defaultPadding,
                  marginVertical: _dims.defaultPadding
                }}
                dropdownOffset={{ top: _dims.defaultPadding, left: 0 }}
                fontSize={responsiveFontSize(_dims.defaultFontInput)}
                labelFontSize={responsiveFontSize(_dims.defaultFontSubTitle)}
                baseColor={_colors.mainColor}
                value={this.state.beds.value}
                data={dataBed}
                itemCount={dataBed.length}
                onChangeText={(value, index) => this.setState({ beds: dataBed[index] })}
              />
              <Dropdown
                label={strings.bathroom}
                containerStyle={{
                  flex: 1,
                  marginLeft: _dims.defaultPadding,
                  marginVertical: _dims.defaultPadding
                }}
                itemCount={dataBath.length}
                dropdownOffset={{ top: _dims.defaultPadding, left: 0 }}
                fontSize={responsiveFontSize(_dims.defaultFontInput)}
                labelFontSize={responsiveFontSize(_dims.defaultFontSubTitle)}
                baseColor={_colors.mainColor}
                value={this.state.baths.value}
                data={dataBath}
                onChangeText={(value, index) => this.setState({ baths: dataBath[index] })}
              />
            </View>
            <Text
              style={[
                styles.title,
                { marginBottom: _dims.defaultPadding, marginTop: _dims.defaultPadding }
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
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  fontSize: responsiveFontSize(_dims.defaultFontSubTitle),
                  color: _colors.mainColor,
                  marginRight: _dims.defaultPadding,
                  marginTop: 32
                }}
              >
                {strings.projectType}
              </Text>
              <Dropdown
                containerStyle={{
                  flex: 1
                }}
                dropdownPosition={dataRealtyType.length}
                itemCount={dataRealtyType.length}
                fontSize={responsiveFontSize(_dims.defaultFontInput)}
                labelFontSize={responsiveFontSize(_dims.defaultFontSubTitle)}
                baseColor={_colors.mainColor}
                value={this.state.realtyType.value}
                data={dataRealtyType}
                onChangeText={(value, index) =>
                  this.setState({ realtyType: dataRealtyType[index] })
                }
              />
            </View>
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
  }
});
