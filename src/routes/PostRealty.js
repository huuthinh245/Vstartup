import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import _ from 'lodash';
import RNFetchBlob from 'react-native-fetch-blob';
import * as Progress from 'react-native-progress';
import Picker from 'react-native-picker';
import ActionSheet from 'react-native-actionsheet';

import { EMAIL_REGEX, PHONE_REGEX } from '../utils/validation';
import { allProject } from '../routes/routes';
import { imagePicker, cameraPicker } from '../utils/imagePicker';
import emitter from '../emitter';
import alertStrings from '../localization/alert';
import headerStrings from '../localization/header';
import errorStrings from '../localization/error';
import strings from '../localization/postRealty';
import Header from '../navigators/headers/CommonHeader';
import {
  _dims,
  responsiveWidth,
  _colors,
  responsiveFontSize,
  _ios
} from '../utils/constants';
import { postRealtyAction } from '../redux/realtyDetail/actions';

const LIMIT_IMAGES_UPLOAD = 10;

class PostRealty extends React.Component {
  static navigationOptions = {
    tabBarVisible: false
  };

  constructor(props) {
    super(props);
    this.dataSelect = [
      { id: 0, name: '---' },
      { id: 1, name: '1' },
      { id: 2, name: '2' },
      { id: 3, name: '3' },
      { id: 4, name: '4' },
      { id: 5, name: '>= 5' }
    ];

    this.state = {
      overlay: false,
      method: this.props.options.data.methods[0],
      title: '',
      project: {},
      type: this.props.options.data.realtyTypes[0],
      price: undefined,
      priceUnit: this.props.options.data.priceUnits[0],
      width: undefined,
      length: undefined,
      area: undefined,
      direction: this.props.options.data.directions[0],
      address: undefined,
      city: {},
      district: {},
      ward: {},
      toilet: this.dataSelect[0],
      bedroom: this.dataSelect[0],
      bathroom: this.dataSelect[0],
      description: undefined,
      youtube: undefined,
      images: ['flag'],
      utils: [],
      contactName: this.props.auth.user.name,
      contactEmail: this.props.auth.user.email,
      contactPhone: this.props.auth.user.phone
    };
  }

  _renderItemMethods = ({ item }) => {
    const name =
      this.state.method.id === item.id
        ? 'md-radio-button-on'
        : 'md-radio-button-off';
    return (
      <TouchableOpacity
        onPress={() => this.setState({ method: item })}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <Ionicons
          name={name}
          size={17}
          color={this.state.method.id === item.id ? _colors.mainColor : 'gray'}
        />
        <Text
          style={{
            marginLeft: 10,
            color: this.state.method.id === item.id ? _colors.mainColor : 'gray'
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  _showPicker = ({ pickerData, title, value, confirmCallBack }) => {
    this.setState({ overlay: true });
    Picker.init({
      pickerData,
      pickerConfirmBtnText: strings.confirm,
      pickerCancelBtnText: strings.cancel,
      pickerTitleText: title,
      pickerToolBarFontSize: responsiveFontSize(_dims.defaultFontTitle),
      pickerFontSize: responsiveFontSize(_dims.defaultFontSize),
      selectedValue: [value],
      onPickerConfirm: data => {
        confirmCallBack(data);
        this.setState({ overlay: false });
      },
      onPickerCancel: () => {
        this.setState({ overlay: false });
      }
    });
    Picker.show();
  };

  _renderItemImages = ({ item }) => {
    if (item === 'flag') {
      return (
        <TouchableOpacity
          onPress={this._showActionSheet}
          style={[styles.image, styles.imageCamera]}
        >
          <Ionicons
            name="ios-camera"
            size={responsiveFontSize(60)}
            color="gray"
          />
        </TouchableOpacity>
      );
    }

    const __removeImage = () => {
      const copy = _.map(this.state.images, _.clone);
      const newData = _.reject(copy, obj => {
        return obj.path === item.path;
      });
      this.setState({ images: newData });
    };
    return (
      <TouchableOpacity style={styles.image}>
        <Image
          style={styles.img}
          resizeMode="cover"
          source={{ uri: item.path }}
        />
        <Ionicons
          onPress={() => __removeImage()}
          name="ios-close-circle"
          style={styles.close}
        />
      </TouchableOpacity>
    );
  };

  _renderItemUtils = ({ item }) => {
    const name = _.some(this.state.utils, { id: item.id })
      ? 'check-box'
      : 'check-box-outline-blank';
    const __handleCheck = () => {
      const copy = _.map(this.state.utils, _.clone);
      if (!_.some(copy, { id: item.id })) {
        copy.push(item);
        this.setState({ utils: copy });
      } else {
        const newData = _.reject(copy, obj => obj.id === item.id);
        this.setState({ utils: newData });
      }
    };
    return (
      <TouchableOpacity
        onPress={() => __handleCheck()}
        style={styles.utilsLine}
      >
        <MaterialIcons
          size={responsiveFontSize(_dims.defaultFontTitle + 4)}
          color="#3bcce1"
          name={name}
        />
        <Text style={{ flex: 1, marginLeft: _dims.defaultPadding + 2 }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  _showActionSheet = () => {
    if (this.state.images.length >= LIMIT_IMAGES_UPLOAD + 1) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.maxCountImages,
        error: alertStrings.requireRemoveImage
      });
    } else {
      this.actionSheetPostRealty.show();
    }
  };

  _onActionSheetSelected = index => {
    if (index === 1) {
      imagePicker({
        multiple: true,
        callback: images => {
          this.setState({
            images: this.state.images.concat(
              images.splice(
                0,
                LIMIT_IMAGES_UPLOAD + 1 - this.state.images.length
              )
            )
          });
        }
      });
    } else if (index === 0) {
      cameraPicker({
        callback: image => {
          this.setState({
            images: this.state.images.concat(image)
          });
        }
      });
    }
  };

  _removeDot = str => {
    const arr = str.split('.');
    return arr.join('');
  };

  _generateError = () => {
    console.log(this.state.city);
    if (!this.state.title) {
      return {
        title: errorStrings.titleEmpty,
        callback: () => this.titleDom.focus()
      };
    }
    if (!this.state.project.id) {
      return { title: errorStrings.ownedProjectEmpty };
    }
    if (!this.state.price) {
      return {
        title: errorStrings.priceEmpty,
        callback: () => this.priceDom.focus()
      };
    }
    if (!this.state.width) {
      return {
        title: errorStrings.widthEmpty,
        callback: () => this.widthDom.focus()
      };
    }
    if (!this.state.length) {
      return {
        title: errorStrings.heightEmpty,
        callback: () => this.lengthDom.focus()
      };
    }
    if (!this.state.area) {
      return {
        title: errorStrings.areaEmpty,
        callback: () => this.areaDom.focus()
      };
    }
    if (!this.state.city.id) return { title: errorStrings.cityEmpty };
    if (!this.state.district.id) return { title: errorStrings.districtEmpty };
    if (!this.state.ward.id) return { title: errorStrings.wardEmpty };
    if (!this.state.address) return { title: errorStrings.addressEmpty };
    if (this.state.images.length <= 1) {
      return { title: errorStrings.imagesEmpty };
    }
    if (!this.state.contactName) {
      return {
        title: errorStrings.contactNameEmpty,
        callback: () => this.contactNameDom.focus()
      };
    }
    if (!EMAIL_REGEX.test(this.state.contactEmail)) {
      return {
        title: errorStrings.contactEmailEmpty,
        callback: () => this.contactEmailDom.focus()
      };
    }
    if (!PHONE_REGEX.test(this.state.contactPhone)) {
      return {
        title: errorStrings.contactPhoneEmpty,
        callback: () => this.contactPhoneDom.focus()
      };
    }
    return null;
  };

  _onSubmit = () => {
    const { state } = this;
    const err = this._generateError();
    if (err) {
      emitter.emit('alert', {
        type: 'warn',
        title: alertStrings.invalidField,
        error: err.title
      });
      if (err.callback) {
        err.callback();
      }
    } else {
      const form = [];
      const link = state.youtube;
      const splitLink = link ? link.split('?v=') : [];
      form.push({ name: 'contact_email', data: state.contactEmail });
      form.push({ name: 'contact_phone', data: `${state.contactPhone}` });
      form.push({ name: 'contact_name', data: state.contactName });

      form.push({ name: 'method', data: `${state.method.id}` });
      form.push({ name: 'title', data: state.title });
      form.push({ name: 'type', data: `${state.type.id}` });
      form.push({ name: 'price', data: `${state.price}` });
      form.push({ name: 'price_unit', data: `${state.priceUnit.id}` });
      form.push({ name: 'width', data: `${state.width}` });
      form.push({ name: 'length', data: `${state.length}` });
      form.push({ name: 'area', data: `${state.area}` });
      form.push({ name: 'direction', data: `${state.direction.id}` });
      form.push({ name: 'toilet', data: `${state.toilet.id}` });
      form.push({ name: 'bedroom', data: `${state.bedroom.id}` });
      form.push({ name: 'bathroom', data: `${state.bathroom.id}` });
      form.push({
        name: 'utility',
        data: state.utils.map(item => item.id).toString()
      });
      form.push({ name: 'body', data: state.description });
      if (splitLink.length >= 2) {
        form.push({ name: 'video', data: splitLink[1] });
      }
      form.push({ name: 'address', data: state.address });
      form.push({ name: 'city_id', data: `${state.city.id}` });
      form.push({ name: 'district_id', data: `${state.district.id}` });
      form.push({ name: 'ward_id', data: `${state.ward.id}` });
      form.push({
        name: 'coordinate',
        data: JSON.stringify({
          lat: `${state.address.latitude}`,
          lng: `${state.address.longitude}`
        })
      });

      state.images.forEach((item, index) => {
        if (item !== 'flag') {
          form.push({
            name: 'files[]',
            type: item.mime,
            filename: 'abc.jpg',
            data: RNFetchBlob.wrap(this.state.images[index].path)
          });
        }
      });

      postRealtyAction({ data: form, token: this.props.auth.token });
    }
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

  render() {
    const options = this.props.options.data;
    const city = this.props.city.data;
    const { state, props } = this;

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          title={headerStrings.postRealty}
          onLeftPress={() => {
            Picker.hide();
            props.navigation.goBack();
          }}
        />
        {this.state.overlay && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.setState({ overlay: false });
              Picker.hide();
            }}
            style={styles.overlay}
          />
        )}
        {this.props.realtyDetail.postRealty && (
          <View style={styles.progress}>
            <Progress.Pie indeterminate size={50} />
          </View>
        )}
        <ScrollView style={{ paddingHorizontal: _dims.defaultPadding }}>
          <FlatList
            style={{
              alignSelf: 'center',
              marginVertical: _dims.defaultPadding / 2,
              flex: 1
            }}
            data={options.methods}
            extraData={state.method}
            keyExtractor={item => `${item.id}`}
            renderItem={this._renderItemMethods}
            horizontal
            bounces={false}
            ItemSeparatorComponent={() => (
              <View style={{ width: _dims.defaultPadding * 3 }} />
            )}
          />

          <View style={styles.name}>
            <Text style={styles.require}>* </Text>
            <TextInput
              ref={ref => {
                this.titleDom = ref;
              }}
              placeholder={strings.name}
              style={[styles.lineLeft, { marginRight: 0, flex: 1 }]}
              value={state.title}
              onChangeText={val => this.setState({ title: val })}
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate(allProject, {
                callback: item => this.setState({ project: item })
              });
            }}
            style={styles.line}
          >
            <Text style={styles.lineLeft}>
              <Text style={styles.require}>* </Text>
              {strings.ownedByProject}
            </Text>
            <Text numberOfLines={1} style={styles.lineRight}>
              {state.project.title}
            </Text>
            <Ionicons
              name="ios-arrow-forward-outline"
              color="gray"
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this._showPicker({
                pickerData: options.realtyTypes.map(item => item.name),
                title: strings.selectRealtyType,
                value: state.type.name,
                confirmCallBack: data => {
                  const type = options.realtyTypes.find(
                    item => item.name === data[0]
                  );
                  this.setState({ type });
                }
              });
            }}
            style={styles.line}
          >
            <Text style={styles.lineLeft}>
              <Text style={styles.require}>* </Text>
              {strings.projectType}
            </Text>
            <Text numberOfLines={1} style={styles.lineRight}>
              {state.type.name}
            </Text>
            <Ionicons
              name="ios-arrow-forward-outline"
              color="gray"
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.line}
            onPress={() => this.priceDom.focus()}
          >
            <Text style={styles.lineLeft}>
              <Text style={styles.require}>* </Text>
              {strings.price}
            </Text>
            <TextInput
              ref={ref => {
                this.priceDom = ref;
              }}
              placeholder="_"
              style={[styles.lineRight, styles.input]}
              value={state.price}
              onChangeText={val => this.setState({ price: val })}
              returnKeyType="next"
              autoCapitalize="none"
              keyboardType="numeric"
              autoCorrect={false}
              clearButtonMode="always"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.line}
            onPress={() => {
              this._showPicker({
                pickerData: options.priceUnits.map(item => item.name),
                title: strings.selectPriceUnit,
                value: this.state.priceUnit.name,
                confirmCallBack: data => {
                  const priceUnit = options.priceUnits.find(
                    item => item.name === data[0]
                  );
                  this.setState({ priceUnit });
                }
              });
            }}
          >
            <Text style={styles.lineLeft}>
              <Text style={styles.require}>* </Text>
              {strings.priceUnit}
            </Text>
            <Text style={styles.lineRight}>{state.priceUnit.name}</Text>
            <View style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.line}
            onPress={() => this.widthDom.focus()}
          >
            <Text style={styles.lineLeft}>
              <Text style={styles.require}>* </Text>
              {strings.width}
            </Text>
            <TextInput
              ref={ref => {
                this.widthDom = ref;
              }}
              style={[styles.lineRight, styles.input]}
              placeholder="_"
              value={state.width}
              onChangeText={val => this.setState({ width: val })}
              returnKeyType="next"
              autoCapitalize="none"
              keyboardType="numeric"
              autoCorrect={false}
              clearButtonMode="always"
            />
            <Text style={{ color: 'gray' }}>m</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.line}
            onPress={() => this.lengthDom.focus()}
          >
            <Text style={styles.lineLeft}>
              <Text style={styles.require}>* </Text>
              {strings.length}
            </Text>
            <TextInput
              ref={ref => {
                this.lengthDom = ref;
              }}
              style={[styles.lineRight, styles.input]}
              placeholder="_"
              value={state.length}
              onChangeText={val =>
                this.setState({ length: this._removeDot(val) })
              }
              returnKeyType="next"
              autoCapitalize="none"
              keyboardType="numeric"
              autoCorrect={false}
              clearButtonMode="always"
            />
            <Text style={{ color: 'gray' }}>m</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.line}
            onPress={() => this.areaDom.focus()}
          >
            <Text style={styles.lineLeft}>
              <Text style={styles.require}>* </Text>
              {strings.area}
            </Text>
            <TextInput
              ref={ref => {
                this.areaDom = ref;
              }}
              placeholder="_"
              style={[styles.lineRight, styles.input]}
              value={state.area}
              onChangeText={val => this.setState({ area: val })}
              returnKeyType="next"
              autoCapitalize="none"
              keyboardType="numeric"
              autoCorrect={false}
              clearButtonMode="always"
            />
            <Text style={{ color: 'gray' }}>m²</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this._showPicker({
                pickerData: options.directions.map(item => item.name),
                title: strings.selectDirection,
                value: this.state.direction.name,
                confirmCallBack: data => {
                  const direction = options.directions.find(
                    item => item.name === data[0]
                  );
                  this.setState({ direction });
                }
              });
            }}
            style={styles.line}
          >
            <Text style={styles.lineLeft}>
              <Text style={styles.require}>* </Text>
              {strings.direction}
            </Text>
            <Text style={styles.lineRight}>{state.direction.name}</Text>
            <View style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.line}
            onPress={() => {
              this._showPicker({
                pickerData: city.city.map(item => item.name),
                title: strings.selectCity,
                value: this.state.city.name,
                confirmCallBack: data => {
                  let _city = city.city[0];
                  if (data[0] !== '<null>') {
                    _city = city.city.find(item => item.name === data[0]);
                  }
                  this.setState({ city: _city });
                }
              });
            }}
          >
            <Text style={styles.lineLeft}>
              <Text style={styles.require}>* </Text>
              {strings.city}
            </Text>
            <Text style={styles.lineRight}>{state.city.name}</Text>
            <Ionicons
              name="ios-arrow-forward-outline"
              color="gray"
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.line}
            onPress={() => {
              if (!this.state.city.id) return;
              this._showPicker({
                pickerData: city.district
                  .filter(item => item.city_id === this.state.city.id)
                  .map(item => item.name),
                title: strings.selectDistrict,
                value: this.state.district.name,
                confirmCallBack: data => {
                  let _district = city.district[0];
                  if (data[0] !== '<null>') {
                    _district = city.district.find(
                      item => item.name === data[0]
                    );
                  }
                  this.setState({ district: _district });
                }
              });
            }}
          >
            <Text style={styles.lineLeft}>
              <Text style={styles.require}>* </Text>
              {strings.district}
            </Text>
            <Text style={styles.lineRight}>{state.district.name}</Text>
            <Ionicons
              name="ios-arrow-forward-outline"
              color="gray"
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.line}
            onPress={() => {
              if (!this.state.district.id) return;
              this._showPicker({
                pickerData: city.ward
                  .filter(item => item.district_id === this.state.district.id)
                  .map(item => item.name),
                title: strings.selectWard,
                value: this.state.ward.name,
                confirmCallBack: data => {
                  let _ward = city.ward[0];
                  if (data[0] !== '<null>') {
                    _ward = city.ward.find(item => item.name === data[0]);
                  }
                  this.setState({ ward: _ward });
                }
              });
            }}
          >
            <Text style={styles.lineLeft}>
              <Text style={styles.require}>* </Text>
              {strings.ward}
            </Text>
            <Text style={styles.lineRight}>{state.ward.name}</Text>
            <Ionicons
              name="ios-arrow-forward-outline"
              color="gray"
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.line}
            onPress={() => this.addressDom.focus()}
          >
            <Text style={styles.lineLeft}>
              <Text style={styles.require}>* </Text>
              {strings.address}
            </Text>
            <TextInput
              ref={ref => {
                this.addressDom = ref;
              }}
              placeholder="_"
              style={[styles.lineRight, styles.input]}
              value={state.address}
              onChangeText={val => this.setState({ address: val })}
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.line}
            onPress={() => this.youtubeDom.focus()}
          >
            <Text style={styles.lineLeft}>{strings.youtube}</Text>
            <TextInput
              ref={ref => {
                this.youtubeDom = ref;
              }}
              placeholder="_"
              style={[styles.lineRight, styles.input]}
              value={state.youtube}
              onChangeText={val => this.setState({ youtube: val })}
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
            />
          </TouchableOpacity>

          <View style={styles.wrap}>
            <TouchableOpacity
              onPress={() => {
                this._showPicker({
                  pickerData: this.dataSelect.map(item => item.name),
                  title: strings.selectToilet,
                  value: state.toilet.name,
                  confirmCallBack: data => {
                    const toilet = this.dataSelect.find(
                      item => item.name === data[0]
                    );
                    this.setState({ toilet });
                  }
                });
              }}
              style={styles.part}
            >
              <Text style={styles.label}>{strings.toilet}</Text>
              <Text style={styles.value}>{state.toilet.name}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this._showPicker({
                  pickerData: this.dataSelect.map(item => item.name),
                  title: strings.selectBathroom,
                  value: state.bathroom.name,
                  confirmCallBack: data => {
                    const bathroom = this.dataSelect.find(
                      item => item.name === data[0]
                    );
                    this.setState({ bathroom });
                  }
                });
              }}
              style={[styles.part, { marginHorizontal: _dims.defaultPadding }]}
            >
              <Text style={styles.label}>{strings.bathroom}</Text>
              <Text style={styles.value}>{state.bathroom.name}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this._showPicker({
                  pickerData: this.dataSelect.map(item => item.name),
                  title: strings.selectBedroom,
                  value: state.bedroom.name,
                  confirmCallBack: data => {
                    const bedroom = this.dataSelect.find(
                      item => item.name === data[0]
                    );
                    this.setState({ bedroom });
                  }
                });
              }}
              style={[styles.part, { marginHorizontal: _dims.defaultPadding }]}
            >
              <Text style={styles.label}>{strings.bedroom}</Text>
              <Text style={styles.value}>{state.bedroom.name}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.illustratorImage}>{strings.image}</Text>
          {state.images.length > 1 ? (
            <View style={styles.images}>
              <FlatList
                data={state.images}
                keyExtractor={item => item.path}
                renderItem={this._renderItemImages}
                numColumns={3}
              />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.images}
              onPress={this._showActionSheet}
            >
              <View style={[styles.image, styles.imageCamera]}>
                <Ionicons
                  name="ios-camera"
                  size={responsiveFontSize(60)}
                  color="gray"
                />
              </View>
              <Text style={{ textAlign: 'center', alignSelf: 'center' }}>
                {strings.uploadImage}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.description.focus()}
            style={styles.description}
          >
            <TextInput
              ref={ref => {
                this.description = ref;
              }}
              onChangeText={description => this.setState({ description })}
              value={state.description}
              multiline
              placeholder={strings.description}
            />
          </TouchableOpacity>

          <Text style={styles.utilsTitle}>{strings.utils}</Text>
          <FlatList
            data={options.utils}
            extraData={state.utils}
            keyExtractor={item => `${item.id}`}
            renderItem={this._renderItemUtils}
          />

          <View style={styles.form}>
            <View style={styles.formLine}>
              <Ionicons name="ios-person" style={styles.formLineIcon} />
              <TextInput
                ref={name => {
                  this.contactNameDom = name;
                }}
                value={state.contactName}
                style={styles.formLineInput}
                placeholder={strings.contactName}
                onChangeText={name => this.setState({ contactName: name })}
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
              />
            </View>
            <View style={styles.formLine}>
              <Ionicons name="ios-mail" style={styles.formLineIcon} />
              <TextInput
                ref={email => {
                  this.contactEmailDom = email;
                }}
                value={state.contactEmail}
                style={styles.formLineInput}
                placeholder={strings.contactEmail}
                onChangeText={email => this.setState({ contactEmail: email })}
                returnKeyType="next"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
              />
            </View>
            <View style={styles.formLine}>
              <Ionicons name="ios-call" style={styles.formLineIcon} />
              <TextInput
                ref={phone => {
                  this.contactPhoneDom = phone;
                }}
                value={state.contactPhone}
                style={styles.formLineInput}
                placeholder={strings.contactPhone}
                onChangeText={phone => this.setState({ contactPhone: phone })}
                returnKeyType="go"
                autoCapitalize="none"
                keyboardType="phone-pad"
                autoCorrect={false}
                clearButtonMode="always"
              />
            </View>
          </View>
          <TouchableOpacity style={styles.submit} onPress={this._onSubmit}>
            <Text style={styles.submitText}>{strings.submit}</Text>
          </TouchableOpacity>
        </ScrollView>
        <ActionSheet
          ref={o => {
            this.actionSheetPostRealty = o;
          }}
          options={[strings.actionCamera, strings.actionPhoto, strings.cancel]}
          cancelButtonIndex={2}
          onPress={this._onActionSheetSelected}
        />
      </View>
    );
  }
}

export default connect(state => ({
  options: state.options,
  auth: state.auth,
  realtyDetail: state.realtyDetail,
  city: state.city
}))(PostRealty);

export const styles = StyleSheet.create({
  name: {
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: 'silver',
    flexDirection: 'row',
    alignItems: 'center'
  },
  overlay: {
    width: _dims.screenWidth,
    height: _dims.screenHeight,
    backgroundColor: 'transparent',
    zIndex: 100,
    position: 'absolute',
    top: 0,
    left: 0
  },
  line: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: 'silver',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  require: {
    color: 'red',
    fontSize: responsiveFontSize(_dims.defaultFontTitle)
  },
  lineRight: {
    flex: 1,
    textAlign: 'right',
    paddingRight: 10
  },
  lineLeft: {
    color: 'gray',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    alignSelf: 'center',
    width: responsiveFontSize(_dims.defaultFontSize),
    height: responsiveFontSize(_dims.defaultFontSize)
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
  description: {
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'silver',
    height: responsiveWidth(50),
    marginVertical: _dims.defaultPadding * 2
  },
  images: {
    borderRadius: 13,
    borderWidth: 0.5,
    borderColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#777',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    padding: _dims.defaultPadding,
    backgroundColor: 'rgba(192,192,192,0.1)',
    flexDirection: 'row'
  },
  imageCamera: {
    width: (_dims.screenWidth - _dims.defaultPadding * 10 - 1) / 3,
    height: (_dims.screenWidth - _dims.defaultPadding * 10 - 1) / 3,
    margin: 10,
    padding: 0,
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  image: {
    width: (_dims.screenWidth - _dims.defaultPadding * 4 - 1) / 3,
    height: (_dims.screenWidth - _dims.defaultPadding * 4 - 1) / 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: _dims.defaultPadding
  },
  utilsTitle: {
    fontSize: responsiveFontSize(_dims.defaultFontTitle),
    color: _colors.mainColor,
    marginBottom: 5
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 5
  },
  close: {
    color: 'tomato',
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: _dims.defaultPadding * 2
  },
  input: {
    padding: 0,
    fontSize: responsiveFontSize(_dims.defaultFontSize),
    paddingHorizontal: 6
  },
  utilsLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  form: {
    marginHorizontal: _dims.defaultPadding,
    marginVertical: _dims.defaultPadding
  },
  formLine: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: _colors.mainColor,
    marginBottom: _dims.defaultPadding
  },
  formLineIcon: {
    color: _colors.mainColor,
    fontSize: responsiveFontSize(_dims.defaultFontTitle + 6)
  },
  formLineInput: {
    backgroundColor: 'transparent',
    flex: 1,
    color: 'black'
  },
  submit: {
    backgroundColor: '#3bcce1',
    borderRadius: 5,
    marginBottom: 20,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  illustratorImage: {
    marginTop: _dims.defaultPadding * 2,
    marginBottom: _dims.defaultPadding,
    color: '#444'
  },
  progress: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    zIndex: Number.MAX_SAFE_INTEGER,
    width: _dims.screenWidth,
    height: _dims.screenHeight,
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
});
