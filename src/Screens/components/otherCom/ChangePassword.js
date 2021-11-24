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

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: true,
      oldPass: '',
      newPass: '',
      showBTN: true,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProp) {
    const {user} = this.props;

    if (nextProp.user.change_pw && nextProp.user.change_pw !== user.change_pw) {
      if (nextProp.user.change_pw.data.message === 'reset password success ') {
        alert('Password Changed Successfully');
        navigationService.navigate(NAV_TYPES.SETTING);
      }
    }
  }
  startChangePW() {
    const data = {
      password: '123456',
      newPassword: '123456',
    };
    this.props.f_change_pw(data);
  }

  render() {
    /*      const [isEnabled, setIsEnabled] = useState(false);
        const toggleSwitch = () => setIsEnabled(previousState => !previousState); */
    const {oldPass} = this.state;
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
            <Text style={styles.headerText}>Change Password</Text>
          </View>
        </View>
        <View style={styles.content}>
          <ScrollView>
            <View style={styles.lockHeader}>
              <IconFo style={{fontSize: 55, color: '#2477B2'}} name="locked" />
              <Text style={{fontSize: 17, marginTop: '3%'}}>
                Creat New Password
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10%',
              }}>
              {/* Input Old Password */}
              <TextInput
                style={{
                  width: '92%',
                  height: 50,
                  backgroundColor: 'white',
                  color: 'red',
                  marginVertical: 10,
                }}
                secureTextEntry={true}
                mode="outlined"
                label="Enter old password"
                onChangeText={text => {
                  this.setState({oldPass: text});
                }}
                left={
                  <TextInput.Icon
                    style={{marginTop: '60%', color: 'red'}}
                    name="lock"
                  />
                }
              />
              <TextInput
                style={{
                  width: '92%',
                  height: 50,
                  backgroundColor: 'white',
                  color: 'red',
                }}
                secureTextEntry={true}
                mode="outlined"
                label="Enter new password"
                onChangeText={text => {
                  var num = /^[0-9]+$/;
                  var title = /^(?=.*\d)(?=.*[a-zA-Z]).*$/;
                  var space = /^\S*$/;
                  if (
                    text.length >= 5 &&
                    text.length <=
                      18 /* && text.match(num) */ /*  && text.match(title) */
                  ) {
                    this.setState({validatDigit: true, newPass: text});
                  }
                  if (text.length < 5 || text.length > 18) {
                    this.setState({showInput: false});
                    /* this.setState({DvalidatDigit:true}); */
                    this.setState({validatDigit: false});
                  }
                  if (text.match(title)) {
                    this.setState({validatCharacters: true});
                  }
                  if (!text.match(title)) {
                    this.setState({validatCharacters: false});
                  }
                  if (
                    text.length >= 5 &&
                    text.length <= 18 &&
                    text.match(title) &&
                    text.match(space)
                  ) {
                    this.setState({showInput: true});
                  }
                  if (
                    text.length < 5 ||
                    text.length > 18 ||
                    text.match(num) ||
                    !text.match(space)
                  ) {
                    this.setState({showInput: false});
                  }
                  if (text.match(space) && text != '') {
                    this.setState({DvalidatSpace: true});
                  } else {
                    this.setState({DvalidatSpace: false});
                  }
                }}
                left={
                  <TextInput.Icon
                    style={{marginTop: '60%', color: 'red'}}
                    name="lock"
                  />
                }
              />
              {this.state.showInput ? (
                <View
                  style={{
                    backgroundColor: 'white',
                    width: '100%',
                    marginVertical: 10,
                    alignItems: 'center',
                  }}>
                  <TextInput
                    mode="outlined"
                    label="Confirm Password"
                    style={{
                      width: '92%',
                      height: 50,
                      backgroundColor: 'white',
                      color: 'red',
                    }}
                    onChangeText={textCom => {
                      if (
                        textCom.length > 0 &&
                        textCom == this.state.newPass &&
                        oldPass.length > 0
                      ) {
                        this.setState({showBTN: true});
                      } else {
                        this.setState({showBTN: false});
                      }
                    }}
                    left={
                      <TextInput.Icon
                        style={{marginTop: '60%', color: 'red'}}
                        name="lock"
                      />
                    }
                  />
                </View>
              ) : null}
              <View style={styles.validation}>
                {/* <View style={{flexDirection:'row',alignItems: 'center',marginVertical:5}}>
    <IconA style={{color:'gray',marginRight:10}}name="checkcircle"  /><Text style={{color:'gray'}}>Must have 5-18 characters</Text>
    </View> */}
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
                  <Text style={{color: 'gray'}}>Must have 5-18 characters</Text>
                </View>
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
                    Must have at least 1 number & 1 letter
                  </Text>
                </View>
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
                  <Text style={{color: 'gray'}}>Must not have space</Text>
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
                      Must have 5-18 characters
                    </Text>
                  </View>
                ) : null}

                {this.state.validatCharacters ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5,
                      position: 'absolute',
                      top: 29,
                      left: '10%',
                    }}>
                    <IconA
                      style={{color: '#2477B2', marginRight: 10}}
                      name="checkcircle"
                    />
                    <Text style={{color: '#2477B2'}}>
                      Must have at least 1 number & 1 letter
                    </Text>
                  </View>
                ) : null}

                {this.state.DvalidatSpace ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5,
                      position: 'absolute',
                      top: '66.6%',
                      left: '10%',
                    }}>
                    <IconA
                      style={{color: '#2477B2', marginRight: 10}}
                      name="checkcircle"
                    />
                    <Text style={{color: '#2477B2'}}>Must not have space</Text>
                  </View>
                ) : null}
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            disabled={this.state.showBTN == true ? 0 : 1}
            onPress={() => this.startChangePW()}
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
