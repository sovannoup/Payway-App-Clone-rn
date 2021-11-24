import React, {Component, useState} from 'react';
import {
  ImageBackground,
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
import IconI from 'react-native-vector-icons/Ionicons';
import {TouchableRipple} from 'react-native-paper';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

export default class AddNewOutlet extends Component {
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
    const image = {
      uri:
        'https://cdn1.vectorstock.com/i/1000x1000/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg',
    };
    const {modalVisible, isSwitchOn, setIsSwitchOn} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#2477B2'}}>
        <View style={{flex: 2}}>
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
            <Text style={styles.headerText}>Add New Outlet</Text>
          </View>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.input}>
              <IconFs
                style={{fontSize: 20, marginLeft: 15, color: 'gray'}}
                name="store"
              />
              <TextInput
                style={{paddingLeft: 15, padding: 0}}
                placeholder="mane by M.DEOUN"
              />
            </View>

            <View style={styles.input}>
              <IconFs
                style={{fontSize: 20, marginLeft: 15, color: 'gray'}}
                name="building"
              />
              <TextInput
                style={{paddingLeft: 15, padding: 0}}
                placeholder="Oult city / province"
              />
            </View>

            <View style={styles.input}>
              <IconI
                style={{fontSize: 25, marginLeft: 15, color: 'gray'}}
                name="ios-location"
              />
              <TextInput
                style={{paddingLeft: 15, padding: 0}}
                placeholder="Outlet address"
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 15,
                marginBottom: 50,
              }}>
              <Text>transactions redund</Text>
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
              backgroundColor: '#ececec',
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
    flex: 4,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
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
});
