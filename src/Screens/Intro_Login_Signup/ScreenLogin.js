import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Image,
  Button,
} from 'react-native';
import NavigationService from '../../Service/navigationService';
import {NAV_TYPES} from '../../Navigation/navTypes';
import {State} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SwipeablePanel} from 'rn-swipeable-panel';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Fontawesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import InputGB from '../components/smallComponent/InputGB';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableRipple} from 'react-native-paper';

export default class Login extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      hasAcc: false,
      noAcc: false,
      loginActive: false,
      registerActive: false,
      languageActive: false,
      languagePanelHeight: '25%',
      registerPanelHeight: '40%',
      loginPassword: '',
      loginUsername: '',
    };
  }

  closePanel = () => {
    this.setState({
      registerActive: false,
      noAcc: false,
      languageActive: false,
    });
  };
  startLogin() {
    this.props.f_login({
      username: this.state.loginUsername,
      password: this.state.loginPassword,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProp) {
    const {user} = this.props;

    if (
      nextProp.user.result_login &&
      nextProp.user.result_login !== user.result_login
    ) {
      if (nextProp.user.result_login.message === 'success') {
        NavigationService.reset(NAV_TYPES.CORE);
      }
    }

    if (
      nextProp.user.errorLoginMessage &&
      nextProp.user.errorLoginMessage !== user.errorLoginMessage
    ) {
      if (nextProp.user.errorLoginMessage.message === 'user_not_match') {
        alert('User is not match');
      }
    }
  }
  render() {
    const {
      hasAcc,
      noAcc,
      registerActive,
      registerPanelHeight,
      languageActive,
      languagePanelHeight,
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.background}
          resizeMode="cover"
          source={require('../../Assets/Images/firstbg.png')}
        />
        <View style={styles.setting}>
          <TouchableOpacity
            style={styles.contact}
            onPress={() => NavigationService.navigate(NAV_TYPES.CONTACT)}>
            <Fontawesome name="phone" style={styles.settingBtn} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.language}
            onPress={() =>
              this.setState({
                languageActive: true,
              })
            }>
            <Fontisto name="world-o" style={styles.settingBtn} />
          </TouchableOpacity>
        </View>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../../Assets/Images/logoAmatak.png')}
        />
        <View style={styles.loginBtnPanel}>
          <TouchableRipple
            style={styles.signIn}
            onPress={() => this.setState({noAcc: true})}>
            <Text style={styles.loginBtnTxt}>SIGN IN</Text>
          </TouchableRipple>
          <TouchableRipple
            style={styles.newUser}
            //onPress={() => this.setState({ registerActive: true })}
            onPress={() =>
              NavigationService.navigate(NAV_TYPES.RE_CODE, {page: 'term'})
            }>
            <Text style={styles.newUserBtnTxt}>NEW USER</Text>
          </TouchableRipple>
        </View>

        <SwipeablePanel
          closeOnTouchOutside={true}
          isActive={noAcc}
          onClose={() => this.closePanel()}
          openLarge={true}
          fullWidth={true}
          style={{height: 400, backgroundColor: '#f2f2f2'}}>
          <View style={styles.accPanel}>
            <Text style={styles.accSignInTxt}>Sign In</Text>
            <View>
              <InputGB
                holder="Username"
                type="Ionicons"
                className="md-people-circle-outline"
                iconstyle={{fontSize: 30}}
                onChangeText={value => {
                  this.setState({
                    loginUsername: value,
                  });
                }}
                value={this.state.loginUsername}
              />
              <InputGB
                holder="Password"
                secureText={true}
                type="Fontisto"
                className="locked"
                onChangeText={value => {
                  this.setState({
                    loginPassword: value,
                  });
                }}
                value={this.state.loginPassword}
              />
              <TouchableOpacity
                style={styles.shorHint}
                // onPress={() => NavigationService.navigate(NAV_TYPES.FORGET_PW)}
              >
                <Text style={styles.showHintTxt}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => this.startLogin()}>
              <Text style={styles.loginBtnTxt}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </SwipeablePanel>

        <SwipeablePanel
          closeOnTouchOutside={true}
          isActive={registerActive}
          onClose={() => this.closePanel()}
          onlyLarge={true}
          fullWidth={true}
          style={{height: registerPanelHeight}}>
          <View style={styles.accPanel}>
            <Text style={styles.registerHeaderTxt}>New User</Text>
            <TouchableOpacity
              style={styles.register}
              onPress={() =>
                NavigationService.navigate(NAV_TYPES.RE_CODE, {
                  page: 'term',
                })
              }>
              <Text style={styles.registerBtnTxt}>
                Register with ABA Account
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.register}
              onPress={() =>
                NavigationService.navigate(NAV_TYPES.RE_CODE, {
                  page: 'code',
                })
              }>
              <Text style={styles.registerBtnTxt}>
                Register with Invite Code
              </Text>
            </TouchableOpacity>
            <Text style={styles.noAccTxt}>
              ---------- Don't have ABA account? ----------
            </Text>
            <Text style={styles.instantBank}>Open New ABA Instant Account</Text>
          </View>
        </SwipeablePanel>
        <SwipeablePanel
          closeOnTouchOutside={true}
          isActive={languageActive}
          onClose={() => this.closePanel()}
          onlyLarge={true}
          fullWidth={true}
          style={{height: languagePanelHeight}}>
          <View style={styles.languagePanel}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                paddingVertical: 10,
              }}>
              Choose Language
            </Text>
            <View style={styles.eachLang}>
              <Text style={styles.lanWord}>English</Text>
              <BouncyCheckbox
                style={styles.bCheckBox}
                size={20}
                isChecked={true}
                fillColor="#2477B2"
                unfillColor="#FFFFFF"
                // text="I have read and accept the"
                iconStyle={{
                  borderColor: '#cccccc',
                }}
                // textStyle={{fontFamily: 'JosefinSans-Regular', fontSize: 16}}
              />
            </View>
            <View style={styles.eachLang}>
              <Text style={styles.lanWord}>ភាសាខ្មែរ</Text>
              <BouncyCheckbox
                style={styles.bCheckBox}
                size={20}
                fillColor="#2477B2"
                unfillColor="#FFFFFF"
                // text="I have read and accept the"
                iconStyle={{
                  borderColor: '#cccccc',
                }}
                // textStyle={{fontFamily: 'JosefinSans-Regular', fontSize: 16}}
              />
            </View>
          </View>
        </SwipeablePanel>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },

  container: {
    flex: 1,
  },

  // BackgroundImage
  background: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },

  //Setting Top Right
  setting: {
    position: 'absolute',
    right: 0,
    top: 25,
    paddingVertical: 8,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(192, 192, 192, 0.3)',
    justifyContent: 'center',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  settingBtn: {
    paddingHorizontal: 20,
    paddingVertical: 2,
    fontSize: 16,
    color: 'white',
  },
  contact: {
    borderRightWidth: 0.6,
    borderRightColor: 'white',
  },

  // Login && Register Button
  loginBtnPanel: {
    width: '85%',
    marginHorizontal: '7.5%',
    position: 'absolute',
    bottom: 30,
  },
  loginBtnTxt: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
  newUserBtnTxt: {
    textAlign: 'center',
    fontSize: 16,
    color: '#2477B2',
  },
  signIn: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#2477B2',
    paddingVertical: 13,
    marginVertical: 15,
    marginTop: 20,
    borderRadius: 10,
  },
  newUser: {
    borderWidth: 1,
    borderColor: '#2477B2',
    backgroundColor: 'white',
    paddingVertical: 13,
    marginBottom: 15,
    borderRadius: 10,
  },

  //Login Panel
  accPanel: {
    width: '95%',
    marginHorizontal: '2.5%',
  },
  accSignInTxt: {
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  accPf: {
    alignItems: 'center',
  },
  accPfImg: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  userName: {
    fontSize: 20,
    marginVertical: 10,
  },
  accInput: {
    paddingVertical: 10,
    paddingLeft: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    fontSize: 15,
    marginVertical: 15,
  },
  showHintTxt: {
    fontSize: 16,
    color: '#2477B2',
    textAlign: 'right',
    marginTop: 20,
    marginBottom: 15,
    marginRight: 10,
  },
  diffAccTxt: {
    fontSize: 15,
    color: '#2477B2',
    textAlign: 'center',
    marginVertical: 20,
  },

  // Register Panel
  registerHeaderTxt: {
    fontSize: 15,
    paddingTop: 15,
    paddingBottom: 30,
  },
  register: {
    backgroundColor: 'white',
    paddingVertical: 13,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2477B2',
  },
  registerBtnTxt: {
    textAlign: 'center',
    fontSize: 15,
    color: '#2477B2',
  },
  noAccTxt: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    marginTop: 10,
  },
  instantBank: {
    fontSize: 15,
    color: '#2477B2',
    textAlign: 'center',
    marginTop: 20,
  },

  // LanguagePanel
  languagePanel: {
    width: '90%',
    marginHorizontal: '5%',
  },
  eachLang: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  lanWord: {
    fontSize: 15,
    color: '#2477B2',
  },
  logo: {
    position: 'absolute',
    height: '11%',
    width: 200,
    left: '20%',
    top: '35%',
  },
});
