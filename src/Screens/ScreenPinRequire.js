import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import IconA from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/Feather';
import IconFo from 'react-native-vector-icons/Foundation';
import IconF5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

import navigationService from '../Service/navigationService';
import {NAV_TYPES} from '../Navigation/navTypes';
/* import IconM from 'react-native-vector-icons/MaterialIcons'; */

export default class RequirePin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passcode: ['', '', '', ''],
      finalCode: '',
    };
  }

  componentDidMount() {
    this.BackHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      navigationService.goBack(),
    );
  }

  componentWillUnmount() {
    this.BackHandler.remove();
  }
  UNSAFE_componentWillReceiveProps(nextProp) {
    const {user} = this.props;
    if (
      nextProp.user.result_check_page &&
      nextProp.user.result_check_page !== user.result_check_page
    ) {
      if (nextProp.user.result_check_page.data.message === 'success pin') {
        navigationService.goBack();
      }
    }
  }

  _onPressNumber = async num => {
    let tempCode = this.state.passcode;
    for (var i = 0; i < tempCode.length; i++) {
      if (tempCode[i] == '') {
        tempCode[i] = num;
        break;
      } else {
        continue;
      }
    }
    this.setState({passcode: tempCode});
    if (this.state.passcode[3] !== '') {
      for (var i = 0; i < this.state.passcode.length; i++) {
        this.state.finalCode += this.state.passcode[i];
        this.state.passcode[i] = '';
      }
      this.props.f_pin_check_page({
        pin: this.state.finalCode,
      });
      this.setState({finalCode: ''});
    }
  };

  _onPressC = () => {
    let tempCode = this.state.passcode;
    for (var i = tempCode.length - 1; i >= 0; i = i - 1) {
      if (tempCode[i] != '') {
        tempCode[i] = '';
      } else {
        continue;
      }
    }
    this.setState({passcode: tempCode});
  };
  _onPressCancel = () => {
    let tempCode = this.state.passcode;
    for (var i = tempCode.length - 1; i >= 0; i--) {
      if (tempCode[i] != '') {
        tempCode[i] = '';
        break;
      } else {
        continue;
      }
    }
    this.setState({passcode: tempCode});
  };

  render() {
    let number = [
      {id: 1},
      {id: 2},
      {id: 3},
      {id: 4},
      {id: 5},
      {id: 6},
      {id: 7},
      {id: 8},
      {id: 9},
      {id: '0'},
    ];
    return (
      <View Style={{flex: 1}}>
        <View style={{backgroundColor: '#2477B2'}}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#2477B2',
              alignItems: 'center',
              height: '8%',
            }}>
            <TouchableOpacity
              onPress={() => navigationService.navigate(NAV_TYPES.HOME)}>
              <IconA
                name="arrowleft"
                style={{
                  fontSize: 25,
                  color: 'white',
                  marginLeft: '3%',
                  marginTop: '2%',
                }}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerText}>REQUIRE PIN</Text>
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.lockIcon}>
              <IconFo
                name="lock"
                style={{
                  color: '#2477B2',
                  fontSize: 45,
                }}
              />
              <View
                style={{
                  width: 90,
                  height: 30,
                  backgroundColor: '#2477B2',
                  borderRadius: 50,
                  flexDirection: 'row',
                  marginTop: '1%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 2,
                  elevation: 9,
                }}>
                <View>
                  <IconF5
                    name="star-of-life"
                    style={{
                      fontSize: 15,
                      color: 'white',
                      marginHorizontal: 2,
                    }}
                  />
                </View>
                <View>
                  <IconF5
                    name="star-of-life"
                    style={{
                      fontSize: 15,
                      color: 'white',
                      marginHorizontal: 2,
                    }}
                  />
                </View>
                <View>
                  <IconF5
                    name="star-of-life"
                    style={{
                      fontSize: 15,
                      color: 'white',
                      marginHorizontal: 2,
                    }}
                  />
                </View>
                <View>
                  <IconF5
                    name="star-of-life"
                    style={{
                      fontSize: 15,
                      color: 'white',
                      marginHorizontal: 2,
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  marginVertical: 10,
                }}>
                <Text
                  style={{
                    bottom: 0,
                    color: 'black',
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  Input your 4-digit PIN
                </Text>
                <Text
                  style={{
                    bottom: 0,
                    color: 'black',
                    fontSize: 17,
                    marginTop: 15,
                  }}>
                  This will be required during daily access to the app and
                  managing, setting or transactions.
                </Text>
              </View>
            </View>

            <View style={styles.coverNumber}>
              {this.state.passcode.map((p, index) => {
                let style = p != '' ? styles.number1 : styles.number;
                return <View style={style} key={index} />;
              })}
            </View>
            <View>
              <View style={styles.coverNumberPin}>
                {number.map(num => {
                  return (
                    <View style={styles.numberPin} key={num.id}>
                      <TouchableRipple
                        style={styles.numberPin1}
                        borderless={true}
                        rippleColor="rgba(225, 225, 2251)"
                        onPress={() => this._onPressNumber(num.id)}>
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: '#2477B2',
                          }}>
                          {num.id}
                        </Text>
                      </TouchableRipple>
                    </View>
                  );
                })}
              </View>
            </View>
            <View
              style={{
                height: '16.5%',
                width: '33.33%',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: '-1%',
                left: '1%',
              }}>
              <TouchableRipple
                borderless={true}
                rippleColor="rgba(225, 225, 2251)"
                style={styles.c}
                onPress={() => this._onPressC()}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#2477B2',
                  }}>
                  C
                </Text>
              </TouchableRipple>
            </View>
            <View
              style={{
                height: '16.5%',
                width: '33.33%',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: '-1%',
                right: '5%',
              }}>
              <TouchableRipple
                borderless={true}
                rippleColor="rgba(225, 225, 2251)"
                style={styles.c}
                onPress={() => this._onPressCancel()}>
                <IconF
                  name="delete"
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#2477B2',
                  }}
                />
              </TouchableRipple>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '94%',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  /*  delete:{
      position: 'absolute',
      right:'6%',
      bottom:'-0.5%',
      width:110,
      justifyContent:'center',
      alignItems: 'center',
      height:110,
      borderRadius:200,
    }, */
  c: {
    left: '6%',
    bottom: 60,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    height: 110,
    borderRadius: 200,
  },
  coverNumber: {
    flexDirection: 'row',
    width: '100%',
    height: '12.5%',
    paddingTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverNumberPin: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '40.2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    width: 16,
    marginHorizontal: '1.5%',
    height: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2477B2',
  },
  number1: {
    width: 16,
    marginHorizontal: '1.5%',
    height: 16,
    backgroundColor: '#2477B2',
    borderRadius: 20,
  },
  numberPin: {
    width: '26%',
    marginHorizontal: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '85%',
    borderRadius: 200,
  },
  numberPin1: {
    width: 125,
    marginHorizontal: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 125,
    borderRadius: 200,
  },
  lockIcon: {
    width: '100%',
    height: '23.9%',
    paddingTop: '3%',
    alignItems: 'center',
  },
  cancelBtn: {
    width: '22%',
    height: '6%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* new */

  content: {
    flex: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },

  headerText: {
    color: 'white',
    fontSize: 20,
    marginLeft: '10%',
    fontWeight: 'bold',
  },
});
