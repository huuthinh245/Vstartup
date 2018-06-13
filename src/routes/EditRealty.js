import React from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import _ from 'lodash';
import ModalDropdown from 'react-native-modal-dropdown';
import RNGooglePlaces from 'react-native-google-places';
import RNFetchBlob from 'react-native-fetch-blob';
import * as Progress from 'react-native-progress';

import { EMAIL_REGEX, PHONE_REGEX } from '../utils/validation';
import { allProject } from '../routes/routes';
import { imagePicker, cameraPicker } from '../utils/imagePicker';
import emitter from '../emitter';
import alertStrings from '../localization/alert';
import headerStrings from '../localization/header';
import strings from '../localization/postRealty';
import Header from '../navigators/headers/CommonHeader';
import { _dims, responsiveWidth, _colors, responsiveFontSize, _ios } from '../utils/constants';
import { postRealtyAction } from '../redux/realtyDetail/actions';

const LIMIT_IMAGES_UPLOAD = 10;

const dataSelect = [
  { id: 0, value: '---' },
  { id: 1, value: '1' },
  { id: 2, value: '2' },
  { id: 3, value: '3' },
  { id: 4, value: '4' },
  { id: 5, value: '>= 5' }
];

class PostRealty extends React.Component {
  static navigationOptions = {
    tabBarVisible: false
  };

  constructor(props) {
    super(props);
    // this.state = {
    //   method: this.props.options.data.methods[0],
    //   title: '',
    //   project: {},
    //   type: this.props.options.data.realtyTypes[0],
    //   price: '',
    //   priceUnit: this.props.options.data.priceUnits[0],
    //   width: undefined,
    //   length: undefined,
    //   area: undefined,
    //   direction: this.props.options.data.directions[0],
    //   address: {},
    //   toilet: dataSelect[0],
    //   bedroom: dataSelect[0],
    //   bathroom: dataSelect[0],
    //   description: '',
    //   youtube: '',
    //   images: ['flag'],
    //   utils: [],
    //   contactName: this.props.auth.user.name,
    //   contactEmail: this.props.auth.user.email,
    //   contactPhone: this.props.auth.user.phone
    // };
    this.state = {
      method: this.props.options.data.methods[0],
      title: 'aaa',
      project: { id: 1, title: 'hehe' },
      type: this.props.options.data.realtyTypes[0],
      price: '1',
      priceUnit: this.props.options.data.priceUnits[0],
      width: '2',
      length: '3',
      area: '4',
      direction: this.props.options.data.directions[0],
      address: { address: 'vn', latitude: 1.222, longitude: 223.444 },
      toilet: dataSelect[1],
      bedroom: dataSelect[2],
      bathroom: dataSelect[3],
      description: 'hehehe',
      youtube: 'ah uh',
      images: ['flag'],
      utils: [{ id: 1 }, { id: 2 }],
      contactName: this.props.auth.user.name,
      contactEmail: this.props.auth.user.email,
      contactPhone: this.props.auth.user.phone || '0919954554'
    };
  }

  _renderItemMethods = ({ item }) => {
    const name =
      this.state.method.id === item.id ? 'md-radio-button-on' : 'md-radio-button-off';
    return (
      <TouchableOpacity
        onPress={() => this.setState({ method: item })}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <Ionicons name={name} size={17} color={this.state.method.id === item.id ? _colors.mainColor : 'gray'} />
        <Text style={{ marginLeft: 10, color: this.state.method.id === item.id ? _colors.mainColor : 'gray' }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };


  _renderItemImages = ({ item }) => {
    if (item === 'flag') {
      return (
        <TouchableOpacity
          onPress={this._showActionSheet}
          style={[styles.image, styles.imageCamera]}
        >
          <Ionicons name="ios-camera" size={responsiveFontSize(60)} color="gray" />
        </TouchableOpacity>
      );
    }

    const __removeImage = () => {
      const copy = _.map(this.state.images, _.clone);
      const newData = _.reject(copy, obj => {
        if (_ios) {
          return obj.path === item.path;
        }
        return obj.uri === item.uri;
      });
      this.setState({ images: newData });
    };
    return (
      <TouchableOpacity style={styles.image}>
        <Image
          style={styles.img}
          resizeMode="cover"
          source={{ uri: _ios ? item.path : item.uri }}
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
        <Text style={{ flex: 1, marginLeft: _dims.defaultPadding + 2 }}>{item.name}</Text>
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
        callback: images => {
          this.setState({
            images: this.state.images.concat(
              images.splice(0, LIMIT_IMAGES_UPLOAD + 1 - this.state.images.length)
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
    if (!this.state.title) return { title: 'title empty', callback: () => this.titleDom.focus() };
    if (!this.state.project.id) return { title: 'project owned empty' };
    if (!this.state.price) return { title: 'price empty', callback: () => this.priceDom.focus() };
    if (!this.state.width) return { title: 'width empty', callback: () => this.widthDom.focus() };
    if (!this.state.length) return { title: 'length empty', callback: () => this.lengthDom.focus() };
    if (!this.state.area) return { title: 'area empty', callback: () => this.areaDom.focus() };
    if (!this.state.address.latitude) return { title: 'address empty' };
    if (this.state.images.length <= 1) { return { title: 'image empty' }; }
    if (!this.state.contactName) { return { title: 'contact name empty', callback: () => this.contactNameDom.focus() }; }
    if (!EMAIL_REGEX.test(this.state.contactEmail)) { return { title: 'contact email empty', callback: () => this.contactEmailDom.focus() }; }
    if (!PHONE_REGEX.test(this.state.contactPhone)) { return { title: 'contact phone empty', callback: () => this.contactPhoneDom.focus() }; }
    return null;
  };

  _onSubmit = () => {
    const err = this._generateError();
    if (err) {
      emitter.emit('alert', {
        type: 'warn',
        title: 'Invalid fields',
        error: err.title
      });
      if (err.callback) {
        err.callback();
      }
    } else {
      const form = [];
      const { state } = this;

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
      form.push({ name: 'utils', data: state.utils.map(item => item.id).toString() });
      form.push({ name: 'description', data: state.description });
      form.push({ name: 'youtube', data: state.youtube });
      form.push({ name: 'address', data: state.address.address });
      form.push({ name: 'coordinate', data: JSON.stringify({ lat: `${state.address.latitude}`, lng: `${state.address.longitude}` }) });
      
      
      const path = _ios ? 'path' : 'uri';
      state.images.forEach((item, index) => {
        if(item !== 'flag') {
          form.push({
            name: `photo${index}`, 
            type: 'image/jpeg',
            filename: 'photo.jpg',
            data: RNFetchBlob.wrap(this.state.images[index][path])
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
    const { state, props } = this;

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          title={headerStrings.postRealty}
          onLeftPress={() => props.navigation.goBack()}
        />
        { this.props.realtyDetail.postRealty && <View style={styles.progress}><Progress.Pie indeterminate size={50} /></View> }
        <ScrollView style={{ paddingHorizontal: _dims.defaultPadding }}>
          <FlatList
            style={{ alignSelf: 'center', marginVertical: _dims.defaultPadding / 2, flex: 1 }}
            data={options.methods}
            extraData={state.method}
            keyExtractor={item => `${item.id}`}
            renderItem={this._renderItemMethods}
            horizontal
            bounces={false}
            ItemSeparatorComponent={() => <View style={{ width: _dims.defaultPadding * 3 }} />}
          />

          <View style={styles.name}>
            <Text style={styles.require}>* </Text>
            <TextInput
              ref={ref => {
                this.titleDom = ref;
              }}
              placeholder={strings.name}
              style={[styles.lineLeft, { marginRight: 0 }]}
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
            <Ionicons name="ios-arrow-forward-outline" color="gray" style={styles.icon} />
          </TouchableOpacity>

          <ModalDropdown
            renderRow={this._renderDropdownItem}
            dropdownStyle={[styles.dropdown_2_dropdown]}
            dropdownTextStyle={{ fontSize: responsiveFontSize(_dims.defaultFontSize) }}
            options={options.realtyTypes.map(item => item.name)}
            defaultIndex={options.realtyTypes.findIndex(item => item.id === state.type.id)}
            onSelect={index => this.setState({ type: options.realtyTypes[index - 1] })}
          >
            <View style={styles.line}>
              <Text style={styles.lineLeft}>
                <Text style={styles.require}>* </Text>
                {strings.projectType}
              </Text>
              <Text numberOfLines={1} style={styles.lineRight}>{state.type.name}</Text>
              <Ionicons name="ios-arrow-forward-outline" color="gray" style={styles.icon} />
            </View>
          </ModalDropdown>

          <TouchableOpacity style={styles.line} onPress={() => this.priceDom.focus()}>
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
            <View style={styles.icon} />
          </TouchableOpacity>

          <ModalDropdown
            renderRow={this._renderDropdownItem}
            dropdownStyle={[
              styles.dropdown_2_dropdown,
              { height: options.priceUnits.length * 50 }
            ]}
            dropdownTextStyle={{ fontSize: responsiveFontSize(_dims.defaultFontSize) }}
            options={options.priceUnits.map(item => item.name)}
            defaultIndex={options.priceUnits.findIndex(item => item.id === state.priceUnit.id)}
            onSelect={index => this.setState({ priceUnit: options.priceUnits[index] })}
          >
            <View style={styles.line}>
              <Text style={styles.lineLeft}>
                <Text style={styles.require}>* </Text>
                {strings.priceUnit}
              </Text>
              <Text style={styles.lineRight}>
                {state.priceUnit.name}
              </Text>
              <View style={styles.icon} />
            </View>
          </ModalDropdown>

          <TouchableOpacity style={styles.line} onPress={() => this.widthDom.focus()}>
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

          <TouchableOpacity style={styles.line} onPress={() => this.lengthDom.focus()}>
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
              onChangeText={val => this.setState({ length: this._removeDot(val) })}
              returnKeyType="next"
              autoCapitalize="none"
              keyboardType="numeric"
              autoCorrect={false}
              clearButtonMode="always"
            />
            <Text style={{ color: 'gray' }}>m</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.line} onPress={() => this.areaDom.focus()}>
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
            <Text style={{ color: 'gray' }}>m2</Text>
          </TouchableOpacity>

          <ModalDropdown
            renderRow={this._renderDropdownItem}
            dropdownStyle={[
              styles.dropdown_2_dropdown,
              { height: 250 }
            ]}
            dropdownTextStyle={{ fontSize: responsiveFontSize(_dims.defaultFontSize) }}
            options={options.directions.map(item => item.name)}
            defaultIndex={options.directions.findIndex(item => item.id === state.direction.id)}
            onSelect={index => this.setState({ direction: options.directions[index] })}
          >
            <View style={styles.line}>
              <Text style={styles.lineLeft}>
                <Text style={styles.require}>* </Text>
                {strings.direction}
              </Text>
              <Text style={styles.lineRight}>
                {state.direction.name}
              </Text>
              <View style={styles.icon} />
            </View>
          </ModalDropdown>

          <TouchableOpacity 
            style={styles.line}
            onPress={async () => {
              const address = await RNGooglePlaces.openPlacePickerModal();
              this.setState({ address });
            }}
          >
            <Text style={styles.lineLeft}>
              <Text style={styles.require}>* </Text>
              {strings.address}
            </Text>
            <Text style={styles.lineRight}>{state.address.address || state.address.name}</Text>
            <Ionicons name="ios-arrow-forward-outline" color="gray" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.line} onPress={() => this.youtubeDom.focus()}>
            <Text style={styles.lineLeft}>{strings.youtube}</Text>
            <TextInput
              ref={ref => {
                this.youtubeDom = ref;
              }}
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
            <View style={styles.part}>
              <Text style={styles.label}>{strings.toilet}</Text>
              <ModalDropdown
                renderRow={this._renderDropdownItem}
                dropdownStyle={[styles.dropdown_2_dropdown, styles.part_dropdown]}
                dropdownTextStyle={{ fontSize: responsiveFontSize(_dims.defaultFontSize) }}
                options={dataSelect.map(item => item.value)}
                defaultIndex={dataSelect.findIndex(item => item.id === state.toilet.id)}
                onSelect={index => this.setState({ toilet: dataSelect[index] })}
              >
                <Text style={styles.value}>{state.toilet.value}</Text>
              </ModalDropdown>
            </View>

            <View style={[styles.part, { marginHorizontal: _dims.defaultPadding }]}>
              <Text style={styles.label}>{strings.bathroom}</Text>
              <ModalDropdown
                renderRow={this._renderDropdownItem}
                dropdownStyle={[styles.dropdown_2_dropdown, styles.part_dropdown]}
                dropdownTextStyle={{ fontSize: responsiveFontSize(_dims.defaultFontSize) }}
                options={dataSelect.map(item => item.value)}
                defaultIndex={dataSelect.findIndex(item => item.id === state.bathroom.id)}
                onSelect={index => this.setState({ bathroom: dataSelect[index] })}
              >
                <Text style={styles.value}>{state.bathroom.value}</Text>
              </ModalDropdown>
            </View>
            <View style={styles.part}>
              <Text style={styles.label}>{strings.bedroom}</Text>
              <ModalDropdown
                renderRow={this._renderDropdownItem}
                dropdownStyle={[styles.dropdown_2_dropdown, styles.part_dropdown]}
                dropdownTextStyle={{ fontSize: responsiveFontSize(_dims.defaultFontSize) }}
                options={dataSelect.map(item => item.value)}
                defaultIndex={dataSelect.findIndex(item => item.id === state.bedroom.id)}
                onSelect={index => this.setState({ bedroom: dataSelect[index] })}
              >
                <Text style={styles.value}>{state.bedroom.value}</Text>
              </ModalDropdown>
            </View>
          </View>

          <Text style={styles.illustratorImage}>{strings.image}</Text>
          {state.images.length > 1 ? (
            <View style={styles.images}>
              <FlatList
                data={state.images}
                keyExtractor={() => `${Math.random()}`}
                renderItem={this._renderItemImages}
                numColumns={3}
              />
            </View>
          ) : (
            <TouchableOpacity style={styles.images} onPress={this._showActionSheet}>
              <View style={[styles.image, styles.imageCamera]}>
                <Ionicons name="ios-camera" size={responsiveFontSize(60)} color="gray" />
              </View>
              <Text style={{ textAlign: 'center', alignSelf: 'center' }}>{strings.uploadImage}</Text>
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
  realtyDetail: state.realtyDetail
}))(PostRealty);
