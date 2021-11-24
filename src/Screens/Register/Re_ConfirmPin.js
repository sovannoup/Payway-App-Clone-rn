import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import NavigationService from '../../Service/navigationService';
import {NAV_TYPES} from '../../Navigation/navTypes';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import InputGB from '../components/smallComponent/InputGB';
import SMSVerifyCode from 'react-native-sms-verifycode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Re_Password extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      password: '',
      confirmPass: '',
      codeText: '',
    };
  }

  async UNSAFE_componentWillReceiveProps(nextProp) {
    const {user} = this.props;

    if (
      nextProp.user.result_signup &&
      nextProp.user.result_signup !== user.result_signup
    ) {
      if (nextProp.user.result_signup.message === 'success') {
        const username = await AsyncStorage.getItem('username');
        const password = await AsyncStorage.getItem('password');
        this.props.f_login({
          username: username,
          password: password,
        });
      }
    }
    if (
      nextProp.user.result_login &&
      nextProp.user.result_login !== user.result_login
    ) {
      // if (nextProp.user.result_login.message === 'success')
      //   await AsyncStorage.setItem(
      //     'userId',
      //     nextProp.user.result_login.data.id,
      //   );
      NavigationService.reset(NAV_TYPES.CORE);
    }
  }

  onInputCompleted = async confirmCode => {
    const savedPin = await AsyncStorage.getItem('smsCode');
    const password = await AsyncStorage.getItem('password');
    if (confirmCode === savedPin) {
      this.props.f_signup({
        password: password,
      });
    }
  };

  reset = () => {
    this.verifycode.reset();
    this.setState({codeText: ''});
  };

  render() {
    return (
      <>
        <StatusBar
          // animated={true}
          backgroundColor="#2477B2"
          // barStyle={'default'}
          // showHideTransition={'slide'}
          // hidden={false}
        />
        <View style={styles.regisCon}>
          <TouchableOpacity onPress={() => NavigationService.goBack()}>
            <Icon name="arrow-left" style={styles.regisArrow} />
          </TouchableOpacity>
          <Text style={styles.regisText}>REGISTRATION</Text>
        </View>
        <View style={styles.reCode}>
          <View style={styles.userInfo}>
            <MaterialCommunityIcons
              name="message-text-clock-outline"
              style={styles.people}
            />
            <Text style={styles.headerTxt}>Waiting for SMS</Text>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                marginVertical: 10,
                lineHeight: 25,
              }}>
              We have sent you a secure code via SMS
            </Text>
          </View>
          <SMSVerifyCode
            verifyCodeLength={6}
            containerBackgroundColor={'#f0f0f0'}
            ref={ref => (this.verifycode = ref)}
            onInputCompleted={this.onInputCompleted}
            coverColor={'#2477B2'}
            codeViewHeight={40}
            codeViewBorderColor={'#2477B2'}
            codeFontSize={18}
            containerPaddingLeft={40}
            containerPaddingRight={80}
          />
        </View>
        {/* <View style={styles.footer}>
          <TouchableOpacity
            style={styles.conBtn}
            onPress={() =>
              this.setState({
                Page: 'createUsername',
              })
            }>
            <Text style={styles.conBtnTxt}>Continue</Text>
          </TouchableOpacity>
        </View> */}
      </>
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
  reCode: {
    width: '90%',
    marginHorizontal: '5%',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: '20%',
  },
  people: {
    fontSize: 80,
    marginTop: '10%',
    marginBottom: '5%',
    color: '#2477B2',
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: '500',
  },
  codeInput: {
    paddingVertical: 10,
    paddingLeft: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    fontSize: 15,
    marginVertical: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 0.2,
    borderTopColor: '#cccccc',
  },
  conBtn: {
    backgroundColor: '#2477B2',
    width: '90%',
    marginHorizontal: '5%',
    paddingVertical: 15,
    marginVertical: 15,
    borderRadius: 5,
  },
  conBtnTxt: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
});
