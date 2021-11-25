import React, {Component} from 'react';
import {
  FlatList,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Pressable,
} from 'react-native';
import NavigationService from '../../Service/navigationService';
import {NAV_TYPES} from '../../Navigation/navTypes';
import Icon from 'react-native-vector-icons/Feather';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {SwipeablePanel} from 'rn-swipeable-panel';
import {SafeAreaView} from 'react-navigation';
import {ScrollView} from 'react-native-gesture-handler';
import CheckBox from '@empglabs/react-native-check-box';
import {first} from 'lodash';

export default class FtCode extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      Page: '',
      phonenumber: '',
      first: false,
      second: false,
      third: false,
    };
  }
  componentDidMount() {
    const {navigation} = this.props;
    const {Page} = this.state;
    var infoPage = navigation.getParam('page', false);
    this.setState({Page: infoPage});
  }
  UNSAFE_componentWillReceiveProps(nextProp) {
    const {user} = this.props;

    // if(nextProp.user.verify_ph && nextProp.user.verify_ph !== user.verify_ph){
    //     NavigationService.navigate(NAV_TYPES.)
    // }
  }
  verifyphone = () => {
    if (this.state.phonenumber.length > 8) {
      this.setState({Page: 'confirmPhone'});
      this.props.f_phone_verify({
        phonenumber: this.state.phonenumber,
      });
    }
  };
  checkFirst() {
    const {first, second, third} = this.state;
    this.setState({first: !first});
    if (!first && second) {
      this.setState({third: true});
    } else {
      this.setState({third: false});
    }
  }
  checkSecond() {
    const {first, second, third} = this.state;
    this.setState({second: !second});
    if (first && !second) {
      this.setState({third: true});
    } else {
      this.setState({third: false});
    }
  }
  clickThird() {
    const {first, second, third} = this.state;
    this.setState({third: !third});
    if (!third) {
      this.setState({first: true, second: true});
    } else {
      this.setState({
        first: false,
        second: false,
      });
    }
  }

  render() {
    const {Page, first, second, third} = this.state;
    return (
      <View style={styles.container}>
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
        {Page == 'term' && (
          <>
            <ScrollView style={styles.body}>
              <View style={styles.genCon}>
                <Text style={styles.genHeadText}>
                  General Terms & Conditions and Merchant Agreement
                </Text>
                <Text style={styles.text}>
                  It is very important that you read and accept these Terms and
                  Conditions before you activate and start using PayWay Mobile.
                </Text>
              </View>
              <View style={styles.userAccept}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginVertical: 7,
                  }}>
                  <CheckBox
                    style={{paddingRight: 15}}
                    onClick={() => {
                      this.checkFirst();
                    }}
                    checkedCheckBoxColor={'#2477B2'}
                    isChecked={this.state.first}
                  />
                  <Text style={styles.iHave}>
                    I have read and accept the{' '}
                    <Text style={styles.terms}>
                      Amatak Pay General Terms & Conditions.
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginVertical: 7,
                  }}>
                  <CheckBox
                    style={{paddingRight: 15}}
                    onClick={() => {
                      this.checkSecond();
                    }}
                    checkedCheckBoxColor={'#2477B2'}
                    isChecked={this.state.second}
                  />
                  <Text style={styles.iHave}>
                    I have read and accept the{' '}
                    <Text style={styles.terms}>
                      Amatak Pay Mobile Merchant Agreement.
                    </Text>
                  </Text>
                </View>

                <Text style={styles.line}>
                  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  - - - - - - -
                </Text>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginVertical: 7,
                  }}>
                  <CheckBox
                    style={{paddingRight: 15}}
                    onClick={() => {
                      this.clickThird();
                    }}
                    checkedCheckBoxColor={'#2477B2'}
                    isChecked={this.state.third}
                  />
                  <Text style={styles.iHave}>I agree to all of the above.</Text>
                </View>
              </View>
            </ScrollView>
            <View style={styles.footer}>
              <TouchableOpacity
                disabled={!third}
                style={[!third ? styles.conBtnDisable : styles.conBtn]}
                onPress={() => NavigationService.navigate(NAV_TYPES.RE_PAYACC)}>
                <Text style={styles.conBtnTxt}>Continue</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  body: {
    width: '90%',
    marginHorizontal: '5%',
  },
  genCon: {
    width: '100%',
  },
  genHeadText: {
    color: '#3b3b3b',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
    paddingVertical: 20,
  },
  text: {
    color: '#3b3b3b',
    fontSize: 16,
    lineHeight: 25,
  },
  bCon: {
    paddingTop: '32%',
    // paddingBottom: '1%',
  },
  bSubCon: {
    flexDirection: 'row',
  },
  btickUrl: {
    color: '#454545',
    fontWeight: '700',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  contiCon: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderColor: '#f0f0f0',
    borderTopWidth: 1,
  },
  contiButton: {
    backgroundColor: '#e0e0e0',
    margin: '3.5%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  contiText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // Term and Accept
  userAccept: {
    marginTop: '30%',
  },
  bCheckBox: {
    flexWrap: 'wrap',
  },
  iHave: {
    fontSize: 15,
    lineHeight: 22,
    marginRight: '10%',
  },
  terms: {
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#2477B2',
  },
  line: {
    color: '#cccccc',
    fontSize: 18,
    marginVertical: 7,
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

  //footer
  footer: {
    bottom: 0,
    width: '100%',
    borderTopWidth: 0.2,
    borderTopColor: '#cccccc',
  },

  //code Page
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
  verifiedInput: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  verifiedCode: {
    textAlign: 'center',
    width: 40,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    fontSize: 15,
    marginHorizontal: 5,
  },
});
