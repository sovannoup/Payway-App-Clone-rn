/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import NavigationService from '../Service/navigationService';
import {NAV_TYPES} from '../Navigation/navTypes';
export default class Logout extends Component {
  constructor(prop) {
    super(prop);
    this.state = {};
  }
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '800',
            marginTop: '50%',
            textAlign: 'center',
          }}>
          You sure you wanna logout?
        </Text>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
  },
});
