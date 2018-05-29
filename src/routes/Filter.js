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
import ModalDropdown from 'react-native-modal-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';

import { _dims, _colors, responsiveFontSize, responsiveWidth } from '../utils/constants';
import Header from '../navigators/headers/CommonHeader';
import headerStrings from '../localization/header';
import strings from '../localization/filter';
import { _alert } from '../utils/alert';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true,
      utils: [],
      priceRange: [2, 8],
      areaRange: [2, 8],
      beds: 1,
      baths: 1,
      projType: _.values(this.props.options.data.realtyTypes)[0]
    };
  }

  _renderDropdownRow = option => {
    return (
      <View style={styles.dropdownRow}>
        <Text numberOfLines={1} style={styles.dropdownRowText}>
          {option}
        </Text>
      </View>
    );
  };

  _drpFrameBed = style => {
    style.bottom -= 20;
    style.left = _dims.defaultPadding + 10;
    return style;
  };

  _drpFrameBath = style => {
    style.bottom -= 20;
    style.right = _dims.defaultPadding + 10;
    return style;
  };

  _drpFrameProj = style => {
    style.bottom -= 20;
    style.right = _dims.defaultPadding + 10;
    styles.height = 400;
    return style;
  };

  _onDropdownBedSelect = (index, value) => {
    this.setState({ beds: value });
  };

  _onDropdownBathSelect = (index, value) => {
    this.setState({ baths: value });
  };

  _onDropdownProjSelect = (index, value) => {
    this.setState({ projType: { id: index, name: value } });
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

  render() {
    return (
      <View style={styles.wrapper}>
        <Header
          onLeftPress={() => this.props.navigation.goBack()}
          title={headerStrings.filterScreen}
          right={
            <TouchableOpacity onPress={() => _alert('ok', 'ok ok')}>
              <Text style={{ color: _colors.mainColor }}>{headerStrings.save}</Text>
            </TouchableOpacity>
          }
        />
        <ScrollView scrollEnabled={this.state.scrollEnabled}>
          <View style={styles.innerWrapper}>
            <Text style={styles.title}>{strings.price}</Text>
            <View style={styles.sliderWrapper}>
              <MultiSlider
                sliderLength={_dims.screenWidth - _dims.defaultPadding * 2}
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
                max={10}
                allowOverlap
                snapped
              />
              <View style={styles.sliderValueWrapper}>
                <Text style={styles.sliderValue}>{this.state.priceRange[0]}</Text>
                <Text style={[styles.sliderValue, styles.alignEnd]}>
                  {this.state.priceRange[1]}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <MaterialIcons
                name="check-box"
              />
              <Text style={styles.title}>{strings.area}</Text>
              
            </View>
            <View style={styles.sliderWrapper}>
              <MultiSlider
                sliderLength={_dims.screenWidth - _dims.defaultPadding * 2}
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
                max={10}
                allowOverlap
                snapped
              />
              <View style={styles.sliderValueWrapper}>
                <Text style={styles.sliderValue}>{this.state.areaRange[0]}</Text>
                <Text style={[styles.sliderValue, styles.alignEnd]}>{this.state.areaRange[1]}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.dropdownWrapper, { marginRight: _dims.defaultPadding / 2 }]}>
                <Text style={[styles.title, { marginBottom: _dims.defaultPadding }]}>
                  {strings.bedroom}
                </Text>

                <TouchableOpacity
                  onPress={() => this._dropdownBed.show()}
                  style={styles.selectWrapper}
                >
                  <Text style={styles.selectText}>{this.state.beds}</Text>
                  <ModalDropdown
                    ref={el => {
                      this._dropdownBed = el;
                    }}
                    options={['1', '2', '3', '>= 4']}
                    dropdownStyle={[styles.dropdown, styles.dropdownBed]}
                    renderRow={this._renderDropdownRow}
                    renderSeparator={() => null}
                    onSelect={this._onDropdownBedSelect}
                    dropdownTextHighlightStyle={styles.highlight}
                    adjustFrame={style => this._drpFrameBed(style)}
                  >
                    <Ionicons
                      name="ios-arrow-down"
                      size={responsiveFontSize(_dims.defaultFontTitle + 2)}
                      color={_colors.mainColor}
                    />
                  </ModalDropdown>
                </TouchableOpacity>
              </View>

              <View style={[styles.dropdownWrapper, { marginLeft: _dims.defaultPadding / 2 }]}>
                <Text style={[styles.title, { marginBottom: _dims.defaultPadding }]}>
                  {strings.bathroom}
                </Text>

                <TouchableOpacity
                  onPress={() => this._dropdownBath.show()}
                  style={styles.selectWrapper}
                >
                  <Text style={styles.selectText}>{this.state.baths}</Text>
                  <ModalDropdown
                    ref={el => {
                      this._dropdownBath = el;
                    }}
                    options={['1', '2', ' >= 3']}
                    dropdownStyle={[styles.dropdown, styles.dropdownBath]}
                    renderRow={this._renderDropdownRow}
                    renderSeparator={() => null}
                    onSelect={this._onDropdownBathSelect}
                    dropdownTextHighlightStyle={styles.highlight}
                    adjustFrame={style => this._drpFrameBath(style)}
                  >
                    <Ionicons
                      name="ios-arrow-down"
                      size={responsiveFontSize(_dims.defaultFontTitle + 2)}
                      color={_colors.mainColor}
                    />
                  </ModalDropdown>
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={[
                styles.title,
                { marginBottom: _dims.defaultPadding, marginTop: _dims.defaultPadding * 3 }
              ]}
            >
              {strings.utils}
            </Text>
            <FlatList
              renderItem={this._renderItem}
              data={_.values(this.props.options.data.utils)}
              keyExtractor={() => `${Math.random()}`}
            />

            <View
              style={[
                styles.dropdownWrapper,
                { flexDirection: 'row', marginTop: _dims.defaultPadding * 2 }
              ]}
            >
              <Text style={styles.title}>{strings.projectType}</Text>

              <TouchableOpacity
                onPress={() => this._dropdownProj.show()}
                style={styles.selectWrapper}
              >
                <Text style={styles.selectText}>{this.state.projType.name}</Text>
                <ModalDropdown
                  ref={el => {
                    this._dropdownProj = el;
                  }}
                  options={_.values(this.props.options.data.realtyTypes.map(item => item.name))}
                  dropdownStyle={styles.dropdown}
                  renderRow={this._renderDropdownRow}
                  renderSeparator={() => null}
                  onSelect={this._onDropdownProjSelect}
                  dropdownTextHighlightStyle={styles.highlight}
                  adjustFrame={style => this._drpFrameProj(style)}
                >
                  <Ionicons
                    name="ios-arrow-down"
                    size={responsiveFontSize(_dims.defaultFontTitle + 2)}
                    color={_colors.mainColor}
                  />
                </ModalDropdown>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.submit}>
            <TouchableOpacity style={styles.viewSubmit}>
              <Text numberOfLines={1} style={styles.submitText}>
                {strings.show}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.defaultSubmit}>
              <Text numberOfLines={1} style={styles.submitText}>
                {strings.default}
              </Text>
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
    paddingHorizontal: _dims.defaultPadding
  },
  title: {
    marginVertical: _dims.defaultPadding * 2,
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
    justifyContent: 'space-between'
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
