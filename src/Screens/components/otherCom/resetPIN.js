import React, {Component, useState} from 'react';
import {
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
import IconFs from 'react-native-vector-icons/FontAwesome5';
import IconFo from 'react-native-vector-icons/Fontisto';
import {TouchableRipple} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import navigationService from '../../../Service/navigationService';
import {NAV_TYPES} from '../../../Navigation/navTypes';
import InputGB from '../../../Screens/components/smallComponent/InputGB';

export default class ResetPin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      password: '',
      newPin: '',
      showBTN: false,
      confirmPin: '',
    };
  }

  UNSAFE_componentWillReceiveProps(nextProp) {
    const {user} = this.props;

    if (
      nextProp.user.result_resetPin &&
      nextProp.user.result_resetPin !== user.result_resetPin
    ) {
      if (nextProp.user.result_resetPin.message === 'success') {
        alert('Pin Reset Successfully');
        navigationService.navigate(NAV_TYPES.SETTING);
      }
    }
  }
  startResetPin() {
    const data = {
      password: this.state.password,
      newPin: this.state.newPin,
    };
    this.props.f_reset_pin(data);
  }

  render() {
    /*      const [isEnabled, setIsEnabled] = useState(false);
        const toggleSwitch = () => setIsEnabled(previousState => !previousState); */
    const {password, newPin} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#2477B2'}}>
        <View style={{height: 80}}>
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
            <Text style={styles.headerText}>RESET PIN</Text>
          </View>
        </View>
        <View style={styles.content}>
          <ScrollView>
            <View style={styles.lockHeader}>
              <IconFo style={{fontSize: 55, color: '#2477B2'}} name="locked" />
              <Text style={{fontSize: 17, marginTop: '3%'}}>
                Reset Your Pin to Secure Your Account
              </Text>
            </View>
            <View
              style={{
                width: '90%',
                marginHorizontal: '5%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10%',
              }}>
              {/* Input Old Password */}
              <InputGB
                laberStyle={{backgroundColor: 'white'}}
                holder="Enter Password"
                secureText={true}
                type="Fontisto"
                className="locked"
                onChangeText={text => {
                  this.setState({password: text});
                  if (
                    text.length !== 0 &&
                    this.state.confirmPin &&
                    this.state.confirmPin === this.state.newPin
                  ) {
                    this.setState({showBTN: true});
                  } else {
                    this.setState({showBTN: false});
                  }
                }}
                value={this.state.password}
              />
              <InputGB
                laberStyle={{backgroundColor: 'white'}}
                holder="Enter Pin"
                type="MaterialIcons"
                className="fiber-pin"
                onChangeText={text => {
                  let num = text.replace('.', '');
                  if (isNaN(num)) {
                    alert('Only Number Allowed');
                  }
                  if (num.length == 4) {
                    this.setState({
                      validatDigit: true,
                      showInput: true,
                      newPin: text,
                    });
                  } else if (num.length < 5) {
                    this.setState({
                      newPin: text,
                      validatDigit: false,
                      showInput: false,
                    });
                  }
                }}
                value={this.state.newPin}
              />
              {this.state.showInput ? (
                <View
                  style={{
                    backgroundColor: 'white',
                    width: '100%',
                    marginVertical: 10,
                    alignItems: 'center',
                  }}>
                  <InputGB
                    laberStyle={{backgroundColor: 'white'}}
                    holder="Confirm Pin"
                    type="MaterialIcons"
                    className="fiber-pin"
                    onChangeText={text => {
                      let num = text.replace('.', '');
                      if (isNaN(num)) {
                        alert('Only Number Allowed');
                      } else if (num.length <= 4) {
                        this.setState({confirmPin: num});
                        if (
                          num === this.state.newPin &&
                          this.state.password.length !== 0
                        ) {
                          this.setState({
                            showBTN: true,
                          });
                        } else {
                          this.setState({showBTN: false});
                        }
                      } else {
                        this.setState({showBTN: false});
                      }
                    }}
                    value={this.state.confirmPin}
                  />
                </View>
              ) : null}
              <View style={styles.validation}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <IconA
                    style={{color: 'gray', marginRight: 10}}
                    name="checkcircle"
                  />
                  <Text style={{color: 'gray'}}>
                    Must have 4 digit pins only
                  </Text>
                </View>

                {this.state.validatDigit ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5,
                      position: 'absolute',
                      top: 0,
                      left: '10%',
                    }}>
                    <IconA
                      style={{color: '#2477B2', marginRight: 10}}
                      name="checkcircle"
                    />
                    <Text style={{color: '#2477B2'}}>
                      Must have 4 digit pins only
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            disabled={this.state.showBTN == true ? 0 : 1}
            onPress={() => this.startResetPin()}
            style={styles.footer}>
            <View
              style={
                this.state.showBTN == false
                  ? styles.feedback
                  : [styles.feedback, {backgroundColor: '#2477B2'}]
              }>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Continue</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  validation: {
    marginTop: 20,
    width: '100%',
    paddingLeft: ' 9%',
    /* backgroundColor:'red', */
  },
  lockHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
  },
  feedback: {
    flex: 1,
    marginVertical: '1.5%',
    borderRadius: 5,
    borderColor: '#01cdd4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '3%',
    flexDirection: 'row',
    backgroundColor: '#e8e8e8',
  },
  footer: {
    borderWidth: 1,
    paddingTop: 10,
    borderColor: '#e8e8e8',
    width: '100%',
    height: 80,
    bottom: 0,
    paddingHorizontal: '4%',
    paddingBottom: '2%',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    marginLeft: '5%',
    fontWeight: 'bold',
  },
});
