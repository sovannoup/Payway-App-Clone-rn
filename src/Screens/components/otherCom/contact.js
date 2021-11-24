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
import NavigationService from '../../../Service/navigationService';
import {NAV_TYPES} from '../../../Navigation/navTypes';
import IconE from 'react-native-vector-icons/Entypo';
import IconFo from 'react-native-vector-icons/Foundation';
import {SwipeablePanel} from 'rn-swipeable-panel';
import {TouchableRipple} from 'react-native-paper';
import {TextInput} from 'react-native-gesture-handler';
import InputGB from '../smallComponent/InputGB';

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFeedback: false,
      feedbackText: '',
    };
  }
  render() {
    const {isFeedback, feedbackText} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#2477B2'}}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={() => NavigationService.goBack()}>
            <IconA
              name="arrowleft"
              style={{
                fontSize: 25,
                color: 'white',
                marginLeft: '3%',
                marginTop: '2%',
              }}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerText}>Contact Us</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.footer}>
            <Text style={{fontSize: 18, fontWeight: '700', marginVertical: 20}}>
              Help
            </Text>
            <TouchableRipple
              onPress={() => console.log('Pressed')}
              style={styles.chart}
              rippleColor="#2477B2">
              <View style={{flexDirection: 'row'}}>
                <IconA
                  style={{fontSize: 19, color: '#2477B2'}}
                  name="message1"
                />
                <Text
                  style={{
                    color: '#2477B2',
                    marginLeft: 15,
                    fontWeight: 'bold',
                  }}>
                  Connect on messenger
                </Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => console.log('Pressed')}
              style={styles.call}
              rippleColor="#2477B2">
              <View style={{flexDirection: 'row'}}>
                <IconFs
                  style={{fontSize: 19, color: '#2477B2'}}
                  name="headset"
                />
                <Text
                  style={{
                    color: '#2477B2',
                    marginLeft: 15,
                    fontWeight: 'bold',
                  }}>
                  Call Hotline
                </Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              onPress={() => console.log('Pressed')}
              style={styles.feedback}
              rippleColor="#3392d6">
              <View style={{flexDirection: 'row'}}>
                <IconFo
                  style={{fontSize: 23, color: '#2477B2'}}
                  name="clipboard-notes"
                />
                <Text
                  style={{
                    color: '#2477B2',
                    marginLeft: 20,
                    fontWeight: 'bold',
                  }}>
                  Leave FeedBack
                </Text>
              </View>
            </TouchableRipple>
          </View>
          <View style={{marginTop: 80, width: '100%', paddingHorizontal: '5%'}}>
            <Text style={{fontSize: 18, fontWeight: '700', marginBottom: 15}}>
              About
            </Text>
            <TouchableRipple
              onPress={() => console.log('hi')}
              rippleColor="#2477B2"
              style={{
                marginLeft: '3%',
                paddingVertical: 15,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <IconFo
                  style={{fontSize: 30, color: '#2477B2', opacity: 0.9}}
                  name="clipboard-notes"
                />
                <Text
                  style={{
                    color: '#2477B2',
                    marginLeft: '5%',
                    fontWeight: 'bold',
                  }}>
                  Terms & Conditions
                </Text>
              </View>
            </TouchableRipple>
            <TouchableRipple
              rippleColor="#2477B2"
              onPress={() => console.log('hi')}
              style={{
                marginLeft: '3%',
                paddingVertical: 15,
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <IconFo
                  style={{fontSize: 30, color: '#2477B2', opacity: 0.9}}
                  name="clipboard-notes"
                />
                <Text
                  style={{
                    color: '#2477B2',
                    marginLeft: '5%',
                    fontWeight: 'bold',
                  }}>
                  Terms & Conditions
                </Text>
              </View>
            </TouchableRipple>
          </View>
        </View>
        <SwipeablePanel
          closeOnTouchOutside={true}
          isActive={isFeedback}
          onClose={() => this.setState({isFeedback: false})}
          onlyLarge={true}
          fullWidth={true}
          style={{height: 350}}>
          <View style={{flex: 1, width: '90%', marginHorizontal: '5%'}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                marginTop: 15,
                marginBottom: 30,
              }}>
              Feedback
            </Text>
            <View>
              <InputGB
                type="Foundation"
                laberStyle={{backgroundColor: 'white'}}
                iconstyle={{top: 0, marginTop: 18}}
                styleInput={{paddingBottom: 60, fontSize: 16}}
                onChangeText={value => {
                  if (value.length < 500) {
                    this.setState({feedbackText: value});
                  }
                }}
                value={feedbackText}
                className="clipboard-notes"
                holder="Tell us about your experience"
              />
              <Text
                style={{
                  color: 'gray',
                  textAlign: 'right',
                  marginRight: 20,
                }}>
                {feedbackText.length} / 500
              </Text>
            </View>
            <TouchableRipple
              rippleColor="#2477B2"
              onPress={() => {
                alert('Thanks for your feedback.'),
                  this.setState({isFeedback: false});
              }}
              style={[
                feedbackText.length > 0 ? styles.BtnDisable : styles.Btn,
              ]}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Submit
              </Text>
            </TouchableRipple>
          </View>
        </SwipeablePanel>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    flex: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  chart: {
    paddingVertical: 10,
    marginVertical: '1.5%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#2477B2',
    alignItems: 'center',
    paddingLeft: '4%',
    flexDirection: 'row',
  },
  call: {
    paddingVertical: 10,
    marginVertical: '1.5%',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#2477B2',
    alignItems: 'center',
    paddingLeft: '4%',
    flexDirection: 'row',
  },
  feedback: {
    paddingVertical: 10,
    borderWidth: 2,
    marginVertical: '1.5%',
    borderRadius: 5,
    borderColor: '#2477B2',
    alignItems: 'center',
    paddingLeft: '4%',
    flexDirection: 'row',
  },
  footer: {
    width: '100%',
    height: '26%',
    // bottom: 0,
    paddingHorizontal: '4%',
    paddingBottom: '5%',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    marginLeft: '5%',
    fontWeight: 'bold',
  },
  Btn: {
    backgroundColor: '#eeeeee',
    width: '100%',
    marginTop: 25,
    paddingVertical: 15,
    borderRadius: 5,
  },
  BtnDisable: {
    backgroundColor: '#2477B2',
    width: '100%',
    marginTop: 25,
    paddingVertical: 15,
    borderRadius: 5,
  },
});
