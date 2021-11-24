import React, {Component, useState} from 'react';
import {
  TextInput,
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
/* import {  } from 'react-native-paper'; */

export default class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      showBTN: false,
      newUsername: '',
      password: '',
    };
  }
  onFocus() {
    this.setState({
      borderColor: 'blue',
    });
  }

  UNSAFE_componentWillReceiveProps(nextProp) {
    const {user} = this.props;

    if (
      nextProp.user.errorMessage &&
      nextProp.user.errorMessage !== user.errorMessage
    ) {
      console.log('change username ', nextProps.useState.errorMessage.message);
      if (nextProp.user.errorMessage.message === 'wrong password') {
        alert('Wrong Password');
      }
    }
  }

  ResetUsername() {
    data = {
      newUsername: this.state.newUsername,
      password: this.state.password,
    };
    this.props.f_reset_username(data);
  }
  render() {
    /*      const [isEnabled, setIsEnabled] = useState(false);
        const toggleSwitch = () => setIsEnabled(previousState => !previousState); */
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#2477B2',
        }}>
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
            <Text style={styles.headerText}>Reset Userneme</Text>
          </View>
        </View>
        <View style={styles.content}>
          <ScrollView>
            <View style={styles.lockHeader}>
              {/*  <IconFo style={{fontSize:55,color:'#2477B2'}} name="user"/> */}
              <View
                style={{
                  width: 80,
                  height: 80,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderWidth: 8,
                    borderColor: '#2477B2',
                    borderRadius: 200,
                    position: 'absolute',
                    top: 0,
                  }}
                />
                <View
                  style={{
                    width: 60,
                    height: 38,
                    backgroundColor: '#2477B2',
                    borderTopLeftRadius: 200,
                    borderTopRightRadius: 200,
                    borderBottomLeftRadius: 90,
                    borderBottomRightRadius: 90,
                    position: 'absolute',
                    bottom: 10,
                    elevation: 6,
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 17,
                  marginTop: '3%',
                }}>
                Reset Username
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10%',
              }}>
              <TextInput
                outlineColor="none"
                onFocus={() => this.onFocus()}
                style={{
                  width: '90%',
                  height: 50,
                  backgroundColor: 'white',
                  padding: 0,
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingLeft: 50,
                }}
                mode="outlined"
                label="Enter new password"
                placeholder="Enter new Username"
                onChangeText={text => {
                  var num = /^[0-9]+$/;
                  var Unum = /^[0-9]*$/;
                  var title = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
                  var space = /^\S*$/;
                  var spac = /\S.*$/;
                  var specail = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
                  if (
                    text.length >= 5 &&
                    text.length <=
                      18 /* && text.match(num) */ /*  && text.match(title) */
                  ) {
                    this.setState({
                      validatDigit: true,
                      newUsername: text,
                    });
                  }
                  if (text.length < 5 || text.length > 18) {
                    this.setState({
                      showInput: false,
                    });
                    /* this.setState({DvalidatDigit:true}); */
                    this.setState({
                      validatDigit: false,
                    });
                  }
                  if (!text.match(title)) {
                    this.setState({
                      validatCharacters: true,
                    });
                  }
                  if (text.match(title)) {
                    this.setState({
                      validatCharacters: false,
                    });
                  }
                  if (
                    text.length >= 5 &&
                    text.length <= 18 &&
                    !text.match(title) &&
                    text.match(space)
                  ) {
                    this.setState({
                      showInput: true,
                    });
                  }
                  if (
                    text.length < 5 ||
                    text.length > 18 ||
                    text.match(title) ||
                    !text.match(space)
                  ) {
                    this.setState({
                      showInput: false,
                    });
                  }
                  if (
                    text.length >= 5 &&
                    text.length <= 18 &&
                    !text.match(title) &&
                    text.match(space)
                  ) {
                    this.setState({true: true});
                  }
                  if (text.match(space)) {
                    this.setState({
                      DvalidatSpace: true,
                    });
                    this.setState({
                      validatSpace: false,
                    });
                  } else {
                    this.setState({
                      validatSpace: true,
                    });
                    this.setState({
                      DvalidatSpace: false,
                    });
                  }
                }}
              />
              <IconFs style={styles.iconUser} name="user-alt" />
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
                    style={{
                      color: 'gray',
                      marginRight: 10,
                    }}
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
                    style={{
                      color: 'gray',
                      marginRight: 10,
                    }}
                    name="checkcircle"
                  />
                  <Text style={{color: 'gray'}}>
                    Must not have specail characters
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <IconA
                    style={{
                      color: 'gray',
                      marginRight: 10,
                    }}
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
                      style={{
                        color: '#2477B2',
                        marginRight: 10,
                      }}
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
                      style={{
                        color: '#2477B2',
                        marginRight: 10,
                      }}
                      name="checkcircle"
                    />
                    <Text style={{color: '#2477B2'}}>
                      Must not have specail characters
                    </Text>
                  </View>
                ) : null}
                {this.state.validatSpace ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 5,
                      position: 'absolute',
                      top: 58,
                      left: '10%',
                    }}>
                    <IconA
                      style={{
                        color: 'gray',
                        marginRight: 10,
                      }}
                      name="checkcircle"
                    />
                    <Text style={{color: 'gray'}}>Must not have space</Text>
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
                      style={{
                        color: '#2477B2',
                        marginRight: 10,
                      }}
                      name="checkcircle"
                    />
                    <Text style={{color: '#2477B2'}}>Must not have space</Text>
                  </View>
                ) : null}
              </View>

              {this.state.showInput ? (
                <View
                  style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: 150,
                    paddingTop: 25,
                    alignItems: 'center',
                    position: 'absolute',
                    top: 60,
                    alignItems: 'center',
                  }}>
                  {this.state.trueCom ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5,
                        position: 'absolute',
                        top: '30%',
                        right: '8%',
                      }}>
                      <IconA
                        style={{
                          color: '#2477B2',
                          marginRight: 10,
                          fontSize: 17,
                        }}
                        name="checkcircle"
                      />
                    </View>
                  ) : null}

                  <TextInput
                    mode="outlined"
                    label="pass"
                    style={{
                      width: '90%',
                      height: 50,
                      padding: 0,
                      borderWidth: 1,
                      borderRadius: 5,
                      paddingLeft: 50,
                    }}
                    placeholder="Enter Account Password"
                    onChangeText={textCom => {
                      if (textCom.length > 0) {
                        this.setState({
                          password: textCom,
                        });
                        this.setState({
                          showBTN: true,
                        });
                        this.setState({
                          trueCom: true,
                        });
                      } else {
                        this.setState({
                          showBTN: false,
                        });
                        this.setState({
                          trueCom: false,
                        });
                      }
                    }}
                  />
                  <IconFs style={styles.iconUser1} name="user-alt" />
                </View>
              ) : null}
              {this.state.true ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                    position: 'absolute',
                    top: '8%',
                    right: '8%',
                  }}>
                  <IconA
                    style={{
                      color: '#2477B2',
                      marginRight: 10,
                      fontSize: 17,
                    }}
                    name="checkcircle"
                  />
                </View>
              ) : null}
            </View>
          </ScrollView>
          <TouchableOpacity
            disabled={this.state.showBTN == true ? 0 : 1}
            style={styles.footer}
            onPress={() => this.ResetUsername()}>
            <View
              style={
                this.state.showBTN == false
                  ? styles.feedback
                  : [
                      styles.feedback,
                      {
                        backgroundColor: '#2477B2',
                      },
                    ]
              }>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Continue
              </Text>
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
  iconUser: {
    fontSize: 20,
    position: 'absolute',
    top: 13,
    left: 35,
    color: 'gray',
  },
  iconUser1: {
    fontSize: 20,
    position: 'absolute',
    top: 37,
    left: 35,
    color: 'gray',
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
    marginTop: 30,
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
    borderTopWidth: 1,
    paddingTop: 10,
    borderColor: '#e8e8e8',
    width: '100%',
    height: 80,
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
