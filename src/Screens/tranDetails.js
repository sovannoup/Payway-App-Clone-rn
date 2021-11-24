import React, {Component, createRef} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
import NavigationService from '../Service/navigationService';
import {NAV_TYPES} from '../Navigation/navTypes';
import Icon from 'react-native-vector-icons/Feather';
import {SwipeablePanel} from 'rn-swipeable-panel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import InputGB from './components/smallComponent/InputGB';

const sheetRef = createRef(null);

export default class TranDetail extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      refundAction: false,
      data: '',
      idLength: 8,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    const {data} = this.state;
    var result = navigation.getParam('result', false);
    this.setState({data: result});
  }

  getId = data => {
    const {idLength} = this.state;
    if (data) {
      var temp = '';
      console.log(data.id.toString().length);
      for (var i = 0; i < idLength - data.id.toString().length; i++) {
        temp += '0';
      }
      return temp + data.id.toString();
    }
  };

  render() {
    const {refundAction, data} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => NavigationService.goBack()}>
            <Icon name="arrow-left" style={styles.goBack} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              fontWeight: '700',
            }}>
            TRANSACTION DETAIL
          </Text>
        </View>
        <View style={styles.tranDetailBox}>
          <View style={styles.firstRow}>
            <View style={styles.eachTranLeft}>
              <Image
                style={styles.logo}
                source={require('./../Assets/Images/bg.jpg')}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: 15,
                }}>
                <Text style={{fontSize: 20}}>{this.getId(data)}</Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'gray',
                    marginTop: 3,
                  }}>
                  {data.date}
                </Text>
              </View>
            </View>
            <View style={styles.eachTranRight}>
              <FontAwesome
                name="share-alt"
                style={{
                  fontSize: 25,
                  color: '#2477B2',
                }}
              />
            </View>
          </View>
          <Text
            style={{
              fontSize: 20,
              color: '#ececec',
            }}>
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - -
          </Text>

          <View style={styles.secondRow}>
            <View style={styles.content}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={styles.leftText}>Date/Time:</Text>
                <Text style={styles.rightTxt}>{data.date}</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={styles.leftText}>Sales Point:</Text>
                <Text style={styles.rightTxt}>
                  Amatak by {data.recieverFirstName}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={styles.leftText}>Seller:</Text>
                <Text style={styles.rightTxt}>
                  {data.recieverFirstName} {data.recieverLastName}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={styles.leftText}>Accepted Via:</Text>
                <Text style={styles.rightTxt}>AMATAK PAY</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={styles.leftText}>Payment Type:</Text>
                <Text style={styles.rightTxt}>AMATAK PAY</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={styles.leftText}>Payer</Text>
                <Text style={styles.rightTxt}>
                  {data.senderFirstName} {data.senderLastName}
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={styles.leftText}>Original Amount:</Text>
                <Text style={styles.rightTxt}>{data.USD} USD</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={styles.leftText}>Payment Amount:</Text>
                <Text style={styles.rightTxt}>{data.USD} USD</Text>
              </View>
            </View>
            <View style={styles.footer}>
              <View style={styles.left}>
                <Text
                  style={{
                    fontSize: 10,
                    color: 'gray',
                  }}>
                  TOTAL AMOUNT
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'green',
                    fontWeight: '700',
                    marginTop: 5,
                  }}>
                  {data.USD} USD
                </Text>
              </View>
              <View style={styles.right}>
                <TouchableOpacity
                  style={styles.refundBtn}
                  onPress={() =>
                    this.setState({
                      refundAction: true,
                    })
                  }>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'white',
                    }}>
                    Refund
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <SwipeablePanel
          closeOnTouchOutside={true}
          isActive={refundAction}
          onClose={() => this.setState({refundAction: false})}
          onlyLarge={true}
          fullWidth={true}
          style={{height: '45%'}}>
          <View style={styles.refundContent}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                marginTop: 10,
                marginBottom: 15,
              }}>
              Refund
            </Text>
            <View style={styles.inputField}>
              <InputGB
                holder="Refund amount (Max 99.00 USD)"
                type="Ionicons"
                className="md-reload-circle-sharp"
              />
              <InputGB holder="Remark (Optional)" type="" />
              <Text
                style={{
                  fontSize: 12,
                  textAlign: 'right',
                  marginRight: 10,
                }}>
                32/250
              </Text>
            </View>
            <TouchableOpacity style={styles.confirmBtn}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                }}>
                Comfirm
              </Text>
            </TouchableOpacity>
          </View>
        </SwipeablePanel>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2477B2',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  header: {
    width: '90%',
    marginHorizontal: '5%',
  },
  goBack: {
    fontSize: 25,
    marginTop: 10,
    color: 'white',
  },
  tranDetailBox: {
    backgroundColor: 'white',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingTop: 20,
    height: '91%',
    marginTop: 10,
  },
  firstRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingTop: 15,
    paddingBottom: 10,
  },
  eachTranLeft: {
    display: 'flex',
    flexDirection: 'row',
  },
  secondRow: {
    height: '85%',
  },
  content: {
    width: '90%',
    marginHorizontal: '5%',
  },
  leftText: {
    color: 'gray',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: '5%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    paddingTop: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: '#ececec',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
  },
  right: {
    justifyContent: 'center',
  },
  refundBtn: {
    backgroundColor: '#2477B2',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  //refund sheet panel
  refundContent: {
    width: '90%',
    marginHorizontal: '5%',
  },
  userInput: {
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cccccc',
    fontSize: 16,
    paddingLeft: 45,
    marginVertical: 12.5,
  },
  inputIcon: {
    position: 'absolute',
    fontSize: 25,
    top: 20,
    left: 10,
  },
  confirmBtn: {
    backgroundColor: '#2477B2',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: '12%',
  },
});
