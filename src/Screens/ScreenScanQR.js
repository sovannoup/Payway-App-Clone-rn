/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import NavigationService from '../Service/navigationService';
import {NAV_TYPES} from '../Navigation/navTypes';
import Icon from 'react-native-vector-icons/Feather';
import DownIcon from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import CountDown from 'react-native-countdown-component';

export default class QR extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      qrCode: '',
      amount: '',
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    var qrValue = navigation.getParam('qr', false);
    var amount = navigation.getParam('amount', false);
    this.setState({
      qrCode: qrValue,
      amount: amount,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProp) {
    const {user} = this.props;

    if (
      nextProp.user.result_checkQR &&
      nextProp.user.result_checkQR !== user.result_checkQR
    ) {
      if (nextProp.user.result_checkQR.message === 'complate pay') {
        alert('Payment Success');
        NavigationService.goBack();
      }
    }
  }

  render() {
    const {qrCode} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#2477B2', '#1758A1', '#104797']}
          style={styles.body}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => NavigationService.goBack()}>
              <Icon name="arrow-left" style={styles.backBtn} />
            </TouchableOpacity>
          </View>
          <View style={styles.linkBox}>
            <View style={styles.shopImgBox}>
              <Image
                style={styles.logoInside}
                source={require('./../Assets/Images/logoAmatak.png')}
              />
            </View>
            <View style={styles.secondLinkBox}>
              <View style={styles.linkHeader}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    marginVertical: 10,
                  }}>
                  Amatak by NOUP SOVAN
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#a8a8a8',
                  }}>
                  Scan here to pay
                </Text>
                <DownIcon
                  name="arrow-long-down"
                  style={{
                    fontSize: 40,
                    color: '#2477B2',
                    marginTop: 20,
                  }}
                />
              </View>
              <View style={styles.boxQR}>
                <View style={styles.dakBorder}>
                  {qrCode != '' ? (
                    <QRCode
                      value={JSON.stringify(qrCode)}
                      size={210}
                      style={styles.dummyQR}
                    />
                  ) : (
                    <View style={styles.dummyQR} />
                  )}
                </View>
                <View style={styles.topStyleBox} />
                <View style={styles.bottomStyleBox} />
                <View style={styles.leftStyleBox} />
                <View style={styles.rightStyleBox} />
              </View>
              <View style={styles.timeOut}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: '700',
                    color: '#2477B2',
                    marginBottom: 5,
                  }}>
                  {'$ ' + this.state.amount}
                </Text>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <CountDown
                    until={60 * 3}
                    size={15}
                    onFinish={() => NavigationService.goBack()}
                    onChange={value => {
                      if (value % 5 === 0) {
                        this.props.f_check_qr({
                          strQR: this.state.qrCode,
                        });
                      }
                    }}
                    digitStyle={{
                      backgroundColor: 'white',
                    }}
                    digitTxtStyle={{
                      fontSize: 18,
                      color: 'gray',
                    }}
                    timeToShow={['M', 'S']}
                    timeLabels={{
                      m: null,
                      s: null,
                    }}
                    showSeparator
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'gray',
                      marginLeft: -10,
                      fontWeight: '700',
                    }}>
                    {''} S
                  </Text>
                </View>
              </View>
              <View style={styles.linkFooter}>
                <Text>Payment Method</Text>
              </View>
              <View style={styles.footerLogo} />
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2477B2',
  },
  body: {
    width: '100%',
    height: '100%',
    paddingHorizontal: '5%',
  },
  backBtn: {
    fontSize: 35,
    marginTop: 10,
    color: 'white',
  },
  linkBox: {
    height: '90%',
    alignItems: 'center',
  },
  secondLinkBox: {
    width: '100%',
    height: '90%',
    marginTop: 50,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  shopImgBox: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: '#2477B2',
    borderWidth: 4,
    borderColor: '#1dacd6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInside: {
    width: '80%',
    resizeMode: 'contain',
  },
  linkHeader: {
    alignItems: 'center',
  },
  //QR Box:
  boxQR: {
    marginTop: 30,
    height: 250,
    width: '70%',
    marginHorizontal: '15%',
  },
  dakBorder: {
    padding: 18,
    height: '100%',
    borderWidth: 5,
    borderColor: '#2477B2',
  },
  topStyleBox: {
    position: 'absolute',
    width: '70%',
    right: '15%',
    height: 5,
    backgroundColor: 'white',
  },
  rightStyleBox: {
    position: 'absolute',
    width: 5,
    top: '15%',
    height: '70%',
    right: 0,
    backgroundColor: 'white',
  },
  bottomStyleBox: {
    position: 'absolute',
    width: '70%',
    right: '15%',
    height: 5,
    bottom: 0,
    backgroundColor: 'white',
  },
  leftStyleBox: {
    position: 'absolute',
    width: 5,
    top: '15%',
    height: '70%',
    backgroundColor: 'white',
  },

  //Timeout
  timeOut: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '7%',
  },

  // Save Payment

  linkFooter: {
    marginTop: '3%',
    paddingVertical: 15,
    width: '90%',
    marginHorizontal: '5%',
    borderTopWidth: 1,
    borderTopColor: '#ececec',
    display: 'flex',
    flexDirection: 'row',
  },
});
