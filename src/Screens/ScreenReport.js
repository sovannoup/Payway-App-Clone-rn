import React, {Component, createRef} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  TextInput,
} from 'react-native';
import NavigationService from '../Service/navigationService';
import {NAV_TYPES} from '../Navigation/navTypes';
import Icon from 'react-native-vector-icons/Feather';
import {SwipeablePanel} from 'rn-swipeable-panel';
import navigationService from '../Service/navigationService';

export default class Report extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      dateActive: false,
      CustomPd: false,
    };
  }
  render() {
    const {dateActive, CustomPd} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => NavigationService.goBack()}>
            <Icon name="arrow-left" style={styles.goBack} />
          </TouchableOpacity>
          <Text style={{fontSize: 20, color: 'white', fontWeight: '700'}}>
            TRANSACTION REPORT
          </Text>
          <View style={styles.desc}>
            <View style={styles.circle}>
              <Icon name="arrow-left" style={{fontSize: 30, color: 'white'}} />
            </View>
            <Text style={{color: 'white'}}>
              Here you can generate and download transaction reports for the
              selected period.
            </Text>
          </View>
        </View>
        <View style={styles.secondBox}>
          <View style={{marginTop: 20}}>
            <Icon
              name="arrow-left"
              style={{fontSize: 25, position: 'absolute', top: 10, left: 15}}
            />
            <TouchableOpacity
              style={styles.btnInput}
              onPress={() => this.setState({dateActive: true})}>
              <Text style={{fontSize: 15, color: 'gray'}}>
                Transaction Period
              </Text>
            </TouchableOpacity>
            <Icon
              name="arrow-left"
              style={{fontSize: 20, position: 'absolute', right: 15, top: 15}}
            />
          </View>
        </View>
        <SwipeablePanel
          closeOnTouchOutside={true}
          isActive={dateActive}
          onClose={() => this.setState({dateActive: false})}
          onlyLarge={true}
          fullWidth={true}
          style={{height: '38%'}}>
          <View style={styles.content}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                marginTop: 10,
                marginBottom: 20,
              }}>
              Transaction Period
            </Text>
            <TouchableOpacity
              onPress={() => this.setState({dateActive: false})}
              style={styles.periodBtn}>
              <Text style={{fontSize: 16, color: '#2477B2'}}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({dateActive: false})}
              style={styles.periodBtn}>
              <Text style={{fontSize: 16, color: '#2477B2'}}>Last 7 Days</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({dateActive: false})}
              style={styles.periodBtn}>
              <Text style={{fontSize: 16, color: '#2477B2'}}>Last 30 Days</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({dateActive: false, CustomPd: true})}
              style={styles.periodBtn}>
              <Text style={{fontSize: 16, color: '#2477B2'}}>
                Custom Period
              </Text>
            </TouchableOpacity>
          </View>
        </SwipeablePanel>
        {CustomPd && (
          <View style={styles.cmContainer}>
            <View style={styles.cmBox}>
              <Text style={{fontSize: 20, paddingBottom: 15}}>
                Custom Period
              </Text>
              <View style={{marginVertical: 15}}>
                <TouchableOpacity
                  style={styles.periodInput}
                  onPress={() => this.setState({dateActive: true})}>
                  <Text style={{fontSize: 16, color: 'gray'}}>
                    Select date from
                  </Text>
                </TouchableOpacity>
                <Icon
                  name="arrow-left"
                  style={{
                    fontSize: 25,
                    position: 'absolute',
                    right: 15,
                    top: 15,
                    color: 'gray',
                  }}
                />
              </View>
              <View style={{marginVertical: 10}}>
                <TouchableOpacity
                  style={styles.periodInput}
                  onPress={() => this.setState({dateActive: true})}>
                  <Text style={{fontSize: 16, color: 'gray'}}>
                    Select date to
                  </Text>
                </TouchableOpacity>
                <Icon
                  name="arrow-left"
                  style={{
                    fontSize: 25,
                    position: 'absolute',
                    right: 15,
                    top: 15,
                    color: 'gray',
                  }}
                />
              </View>
              <View style={styles.footer}>
                <TouchableOpacity
                  onPress={() => this.setState({CustomPd: false})}>
                  <Text
                    style={{fontSize: 14, fontWeight: '700', color: '#2477B2'}}>
                    CANCEL
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({CustomPd: false})}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      marginRight: 10,
                      color: '#2477B2',
                      marginLeft: 20,
                    }}>
                    OK
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2477B2',
  },
  header: {
    width: '90%',
    marginHorizontal: '5%',
  },
  goBack: {
    fontSize: 25,
    marginTop: 10,
    color: 'white',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: '#489dda',
    alignItems: 'center',
    marginRight: 10,
  },
  desc: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    marginTop: 20,
    marginBottom: 10,
  },

  //SecondBox
  secondBox: {
    backgroundColor: 'white',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    height: '85%',
    paddingHorizontal: '4%',
  },
  btnInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingLeft: 45,
    paddingRight: 30,
    paddingVertical: 15,
  },

  //period Sheet

  content: {
    width: '90%',
    marginHorizontal: '5%',
  },
  periodBtn: {
    paddingVertical: 15,
  },

  //Custom Period

  cmContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(20, 20, 20, 0.4)',
  },
  cmBox: {
    width: '90%',
    marginHorizontal: '5%',
    height: '40%',
    marginVertical: '55%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
  },
  periodInput: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingLeft: 15,
    paddingRight: 30,
    paddingVertical: 18,
  },

  //footer

  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: '10%',
  },
});
