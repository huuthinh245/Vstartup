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
import ActionSheet from 'react-native-actionsheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import _ from 'lodash';

import { EMAIL_REGEX, PHONE_REGEX } from '../utils/validation';
import { listProject } from '../routes/routes';
import { imagePicker, cameraPicker } from '../utils/imagePicker';
import emitter from '../emitter';
import alertStrings from '../localization/alert';
import headerStrings from '../localization/header';
import strings from '../localization/postRealty';
import Header from '../navigators/headers/CommonHeader';
import { _dims, responsiveWidth, _colors, responsiveFontSize, _ios } from '../utils/constants';

const LIMIT_IMAGES_UPLOAD = 10;

class PostRealty extends React.Component {
  static navigationOptions = {
    tabBarVisible: false
  };

  constructor(props) {
    super(props);
    this.state = {
      methodSelected: this.props.options.data.methods[0],
      title: '',
      ownedByProject: {},
      projectType: this.props.options.data.projectTypes[0],
      price: 0,
      priceUnit: this.props.options.data.priceUnits[0],
      area: undefined,
      address: {},
      toilet: '_',
      bedroom: '_',
      bathroom: '_',
      description: '',
      images: [1],
      utils: [],
      contactName: this.props.auth.user.name,
      contactEmail: this.props.auth.user.email,
      contactPhone: this.props.auth.user.phone
    };
  }

  _renderItemMethods = ({ item }) => {
    const name =
      this.state.methodSelected.id === item.id ? 'md-radio-button-on' : 'md-radio-button-off';
    return (
      <TouchableOpacity
        onPress={() => this.setState({ methodSelected: item })}
        style={{ flexDirection: 'row', alignItems: 'center' }}
      >
        <Ionicons name={name} size={17} />
        <Text style={{ marginLeft: 10 }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  _renderItemImages = ({ item }) => {
    const copy = _.map(this.state.images, _.clone);
    if (item === 1) {
      return (
        <TouchableOpacity
          onPress={this._showActionSheet}
          style={[styles.image, styles.imageCamera]}
        >
          <Ionicons name="ios-camera" size={responsiveFontSize(60)} color="gray" />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={styles.image} onPress={() => this.setState({ isImageViewVisible: true })}>
        <Image
          style={styles.img}
          resizeMode="cover"
          source={{ uri: _ios ? item.path : item.uri }}
        />
        <Ionicons
          onPress={() => {
            const newData = _.reject(copy, obj => {
              if (_ios) {
                return obj.path === item.path;
              }
              return obj.uri === item.uri;
            });
            this.setState({ images: newData });
          }}
          name="ios-close-circle"
          style={styles.close}
        />
      </TouchableOpacity>
    );
  };

  _renderItemUtils = ({ item }) => {
    const copy = _.map(this.state.utils, _.clone);
    const name = _.some(this.state.utils, { id: item.id })
      ? 'check-box'
      : 'check-box-outline-blank';
    return (
      <TouchableOpacity
        onPress={() => {
          if (!_.some(copy, { id: item.id })) {
            copy.push(item);
            this.setState({ utils: copy });
          } else {
            const newData = _.reject(copy, obj => obj.id === item.id);
            this.setState({ utils: newData });
          }
        }}
        style={styles.utilsLine}
      >
        <View>
          <MaterialIcons
            size={responsiveFontSize(_dims.defaultFontTitle + 4)}
            color="#3bcce1"
            name={name}
          />
        </View>
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
    console.log(str);
    const arr = str.split('.');
    console.log(arr);
    return arr.join('');
  }

  _generateError = () => {
    if (!this.state.title) return { title: 'title empty', callback: () => this.titleDom.focus() };
    if (!this.state.ownedByProject.id) return { title: 'project owned empty' };
    if (!this.state.price) return { title: 'price empty', callback: () => this.priceDom.focus() };
    if (!this.state.area) return { title: 'price empty', callback: () => this.areaDom.focus() };
    if (!this.state.address.lat) return { title: 'price empty' };
    if (this.state.images.length <= 1) return { title: 'price empty', callback: () => this.priceDom.focus() };
    if (!this.state.contactName) return { title: 'price empty', callback: () => this.nameDom.focus() };
    if (!EMAIL_REGEX.test(!this.state.contactEmail)) return { title: 'price empty', callback: () => this.emailDom.focus() };
    if (!PHONE_REGEX.test(this.state.contactPhone)) return { title: 'price empty', callback: () => this.phoneDom.focus() };
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
      if(err.callback) {
        err.callback();
      }
    } else {
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header
          title={headerStrings.postRealty}
          modal
          onRightPress={() => this.props.navigation.goBack()}
        />
        <ScrollView style={{ paddingHorizontal: _dims.defaultPadding }}>
          <FlatList
            style={{ alignSelf: 'center', marginVertical: _dims.defaultPadding / 2, flex: 1 }}
            data={this.props.options.data.methods}
            extraData={this.state.methodSelected}
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
              value={this.state.title}
              onChangeText={val => this.setState({ title: val })}
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate(listProject, {
                callback: item => this.setState({ ownedByProject: item })
              });
            }}
            style={styles.line}
          >
            <Text style={styles.lineLeft}>
              <Text style={styles.require}>* </Text>
              {strings.ownedByProject}
            </Text>
            <Text numberOfLines={1} style={styles.lineRight}>
              {this.state.ownedByProject.title}
            </Text>
            <Ionicons name="ios-arrow-forward-outline" color="gray" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.line}>
            <Text style={styles.lineLeft}>
              <Text style={styles.require}>* </Text>
              {strings.projectType}
            </Text>
            <Text numberOfLines={1} style={styles.lineRight}>
              {this.state.projectType.name}
            </Text>
            <Ionicons name="ios-arrow-forward-outline" color="gray" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.line} onPress={() => this.priceDom.focus()}>
            <Text style={styles.lineLeft}>
              <Text style={styles.require}>* </Text>
              {strings.price}
            </Text>
            <TextInput
              ref={ref => {
                this.priceDom = ref;
              }}
              style={[styles.lineRight, styles.input]}
              value={this.state.price}
              onChangeText={val => {
                const beauty = this._removeDot(val);
                console.log(beauty);
                this.setState({ price: beauty });
              }}
              returnKeyType="next"
              autoCapitalize="none"
              keyboardType="numeric"
              autoCorrect={false}
              clearButtonMode="always"
            />
            <View style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.line}>
            <Text style={styles.lineLeft}>
              <Text style={styles.require}>* </Text>
              {strings.priceUnit}
            </Text>
            <Text style={styles.lineRight}>{this.state.priceUnit.name}</Text>
            <View style={styles.icon} />
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
              style={[styles.lineRight, styles.input]}
              value={this.state.area}
              onChangeText={val => this.setState({ area: this._removeDot(val) })}
              returnKeyType="next"
              autoCapitalize="none"
              keyboardType="numeric"
              autoCorrect={false}
              clearButtonMode="always"
            />
            <Text style={{ color: 'gray' }}>m2</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.line}>
            <Text style={styles.lineLeft}>
              <Text style={styles.require}>* </Text>
              {strings.address}
            </Text>
            <Text style={styles.lineRight}>{this.state.address.name}</Text>
            <Ionicons name="ios-arrow-forward-outline" color="gray" style={styles.icon} />
          </TouchableOpacity>

          <View style={styles.wrap}>
            <View style={styles.part}>
              <Text style={styles.label}>{strings.toilet}</Text>
              <Text style={styles.value}>{this.state.toilet}</Text>
            </View>
            <View style={[styles.part, { marginHorizontal: 15 }]}>
              <Text style={styles.label}>{strings.bathroom}</Text>
              <Text style={styles.value}>{this.state.bathroom}</Text>
            </View>
            <View style={styles.part}>
              <Text style={styles.label}>{strings.bedroom}</Text>
              <Text style={styles.value}>{this.state.bedroom}</Text>
            </View>
          </View>

          {this.state.images.length > 1 ? (
            <View style={styles.images}>
              <FlatList
                data={this.state.images}
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
              <Text style={{ textAlign: 'center', alignSelf: 'center' }}>Upload image</Text>
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
              value={this.state.description}
              multiline
              placeholder={strings.description}
            />
          </TouchableOpacity>

          <Text style={styles.utilsTitle}>{strings.utils}</Text>
          <FlatList
            data={this.props.options.data.realtyTypes}
            extraData={this.state.utils}
            keyExtractor={item => item.id}
            renderItem={this._renderItemUtils}
          />

          <View style={styles.form}>
            <View style={styles.formLine}>
              <Ionicons name="ios-person" style={styles.formLineIcon} />
              <TextInput
                ref={name => {
                  this.name = name;
                }}
                value={this.state.contactName}
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
                  this.email = email;
                }}
                value={this.state.contactEmail}
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
                  this.phone = phone;
                }}
                value={this.state.contactPhone}
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

export default connect(state => ({ options: state.options, auth: state.auth }))(PostRealty);

const styles = StyleSheet.create({
  name: {
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderColor: 'silver',
    flexDirection: 'row',
    alignItems: 'center'
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
    flex: 6.5,
    paddingRight: 10
  },
  lineLeft: {
    color: 'gray',
    marginRight: 10,
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    alignSelf: 'center',
    width: responsiveFontSize(_dims.defaultFontSize),
    textAlign: 'center',
    height: responsiveFontSize(_dims.defaultFontSize),
    color: 'gray'
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
    flex: 1
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
  }
});
