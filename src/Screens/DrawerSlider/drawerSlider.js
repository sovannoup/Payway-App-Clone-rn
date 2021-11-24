/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import NavigationService from '../../Service/navigationService';
import {NAV_TYPES} from '../../Navigation/navTypes';
import BottomPopup from '../../Screens/components/BottomPopup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class drawer extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      menuData: [],
      loading: false,
      width: '',
      height: '',
    };
  }

  USER = [
    {
      icon: (
        <Ionicons name="ios-sync-circle" size={25} style={styles.drawerIcon} />
      ),
      name: 'Transaction History',
      screenName: NAV_TYPES.MAIN_TRANS,
      key: 1,
      active: true,
    },
    {
      icon: (
        <MaterialIcons
          name="business-center"
          size={25}
          style={styles.drawerIcon}
        />
      ),
      name: 'Manage Business',
      screenName: NAV_TYPES.MAIN_MANAGE,
      key: 2,
    },
    {
      icon: (
        <Ionicons
          name="md-settings-sharp"
          size={25}
          style={styles.drawerIcon}
        />
      ),
      name: 'Settings',
      screenName: NAV_TYPES.MAIN_SETTING,
      key: 3,
    },
    {
      icon: <FontAwesome name="home" size={25} style={styles.drawerIcon} />,
      name: 'Help & Feedback',
      screenName: NAV_TYPES.CONTACT,
      key: 4,
    },
    {
      icon: (
        <MaterialCommunityIcons
          name="logout"
          size={25}
          style={styles.drawerIcon}
        />
      ),
      name: 'Logout',
      screenName: 'logout',
      key: 5,
    },
  ];

  getData = async () => {
    const dataUser = JSON.parse(await AsyncStorage.getItem('@loginToken'));
    if (dataUser !== null) {
      this.setState({
        menuData: USER,
      });
    }
  };

  ItemSeparatorComponent = () => {
    return (
      <View
        style={{
          marginVertical: 13,
        }}
      />
    );
  };

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => this.handleDrawerPressed(item.screenName)}
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        {item.icon}
        <Text style={{fontSize: 16, color: 'white'}}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  handleDrawerPressed = screenName => {
    if (screenName === 'logout') {
      this.logoutConfirmAlert();
    } else {
      NavigationService.navigate(screenName);
    }
  };

  logoutConfirmAlert = () =>
    Alert.alert('LOGOUT CONFIRM', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => this.ok_logout(),
      },
    ]);
  ok_logout = async () => {
    try {
      await AsyncStorage.removeItem('@loginToken');
      NavigationService.reset(NAV_TYPES.INTRO);
      // this.props.startupWorker()
    } catch (error) {}
  };

  render() {
    const {menuData, loading} = this.state;
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#2477B2', '#1758A1', '#104797']}
          style={{height: '100%'}}>
          {/* Loading Indicator */}
          {loading && (
            <View
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(52,52,52,0.8)',
                zIndex: 9999,
              }}>
              <ActivityIndicator size="small" color="white" />
            </View>
          )}
          <View style={styles.body}>
            {/* Body */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => NavigationService.navigate(NAV_TYPES.SETTING)}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  marginLeft: 10,
                }}>
                <View style={styles.uploadPhoto}>
                  <Image
                    source={require('../../Assets/Images/pfPic.png')}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 60 / 2,
                      borderWidth: 1,
                      borderColor: 'white',
                    }}
                  />
                </View>
                <View style={{marginLeft: 15}}>
                  <Text
                    style={{
                      fontSize: 19,
                      fontWeight: '600',
                      marginBottom: 3,
                      color: 'white',
                    }}>
                    Dev Team xD
                  </Text>
                  <Text style={{color: 'white'}}>Your ID: 1588812</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Each Child */}
            <View
              style={{
                paddingHorizontal: '10%',
                paddingTop: '10%',
              }}>
              <FlatList
                data={this.USER}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={this.ItemSeparatorComponent}
              />
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '80%',
              marginHorizontal: '10%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Image
              style={styles.logo}
              resizeMode="contain"
              source={require('../../Assets/Images/logoAmatak.png')}
            />
            <Text
              style={{
                fontSize: 15,
                color: 'white',
                marginTop: 15,
              }}>
              V 1.0.0.0
            </Text>
          </View>
        </LinearGradient>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    // paddingTop: 70
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:"center",
    paddingLeft: 15,
    paddingVertical: 10,
  },
  menuItemText: {
    fontSize: 15,
    // margin: 15,
    marginHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 6 : 0,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  pageItemTo: {
    width: '100%',
    height: 50,
  },

  //header Drawer

  header: {
    paddingLeft: 20,
    marginTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingBottom: 20,
  },
  pfImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  uploadPhoto: {
    marginTop: '3%',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  drawerIcon: {
    color: 'white',
    marginRight: 15,
  },
  logo: {
    width: '30%',
  },
});
