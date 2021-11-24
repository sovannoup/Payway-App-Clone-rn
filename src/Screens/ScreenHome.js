import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import NavigationService from '../Service/navigationService';
import {NAV_TYPES} from '../Navigation/navTypes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SwipeablePanel} from 'rn-swipeable-panel';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

import {TouchableRipple} from 'react-native-paper';
import IconA from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import IconF from 'react-native-vector-icons/Feather';
import IconFo from 'react-native-vector-icons/Foundation';
import IconF5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';

export default class Home extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      moneyZin: '',
      shareActive: false,
      passcode: ['', '', '', ''],
      amount: '',
      moneyLength: 8,
      btnShowQR: false,
      description: '',
    };
  }
  componentDidMount() {
    this.props.f_checkProfile();
  }

  UNSAFE_componentWillReceiveProps(nextProp) {
    const {user} = this.props;

    if (
      nextProp.user.profileErrMessage &&
      nextProp.user.profileErrMessage !== user.profileErrMessage
    ) {
      if (
        nextProp.user.profileErrMessage.data.data.message === 'not set profile'
      ) {
        NavigationService.navigate(NAV_TYPES.RE_BUS);
      } else {
        this.props.f_checkPin();
      }
    }

    if (
      nextProp.user.result_pin &&
      nextProp.user.result_pin !== user.result_pin
    ) {
      if (nextProp.user.result_pin.data.message === 'not set pin') {
        NavigationService.navigate(NAV_TYPES.RE_SETUP_PIN);
      }
    }

    if (nextProp.user.result_qr && nextProp.user.result_qr !== user.result_qr) {
      console.log('Got QR value: ', nextProp.user.result_qr.results);
      if (nextProp.user.result_qr.message === 'success') {
        NavigationService.navigate(NAV_TYPES.QR, {
          qr: nextProp.user.result_qr.results,
          amount: this.state.moneyZin,
        });
      }
    }
  }
  _onPressNumber = num => {
    const {passcode, amount, moneyLength, moneyZin} = this.state;
    let tempCode = passcode;
    for (var i = 0; i < tempCode.length; i++) {
      if (amount.length + 1 > moneyLength) {
        alert('noooo');
        break;
      }
      if (num === '.') {
        if (amount.includes('.')) {
          break;
        } else if (amount.length == 0) {
          num = 0 + num;
          this.state.moneyLength = amount.length + 4;
        } else {
          this.state.moneyLength = amount.length + 3;
        }
      } else if (num === 0) {
        if (amount.length == 0) {
          break;
        }
      }
      if (tempCode[i] == '') {
        tempCode[i] = num;
        break;
      } else {
        continue;
      }
    }
    this.setState({passcode: tempCode});
    for (var i = 0; i < passcode.length; i++) {
      if (this.state.amount + passcode[i] > 100000) {
        passcode[i] = '';
        alert('More than 100,000$ is not allowed');
        break;
      }
      this.state.amount += passcode[i];
      passcode[i] = '';
    }
    if (this.state.amount.includes('.')) {
      if (this.state.amount[this.state.amount.length - 1] === '.') {
        this.state.moneyZin = this.state.amount.replace('.', '') + '.00';
      } else {
        this.state.moneyZin = this.state.amount;
      }
    } else {
      this.state.moneyZin = this.state.amount + '.00';
    }
  };

  _onPressC = () => {
    const {amount, passcode} = this.state;
    if (amount[amount.length - 1] == '.') {
      this.state.moneyLength = 8;
      for (var i = 0; i < passcode.length; i++) {
        passcode[i] = '';
      }
    }
    if (amount[1] === '.' && amount[amount.length - 1] === '.') {
      var result = amount.slice(0, amount.length - 2);
    } else {
      var result = amount.slice(0, amount.length - 1);
    }
    this.setState({amount: result});
    //more format
    if (result.includes('.')) {
      if (result[result.length - 1] === '.') {
        this.state.moneyZin = result.replace('.', '') + '.00';
      } else {
        this.state.moneyZin = result;
      }
    } else {
      this.state.moneyZin = result + '.00';
    }
  };

  startShowQR() {
    var dateAndTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const {moneyZin} = this.state;
    if (moneyZin <= 0) {
      alert('Please Enter Any Amount');
    } else {
      var data = {
        type: 'amatak_payway',
        total: moneyZin,
        date: dateAndTime,
        currentType: 'usd',
      };
      this.props.f_get_qr(data);
    }
  }

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
      {id: '.'},
      {id: 0},
      {id: ''},
    ];
    const {shareActive, amount, moneyZin} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#2477B2', '#1758A1', '#104797']}
          style={styles.firstRow}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => NavigationService.toggleDrawer()}>
              <MaterialIcons name="menu" style={styles.Menu} />
            </TouchableOpacity>
            <Image
              style={styles.logo}
              resizeMode="contain"
              source={require('./../Assets/Images/logoAmatak.png')}
            />
            <View style={styles.right}>
              <TouchableOpacity
                onPress={() => NavigationService.navigate(NAV_TYPES.NOTI)}>
                <Ionicons name="notifications" style={styles.rightIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.rightIcon,
                  {
                    backgroundColor: 'white',
                    width: 28,
                    height: 28,
                    borderRadius: 28 / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}
                onPress={() => NavigationService.navigate(NAV_TYPES.MANAGE)}>
                <Fontisto
                  name="shopping-store"
                  style={{fontSize: 15, color: '#2477B2'}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.amount}>
            <Text
              style={{
                color: 'white',
                opacity: 0.8,
              }}>
              ENTER AMOUNT
            </Text>
            <View style={styles.aboutMoney}>
              <Text style={amount === '' ? styles.notMoneyDolar : styles.money}>
                $
              </Text>
              <Text
                style={amount === '' ? styles.notSetMoney : styles.amountMoney}>
                {amount === '' ? '0' : amount}
              </Text>
            </View>
          </View>
        </LinearGradient>

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
                        color: 'black',
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
          }}
        />
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
            onPress={() => this._onPressC()}>
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

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => this.startShowQR()}
            style={[amount != '' ? styles.showBtnNoMoney : styles.showBtn]}>
            <MaterialIcons
              name="qr-code-scanner"
              style={[
                amount != '' ? styles.footerIconNoMoney : styles.footerIcon,
              ]}
            />
            <Text
              style={[
                amount != '' ? styles.footerBtnTxtNoMoney : styles.footerBtnTxt,
              ]}>
              {amount === '' ? 'Show QR' : 'Confirm $' + moneyZin}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({shareActive: true})}
            style={styles.shareBtn}>
            <FontAwesome name="share" style={styles.footerIcon} />
            <Text style={styles.footerBtnTxt}>Share</Text>
          </TouchableOpacity>
        </View>
        <SwipeablePanel
          closeOnTouchOutside={true}
          isActive={shareActive}
          onClose={() => this.setState({shareActive: false})}
          onlyLarge={true}
          fullWidth={true}
          style={{height: '50%'}}>
          <View style={styles.sharePanel}>
            <Text style={styles.shareHeadTxt}>Payment Link</Text>
            <View style={styles.shareBoxDesc}>
              <Text style={styles.descTxt}>
                Add product/service details and share link with your customer to
                receive payments.
              </Text>
              <View style={{width: '30%'}}>
                <Entypo name="add-to-list" style={styles.descIcon} />
              </View>
            </View>
            <View style={styles.userInput}>
              <TextInput
                style={styles.descInput}
                placeholder="Short description (optional)"
                onChangeText={value => {
                  if (value.length < 250) {
                    this.setState({description: value});
                  }
                }}
              />
              <View style={styles.absIcon}>
                <MaterialIcons
                  name="description"
                  style={{fontSize: 25, marginTop: 10, color: '#2477B2'}}
                />
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 20,
                    color: '#a8a8a8',
                  }}>
                  {this.state.description.length} / 250
                </Text>
              </View>
            </View>
            <View style={styles.linkFooter}>
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}
                style={styles.linkShareBtn}>
                <FontAwesome name="share" style={styles.linkShareIcon} />
                <Text style={styles.linkShareTxt}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    shareActive: true,
                  })
                }
                style={styles.copyShareBtn}>
                <MaterialIcons name="content-copy" style={styles.footerIcon} />
                <Text style={styles.footerBtnTxt}>Copy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SwipeablePanel>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstRow: {
    height: '40%',
    backgroundColor: '#2477B2',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    marginTop: 10,
    marginLeft: 30,
    height: '90%',
  },
  Menu: {
    marginTop: 10,
    fontSize: 30,
    color: 'white',
    marginLeft: 15,
  },
  rightIcon: {
    fontSize: 25,
    opacity: 0.9,
    color: 'white',
    marginTop: 15,
    marginRight: 20,
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
  },
  amount: {
    alignItems: 'center',
    marginTop: '25%',
  },
  aboutMoney: {
    paddingHorizontal: 15,
  },
  notMoneyDolar: {
    fontSize: 25,
    position: 'absolute',
    left: -5,
    top: '15%',
    color: 'white',
    opacity: 0.5,
  },
  money: {
    fontSize: 25,
    position: 'absolute',
    left: -5,
    top: '15%',
    color: 'white',
  },
  notSetMoney: {
    fontSize: 50,
    color: 'white',
    opacity: 0.5,
  },
  amountMoney: {
    fontSize: 50,
    color: 'white',
  },

  //middle
  mid: {
    width: '100%',
    height: '50%',
  },
  footer: {
    position: 'absolute',
    bottom: '3%',
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    marginHorizontal: '5%',
  },
  showBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2477B2',
    width: '70%',
    marginRight: '2%',
    justifyContent: 'center',
  },
  showBtnNoMoney: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2477B2',
    backgroundColor: '#2477B2',
    width: '70%',
    marginRight: '2%',
    justifyContent: 'center',
  },
  shareBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2477B2',
    width: '28%',
    justifyContent: 'center',
  },
  footerIcon: {
    fontSize: 25,
    color: '#2477B2',
  },
  footerIconNoMoney: {
    fontSize: 25,
    color: 'white',
  },
  footerBtnTxt: {
    fontSize: 15,
    color: '#2477B2',
    marginLeft: 5,
  },
  footerBtnTxtNoMoney: {
    fontSize: 15,
    color: 'white',
    marginLeft: 5,
  },

  // Share Panel
  sharePanel: {
    width: '90%',
    marginHorizontal: '5%',
  },
  shareHeadTxt: {
    fontSize: 17,
    fontWeight: '700',
    paddingVertical: 10,
  },
  shareBoxDesc: {
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#FAFAFA',
    borderColor: '#ececec',
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 15,
  },
  descTxt: {
    fontSize: 15,
    color: '#a8a8a8',
    width: '70%',
  },
  descIcon: {
    textAlign: 'center',
    fontSize: 50,
    marginLeft: 30,
    color: '#2477B2',
  },
  userInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#2477B2',
    marginTop: 35,
    marginBottom: 65,
  },
  absIcon: {
    position: 'absolute',
    right: 0,
    top: 5,
  },
  descInput: {
    fontSize: 16,
    paddingRight: 50,
  },
  linkFooter: {
    display: 'flex',
    flexDirection: 'row',
  },
  linkShareBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2477B2',
    width: '73%',
    marginRight: '2%',
    justifyContent: 'center',
    backgroundColor: '#2477B2',
  },
  copyShareBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2477B2',
    width: '25%',
    justifyContent: 'center',
  },
  linkShareIcon: {
    fontSize: 30,
    color: 'white',
  },
  linkShareTxt: {
    fontSize: 15,
    color: 'white',
    marginLeft: 5,
  },

  //keyboard
  coverNumberPin: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberPin: {
    width: '26%',
    marginHorizontal: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
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
  c: {
    left: '6%',
    bottom: '60%',
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    height: 110,
    borderRadius: 200,
  },
});
