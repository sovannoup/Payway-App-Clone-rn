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
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Re_Password extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      password: 'ssssss',
      confirmPass: 'ssssss',
    };
  }
  async UNSAFE_componentWillReceiveProps(nextProp) {
    const {user} = this.props;

    if (
      nextProp.user.result_getSms &&
      nextProp.user.result_getSms !== user.result_getSms
    ) {
      if (nextProp.user.result_getSms.message === 'success') {
        await AsyncStorage.setItem(
          'smsCode',
          nextProp.user.result_getSms.results[0].smsCode,
        );
        NavigationService.navigate(NAV_TYPES.RE_CONPIN);
      }
    }
  }
  async setupPassword() {
    // if (
    //   this.state.password.length > 1 &&
    //   this.state.password === this.state.confirmPass
    // ) {
    //   AsyncStorage.setItem('password', this.state.password);
    //   this.props.f_register_Sms({
    //     username: await AsyncStorage.getItem('username'),
    //     phonenumber: await AsyncStorage.getItem('phonenumber'),
    //   });
    // }
  }
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
            <Icon name="arrow-left" style={styles.people} />
            <Text style={styles.headerTxt}>Create Password</Text>
          </View>
          <View style={styles.userInput}>
            <InputGB
              holder="Password"
              secureText={true}
              onChangeText={value => this.setState({password: value})}
              value={this.state.password}
            />
            <InputGB
              holder="Confirm Password"
              secureText={true}
              onChangeText={value =>
                this.setState({
                  confirmPass: value,
                })
              }
              value={this.state.confirmPass}
            />
            <View style={{margin: 20}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  marginVertical: 5,
                }}>
                <BouncyCheckbox
                  style={styles.bCheckBox}
                  isChecked={true}
                  size={15}
                  fillColor="#cccccc"
                  unfillColor="#FFFFFF"
                  iconStyle={{
                    borderColor: '#cccccc',
                  }}
                />
                <Text
                  style={{
                    fontSize: 13,
                    color: 'gray',
                  }}>
                  Must have 5 - 18 characters
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  marginVertical: 5,
                }}>
                <BouncyCheckbox
                  style={styles.bCheckBox}
                  isChecked={true}
                  size={15}
                  fillColor="#cccccc"
                  unfillColor="#FFFFFF"
                  iconStyle={{
                    borderColor: '#cccccc',
                  }}
                />
                <Text
                  style={{
                    fontSize: 13,
                    color: 'gray',
                  }}>
                  Must have at least 1 number & 1 letter
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  marginVertical: 5,
                }}>
                <BouncyCheckbox
                  style={styles.bCheckBox}
                  isChecked={true}
                  size={15}
                  fillColor="#cccccc"
                  unfillColor="#FFFFFF"
                  iconStyle={{
                    borderColor: '#cccccc',
                  }}
                />
                <Text
                  style={{
                    fontSize: 13,
                    color: 'gray',
                  }}>
                  Must not have space
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.conBtn}
            onPress={() => this.setupPassword()}>
            <Text style={styles.conBtnTxt}>Continue</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 100,
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
