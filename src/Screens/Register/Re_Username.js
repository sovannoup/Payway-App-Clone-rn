/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationService from '../../Service/navigationService';
import {NAV_TYPES} from '../../Navigation/navTypes';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputGB from '../components/smallComponent/InputGB';
export default class Re_Username extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      username: '',
      first: '#cccccc',
      second: '#cccccc',
      showBtn: true,
    };
  }

  async UNSAFE_componentWillReceiveProps(nextProp) {
    const {user} = this.props;
    if (
      nextProp.user.result_username &&
      nextProp.user.result_username !== user.result_username
    ) {
      if (nextProp.user.result_username.message === 'success') {
        // await AsyncStorage.setItem('username', this.state.username);
        await AsyncStorage.setItem('savedAcc', this.state.username);
        NavigationService.navigate(NAV_TYPES.RE_PASS);
      }
    }
  }
  verifyUsername() {
    if (this.state.username) {
      this.props.f_username_verify({
        username: this.state.username,
      });
    }
  }
  render() {
    const {first, second, showBtn} = this.state;
    return (
      <>
        <StatusBar backgroundColor="#2477B2" />
        <View style={styles.regisCon}>
          <TouchableOpacity onPress={() => NavigationService.goBack()}>
            <Icon name="arrow-left" style={styles.regisArrow} />
          </TouchableOpacity>
          <Text style={styles.regisText}>REGISTRATION</Text>
        </View>
        <ScrollView style={styles.reCode}>
          <View style={styles.userInfo}>
            <FontAwesome name="user" style={styles.people} />
            <Text style={styles.headerTxt}>Create Username</Text>
          </View>
          <View style={styles.userInput}>
            <InputGB
              holder="Username"
              type="Ionicons"
              className="md-people-circle-outline"
              iconstyle={{fontSize: 35, marginTop: -5, marginLeft: -5}}
              onChangeText={text => {
                var temp = text;
                var num = /^[0-9]+$/;
                var space = /^\S*$/;
                if (temp.length >= 5 && temp.length <= 20) {
                  this.setState({first: '#2477B2'});
                } else {
                  this.setState({first: '#cccccc'});
                }
                if (temp.match(space) && temp.length <= 20) {
                  this.setState({
                    username: temp,
                    second: '#2477B2',
                  });
                }
                if (
                  temp.length >= 5 &&
                  temp.length <= 20 &&
                  temp.match(space)
                ) {
                  this.setState({showBtn: false});
                } else {
                  this.setState({showBtn: true});
                }
              }}
              value={this.state.username}
            />
            <View style={{margin: 20}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  marginVertical: 5,
                }}>
                <BouncyCheckbox
                  style={styles.bCheckBox}
                  isChecked={true}
                  size={15}
                  fillColor={first}
                  unfillColor="#f0f0f0"
                  iconStyle={{
                    borderColor: '#cccccc',
                  }}
                />
                <Text
                  style={{
                    fontSize: 13,
                    color: 'gray',
                  }}>
                  Must have 5 - 20 characters
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginHorizontal: 20,
                  marginVertical: 5,
                }}>
                <BouncyCheckbox
                  style={styles.bCheckBox}
                  isChecked={true}
                  size={15}
                  fillColor={second}
                  unfillColor="#f0f0f0"
                  iconStyle={{
                    borderColor: '#cccccc',
                  }}
                />
                <Text
                  style={{
                    fontSize: 13,
                    color: 'gray',
                  }}>
                  Must not have spaces
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            disabled={showBtn}
            style={[showBtn ? styles.conBtnDisable : styles.conBtn]}
            onPress={() => this.verifyUsername()}>
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
    fontSize: 18,
    fontWeight: '500',
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
    color: '#2477B2',
    marginBottom: '5%',
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: '600',
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
