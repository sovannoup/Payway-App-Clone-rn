import React, {Component, useState} from 'react';
import {
  TextInput,
  ImageBackground,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  TouchableOpacity,
  Switch,
} from 'react-native';
import IconA from 'react-native-vector-icons/AntDesign';
import IconE from 'react-native-vector-icons/Entypo';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconFo from 'react-native-vector-icons/Fontisto';
import {TouchableRipple} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
/* import { TextInput } from 'react-native-paper'; */
export default class TransactionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,

      text1: '',
      text2: '',
      showBTN: false,
    };
  }
  render() {
    const image = {
      uri:
        'https://play-lh.googleusercontent.com/2u7cigMgoBJhULx9ZXmtdZV2RdFklF2Uef3GNuIUI2QlYJdWkSnPfzFdhWlGC8IZ1tM',
    };
    /*      const [isEnabled, setIsEnabled] = useState(false);
        const toggleSwitch = () => setIsEnabled(previousState => !previousState); */
    return (
      <View style={{flex: 1, backgroundColor: '#2477B2'}}>
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={350}
          openDuration={250}
          closeOnDragDown={true}
          customStyles={{
            container: {
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              paddingHorizontal: 20,
            },
          }}>
          <Text Style={{fontSize: 18, fontWeight: 'bold'}}>REFUND</Text>

          <View style={{marginTop: 20}}>
            <IconM
              style={{
                position: 'absolute',
                left: 10,
                fontSize: 25,
                color: 'gray',
                top: 23,
              }}
              name="monetization-on"
            />
            <TextInput
              keyboardType="numeric"
              style={styles.input1}
              placeholder="Refound amount (Max 1.00 USD)"
              onChangeText={text => {
                this.setState({text1: text});

                if (
                  this.state.text2.length > 0 &&
                  text.length > 0 &&
                  this.state.text2 != null
                ) {
                  this.setState({text1: text});
                  this.setState({showBTN: true});
                } else {
                  this.setState({showBTN: false});
                }
              }}
            />
          </View>

          <View style={{marginTop: 5}}>
            <IconM
              style={{
                position: 'absolute',
                left: 10,
                fontSize: 25,
                color: 'gray',
                top: 23,
              }}
              name="chat"
            />
            <TextInput
              maxLength={250}
              style={styles.input1}
              placeholder="Remark (Optional)"
              onChangeText={textChat => {
                this.setState({text2: textChat});
                if (
                  textChat.length > 0 &&
                  this.state.text1.length > 0 &&
                  this.state.text1 != null
                ) {
                  this.setState({text2: textChat});
                  this.setState({showBTN: true});
                } else {
                  this.setState({showBTN: false});
                }
              }}
            />
            <Text
              style={{
                position: 'absolute',
                bottom: -15,
                right: 15,
                color: 'gray',
              }}>
              0/250
            </Text>
          </View>

          <View style={styles.footerUp}>
            <TouchableOpacity
              disabled={this.state.showBTN == true ? 0 : 1}
              style={
                this.state.showBTN == false
                  ? styles.btn
                  : [styles.btn, {backgroundColor: '#2477B2'}]
              }>
              <Text style={{color: 'white'}}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
        <View style={{flex: 0.6}}>
          <IconA
            name="arrowleft"
            style={{
              fontSize: 25,
              color: 'white',
              marginLeft: '3%',
              marginTop: '2%',
            }}
          />
          <View>
            <Text style={styles.headerText}>Transaction Detail</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.SubHeader}>
            <View style={styles.avator}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: 'red',
                  borderRadius: 100,
                  overflow: 'hidden',
                }}>
                <ImageBackground
                  source={image}
                  resizeMode="cover"
                  style={styles.image}
                />
              </View>
            </View>
            <View style={styles.avatorTitle}>
              <Text style={{fontSize: 20}}>163479578365804</Text>
              <Text style={{fontSize: 12, color: 'gray'}}>
                21/10/2021 12:56:24 PM
              </Text>
            </View>
            <View style={styles.share}>
              <IconE name="share" size={30} color="#2477B2" />
            </View>
          </View>
          <View style={styles.Info}>
            <ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{color: 'gray'}}>Date/Time:</Text>
                <Text>21/10/2023 12:34:44 PM</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{color: 'gray'}}>Sales Point:</Text>
                <Text>mane By M.DEOUN</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{color: 'gray'}}>Seller:</Text>
                <Text>MANE DEOUN</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{color: 'gray'}}>Accept Via:</Text>
                <Text>PaWay Mobile</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{color: 'gray'}}>Payment Type:</Text>
                <Text>ABA PAy</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{color: 'gray'}}>Payer:</Text>
                <Text>KOK DARA (*233)</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{color: 'gray'}}>Approval Code:</Text>
                <Text>23422</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{color: 'gray'}}>Original Amount:</Text>
                <Text>100 USD</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={{color: 'gray'}}>Payment Amount:</Text>
                <Text>100 USD</Text>
              </View>
            </ScrollView>
          </View>
          <View style={styles.footer}>
            <View style={styles.footerLeft}>
              <Text style={{fontSize: 10, color: 'gray'}}>TOTAL AMONUT</Text>
              <Text style={{color: '#1ab13a', fontSize: 19}}>1000 USD</Text>
            </View>
            <View style={styles.footerRight}>
              <TouchableRipple
                onPress={() => this.RBSheet.open()}
                rippleColor="#99e7eb"
                style={{
                  backgroundColor: '#2477B2',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                }}>
                <Text style={{color: 'white'}}>Refound</Text>
              </TouchableRipple>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    flex: 5.4,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  btn: {
    backgroundColor: '#dee5e5',
    height: 50,
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerUp: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    bottom: 0,
  },
  input1: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 10,
    padding: 0,
    paddingLeft: 50,
    height: 50,
  },
  avator: {
    /* backgroundColor:'gray', */
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatorTitle: {
    /*  backgroundColor:'pink', */
    flex: 3,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  share: {
    /*  backgroundColor:'yellow', */
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SubHeader: {
    /*  backgroundColor:'red', */
    flex: 1.3,
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 3,
    borderStyle: 'dashed',
  },
  Info: {
    flex: 4,
    /*  backgroundColor:'blue', */
    paddingHorizontal: 20,
  },
  footerLeft: {
    justifyContent: 'center',
  },
  footerRight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 0.7,
    backgroundColor: '#f8fafa',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#e1e2e2',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    marginLeft: '5%',
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
