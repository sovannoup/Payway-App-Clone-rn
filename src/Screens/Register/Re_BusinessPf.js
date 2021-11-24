/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  StatusBar,
  Image,
  ScrollView,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import NavigationService from '../../Service/navigationService';
import {NAV_TYPES} from '../../Navigation/navTypes';
import InputGB from '../components/smallComponent/InputGB';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const widthImage = 132.28346457;
const heigthImage = 170.07874016;

export default class SetupPin extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      imageProfile: false,
      usernamePay: '',
      type: '',
      city: '',
      address: '',
      profileName: '',
    };
  }

  componentDidMount() {
    this.BackHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
  }

  componentWillUnmount() {
    this.BackHandler.remove();
  }

  UNSAFE_componentWillReceiveProps(nextProp) {
    const {user} = this.props;

    if (
      nextProp.user.result_re_business &&
      nextProp.user.result_re_business !== user.result_re_business
    ) {
      if (nextProp.user.result_re_business.data.message === 'upload success') {
        AsyncStorage.setItem('companyName', this.state.profileName);
        this.props.f_checkPin();
      }
    }

    if (
      nextProp.user.result_pin &&
      nextProp.user.result_pin !== user.result_pin
    ) {
      if (nextProp.user.result_pin.data.message === 'not set pin') {
        NavigationService.navigate(NAV_TYPES.RE_SETUP_PIN);
      } else {
        NavigationService.navigate(NAV_TYPES.CORE);
      }
    }
  }

  async registerBusiness() {
    const {
      usernamePay,
      type,
      city,
      address,
      profileName,
      imageProfile,
    } = this.state;
    this.setState({
      usernamePay: await AsyncStorage.getItem('amatakpay'),
    });
    var data = {
      usernamePay: usernamePay,
      type: type,
      city: city,
      address: address,
      profileName: profileName,
      logo: imageProfile,
    };
    console.log('This is Profileeeeeeeeeeeeeeee **************', imageProfile);
    this.props.f_re_business(data);
  }

  select(type) {
    ImagePicker.openPicker({
      forceJpg: true,
      width: widthImage,
      height: heigthImage,
      includeBase64: true,
      mediaType: 'photo',
      compressImageQuality: 1,
    })
      .then(image => {
        if (image) {
          ImagePicker.openCropper({
            width: widthImage,
            height: heigthImage,
            path: image.path,
            includeBase64: true,
            mediaType: 'photo',
            forceJpg: true,
            compressImageQuality: 1,
          })
            .then(croop => {
              this.setState({
                imageProfile: croop,
                modalVisible: false,
              });
            })
            .catch(e => {
              if (e.code === 'E_PICKER_CANCELLED') {
                alert('User Error cancel');
              } else {
                alert('no image');
              }
            });
        }
      })
      .catch(e => {
        if (e.code === 'E_PICKER_CANCELLED') {
          // alert('User Error cancel')
          return false;
        }
        // console.log('error image profile',e)
      });
  }

  render() {
    const {profileName, usernamePay, type, city, address} = this.state;
    return (
      <ScrollView>
        <StatusBar
          // animated={true}
          backgroundColor="#2477B2"
          // barStyle={'default'}
          // showHideTransition={'slide'}
          // hidden={false}
        />
        <View style={styles.regisCon}>
          <Text style={styles.regisText}>REGISTER BUSINESS PROFILE</Text>
        </View>
        <ScrollView style={styles.sharePanel}>
          <View>
            <Fontisto name="shopping-store" style={styles.Logo} />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: '700',
              }}>
              Set Up Your First Outlet
            </Text>
          </View>
          <View style={styles.shareBoxDesc}>
            <View style={{width: '70%'}}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                  marginBottom: 10,
                }}>
                Business Logo
              </Text>
              <Text style={styles.descTxt}>
                Add company logo to help your clients recognize your business
                better.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.uploadPhoto}
              onPress={() => {
                this.select('Profile');
              }}>
              {!this.state.imageProfile ? (
                <Text
                  style={{
                    fontSize: 10,
                    color: '#a8a8a8',
                    textAlign: 'center',
                    marginTop: '15%',
                  }}>
                  Upload Business Logo
                </Text>
              ) : (
                <Image
                  source={
                    this.state.imageProfile
                      ? {
                          uri: `data:image/png;base64,${
                            this.state.imageProfile['data']
                          }`,
                        }
                      : ICON.adduser
                  }
                  style={{
                    width: 66,
                    height: 66,
                    borderRadius: 66 / 2,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
          <InputGB
            holder="Business Name"
            type="MaterialIcons"
            className="add-business"
            iconstyle={{fontSize: 30}}
            onChangeText={value => {
              var num = /^[0-9]+$/;
              if (value.length < 25) {
                this.setState({
                  profileName: value,
                });
              }
            }}
            value={profileName}
          />
          <Text
            style={{
              fontSize: 13,
              color: '#a8a8a8',
              width: '90%',
              marginHorizontal: '5%',
            }}>
            Must contain only letters, number, dot, space, or underscores
          </Text>
          <InputGB
            holder="Type of Business"
            type="Ionicons"
            className="ios-newspaper"
            onChangeText={value => {
              if (isNaN(value)) {
                alert('Number only');
              } else {
                this.setState({type: value});
              }
            }}
            value={type}
          />
          <InputGB
            holder="City / Province"
            type="Entypo"
            className="location"
            onChangeText={value => this.setState({city: value})}
            value={city}
          />
          <InputGB
            holder="Address"
            type="Ionicons"
            className="ios-location-sharp"
            onChangeText={value => this.setState({address: value})}
            value={address}
          />
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.conBtn}
            onPress={() => this.registerBusiness()}>
            <Text style={styles.conBtnTxt}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  regisCon: {
    backgroundColor: '#2477B2',
    flexDirection: 'row',
    padding: '3%',
    paddingBottom: '4%',
    alignItems: 'center',
  },
  regisArrow: {
    color: 'white',
    fontSize: 23,
  },
  regisText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: '6%',
  },

  //share panel

  sharePanel: {
    width: '90%',
    marginHorizontal: '5%',
    paddingBottom: '20%',
  },
  shareHeadTxt: {
    fontSize: 17,
    fontWeight: '700',
    paddingVertical: 10,
  },
  shareBoxDesc: {
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#FAFAFA',
    borderColor: '#ececec',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
  },
  descTxt: {
    fontSize: 13,
    color: '#a8a8a8',
    width: '70%',
  },
  Logo: {
    textAlign: 'center',
    fontSize: 50,
    marginTop: 50,
    marginBottom: 15,
    color: '#2477B2',
  },
  descIcon: {
    textAlign: 'center',
    fontSize: 55,
    color: '#2477B2',
  },
  userInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#2477B2',
    marginTop: 35,
    marginBottom: 65,
  },
  uploadPhoto: {
    marginTop: '3%',
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    borderWidth: 2,
    borderColor: '#2477B2',
  },

  //footer
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 0.2,
    borderTopColor: '#cccccc',
  },
  conBtn: {
    width: '90%',
    marginHorizontal: '5%',
    backgroundColor: '#2477B2',
    paddingVertical: 10,
    marginVertical: 15,
    borderRadius: 5,
  },
  conBtnTxt: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
});
