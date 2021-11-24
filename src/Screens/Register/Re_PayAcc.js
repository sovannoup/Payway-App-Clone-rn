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
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import NavigationService from '../../Service/navigationService';
import {NAV_TYPES} from '../../Navigation/navTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputGB from '../components/smallComponent/InputGB';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {upperCase} from 'lodash';
export default class Re_PayAcc extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      btnContinue: true,
      amatakpay: '',
      phonenumber: '',
    };
  }

  async UNSAFE_componentWillReceiveProps(nextProp) {
    const {user} = this.props;

    if (
      nextProp.user.result_username &&
      nextProp.user.result_username !== user.result_username
    ) {
      if (nextProp.user.result_username.message === 'have_account') {
        alert('Your Amatak Pay account is already registered');
      } else {
        this.props.f_check_phone({
          phonenumber: this.state.phonenumber,
        });
      }
    }

    if (
      nextProp.user.result_checkPhone &&
      nextProp.user.result_checkPhone !== user.result_checkPhone
    ) {
      if (nextProp.user.result_checkPhone.message === 'success') {
        AsyncStorage.setItem('username', this.state.amatakpay);
        AsyncStorage.setItem('phonenumber', this.state.phonenumber);
        NavigationService.navigate(NAV_TYPES.RE_PASS);
      } else {
        alert('Phone Already Registered');
      }
    }
  }

  async savedPayAcc() {
    this.props.f_username_verify({
      username: this.state.amatakpay,
    });
  }

  render() {
    const {phonenumber, amatakpay} = this.state;
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
        <ScrollView style={styles.reCode}>
          <View style={styles.userInfo}>
            <FontAwesome name="credit-card" style={styles.people} />
            <Text style={styles.headerTxt}>Registration</Text>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                marginVertical: 10,
                lineHeight: 25,
              }}>
              Enter ABA account & Phone number registered at ABA Bank.
            </Text>
          </View>
          <View style={styles.userInput}>
            <InputGB
              holder="Amatak Pay"
              type="FontAwesome5"
              className="comments-dollar"
              onChangeText={text => {
                var temp = text;
                var num = /^[0-9]+$/;
                //if number
                if (
                  temp &&
                  temp[temp.length - 1].match(num) &&
                  temp.length < 10
                ) {
                  // if first input and it's num
                  if (temp[0].match(num)) {
                    temp = 'AMT' + temp;
                    this.setState({amatakpay: temp});
                    //if num not first digit
                  } else {
                    this.setState({amatakpay: temp});
                  }
                } else {
                  //If input if text, change to uppercase
                  var UpperText = temp[temp.length - 1].toUpperCase();
                  console.log(temp.length - 1);
                  switch (temp.length - 1) {
                    case 0: {
                      if (UpperText === 'A') {
                        this.setState({
                          amatakpay: temp,
                        });
                      }
                      break;
                    }
                    case 1: {
                      if (UpperText === 'M') {
                        this.setState({
                          amatakpay: temp,
                        });
                      }
                      break;
                    }
                    case 2: {
                      if (UpperText === 'T') {
                        this.setState({
                          amatakpay: temp,
                        });
                      }
                      break;
                    }
                  }
                }
                if (
                  phonenumber.length > 6 &&
                  phonenumber.length < 15 &&
                  amatakpay.length > 0 &&
                  amatakpay.length <= 10
                ) {
                  this.setState({btnContinue: false});
                } else {
                  this.setState({btnContinue: true});
                }
              }}
              value={this.state.amatakpay}
            />
            <InputGB
              holder="Registered phone number"
              keyboardType="numeric"
              type="FontAwesome"
              className="phone-square"
              onChangeText={text => {
                let num = text.replace('.', '');
                if (isNaN(num)) {
                  alert('Only Number is allowed');
                } else {
                  var a = num;
                  if (text[0] != 0 && text[0]) {
                    var a = '0' + num;
                  }
                  this.setState({phonenumber: a});
                  if (
                    phonenumber.length > 6 &&
                    phonenumber.length < 15 &&
                    amatakpay.length > 0 &&
                    amatakpay.length <= 10
                  ) {
                    this.setState({btnContinue: false});
                  } else {
                    this.setState({btnContinue: true});
                  }
                }
              }}
              value={this.state.phonenumber}
            />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              this.state.btnContinue ? styles.conBtnDisable : styles.conBtn,
            ]}
            disabled={this.state.btnContinue}
            onPress={() => this.savedPayAcc()}>
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
    fontSize: 20,
    fontWeight: '700',
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
    fontWeight: '700',
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
  conBtnDisable: {
    backgroundColor: '#cccccc',
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
