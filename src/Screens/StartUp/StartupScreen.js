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
import NavigationService from '../../Service/navigationService';
import {NAV_TYPES} from '../../Navigation/navTypes';
export default class Startup extends Component {
  constructor(prop) {
    super(prop);
    this.state = {};
  }
  componentDidMount() {
    this.props.startupWorker();
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
          This is start up screen
        </Text>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  innerAction: {
    color: 'green',
  },
  newAccText: {
    fontSize: 15,
  },
});
