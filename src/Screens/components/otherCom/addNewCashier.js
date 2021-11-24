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
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

export default class AddNewCashier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      isEnabled: false,
      setIsEnabled: false,
    };
  }
  onToggleSwitch = () => {
    this.setState({setIsSwitchOn: isSwitchOn});
  };
  render() {
    const {modalVisible, isSwitchOn, setIsSwitchOn} = this.state;
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
            <Text style={styles.headerText}>Add New Cashier</Text>
          </View>
        </View>
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.profile}>
              <View style={styles.pic}>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    opacity: 0.8,
                    width: '100%',
                    height: 30,
                    backgroundColor: '#2477B2',
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <IconM name="camera" style={{color: 'white', fontSize: 25}} />
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: 25,
                    textAlign: 'center',
                    color: 'gray',
                  }}>
                  Tap here to upload photo
                </Text>
              </View>
            </View>
            <Text style={{fontSize: 17, fontWeight: 'bold'}}>
              Cashier Detail
            </Text>
            <View style={styles.input}>
              <IconFs
                style={{fontSize: 20, marginLeft: 15, color: 'gray'}}
                name="user-alt"
              />
              <TextInput
                style={{paddingLeft: 15, padding: 0}}
                placeholder="First name"
              />
            </View>

            <View style={styles.input}>
              <IconFs
                style={{fontSize: 20, marginLeft: 15, color: 'gray'}}
                name="user-alt"
              />
              <TextInput
                style={{paddingLeft: 15, padding: 0}}
                placeholder="Last name"
              />
            </View>

            <View style={styles.input}>
              <IconFs
                style={{fontSize: 20, marginLeft: 15, color: 'gray'}}
                name="address-card"
              />
              <TextInput
                style={{paddingLeft: 15, padding: 0}}
                placeholder="Nationsl ID (Optional)"
              />
            </View>

            <View style={styles.input}>
              <IconFs
                style={{fontSize: 20, marginLeft: 15, color: 'gray'}}
                name="phone-alt"
              />
              <TextInput
                keyboardType="numeric"
                style={{paddingLeft: 15, padding: 0}}
                placeholder="Phone number"
              />
            </View>
            <Text style={{fontSize: 17, fontWeight: 'bold', marginTop: 20}}>
              Linked Outlets
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 15,
              }}>
              <IconFs
                style={{fontSize: 17, color: 'gray', marginRight: 15}}
                name="store"
              />
              <Text>mane By M.DEOUN</Text>
            </View>

            <Text style={{fontSize: 17, fontWeight: 'bold', marginTop: 20}}>
              Permission
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 15,
                marginBottom: 50,
              }}>
              <Text>transactions refund</Text>
              <Switch
                style={{position: 'absolute', right: 0}}
                trackColor={{false: '#767577', true: '#81b0ff'}}
                value={isSwitchOn}
                onValueChange={this.onToggleSwitch}
              />
            </View>
          </ScrollView>
          <View
            style={{
              height: 90,
              width: 100000,
              position: 'absolute',
              bottom: 0,
              borderTopWidth: 0.7,
              borderColor: 'gray',
              backgroundColor: 'white',
            }}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 50,
              backgroundColor: 'red',
              marginBottom: 20,
              borderRadius: 5,
            }}>
            <Text style={{color: 'white'}}>Save</Text>
          </View>
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
    paddingHorizontal: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    marginLeft: '5%',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  pic: {
    width: 120,
    height: 120,
    /* flex:1, */
    borderRadius: 1000,
    borderWidth: 5,
    borderColor: '#2477B2',
    overflow: 'hidden',
  },
  profile: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
