import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import IconA from 'react-native-vector-icons/AntDesign';
import NavigationService from '../../../Service/navigationService';
import {NAV_TYPES} from '../../../Navigation/navTypes';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconE from 'react-native-vector-icons/Entypo';
import {TouchableRipple} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
/* import { TouchableOpacity } from 'react-native-gesture-handler'; */

const width = Dimensions.get('window').width;
const height = width * 1.28;

const images = [
  <View>
    <TouchableRipple
      style={{
        height: 80,
        borderBottomWidth: 0.6,
        borderColor: 'gray',
        marginBottom: '0%',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      borderless={true}
      onPress={() => NavigationService.navigate(NAV_TYPES.TRAN_DE)}
      rippleColor="rgba(225,225, 2251)">
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: 55,
            height: 55,
            borderRadius: 100,
            backgroundColor: 'blue',
            marginLeft: '5%',
          }}
        />
        <View>
          <Text style={{marginLeft: 20}}>mane by M.Deound</Text>
          <Text style={{marginLeft: 20}}>purchase 16344345456644</Text>
          <Text style={{marginLeft: 20, color: '#a4a2a2'}}>
            day/mon/year 00:00:00 PM
          </Text>
        </View>
      </View>
    </TouchableRipple>

    <TouchableRipple
      style={{
        height: 80,
        borderBottomWidth: 0.6,
        borderColor: 'gray',
        marginBottom: '0%',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      borderless={true}
      onPress={() => console.log('Pressed')}
      rippleColor="rgba(225,225, 2251)">
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: 55,
            height: 55,
            borderRadius: 100,
            backgroundColor: 'blue',
            marginLeft: '5%',
          }}
        />
        <View>
          <Text style={{marginLeft: 20}}>mane by M.Deound</Text>
          <Text style={{marginLeft: 20}}>purchase 16344345456644</Text>
          <Text style={{marginLeft: 20, color: '#a4a2a2'}}>
            day/mon/year 00:00:00 PM
          </Text>
        </View>
      </View>
    </TouchableRipple>
  </View>,
  <View>
    <TouchableRipple
      style={{
        height: 80,
        borderBottomWidth: 0.6,
        borderColor: 'gray',
        marginBottom: '2%',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      borderless={true}
      onPress={() => console.log('Pressed')}
      rippleColor="rgba(225,225, 2251)">
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: 55,
            height: 55,
            borderRadius: 100,
            backgroundColor: 'blue',
            marginLeft: '5%',
          }}
        />
        <View>
          <Text style={{marginLeft: 20}}>mane by M.Deound</Text>
          <Text style={{marginLeft: 20}}>purchase 16344345456644</Text>
          <Text style={{marginLeft: 20, color: '#a4a2a2'}}>
            day/mon/year 00:00:00 PM
          </Text>
        </View>
      </View>
    </TouchableRipple>
  </View>,
];

export default class Notification extends Component {
  state = {
    active: 0,
    ListTrans: [[], []],
    idLength: 8,
  };

  constructor(props) {
    super(props);
  }
  change = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== this.state.active) {
      this.setState({active: slide});
    }
  };

  componentDidMount() {
    NavigationService.navigate(NAV_TYPES.REQUIRE_PIN);
    this.props.f_get_trans({type: 1});
  }

  UNSAFE_componentWillReceiveProps(nextProp) {
    const {user} = this.props;

    console.log('hey', nextProp.user.notification);
    if (
      nextProp.user.result_getTrans &&
      nextProp.user.result_getTrans !== user.result_getTrans
    ) {
      if (nextProp.user.result_getTrans.message === 'success') {
        // If Get Transactions Success --> Store it in ListTrans in State
        var transNumber = nextProp.user.result_getTrans.results.length;
        for (var i = 0; i < transNumber; i++) {
          if (nextProp.user.result_getTrans.results[i].date) {
            var date = nextProp.user.result_getTrans.results[i].date;
            date = date.replace('T', ' ');
            nextProp.user.result_getTrans.results[i].date = date.slice(
              0,
              date.length - 5,
            );
          }
          this.state.ListTrans[0][i] = nextProp.user.result_getTrans.results[i];
          this.props.f_get_trans({type: 2});
        }
      }
    }
    if (
      nextProp.user.notification &&
      nextProp.user.notification !== user.notification
    ) {
      if (nextProp.user.notification.message === 'success') {
        // If Get Transactions Success --> Store it in ListTrans in State
        var transNumber = nextProp.user.notification.results.length;
        for (var i = 0; i < transNumber; i++) {
          if (nextProp.user.notification.results[i].date) {
            var date = nextProp.user.notification.results[i].date;
            date = date.replace('T', ' ');
            nextProp.user.notification.results[i].date = date.slice(
              0,
              date.length - 5,
            );
          }
          this.state.ListTrans[1][i] = nextProp.user.notification.results[i];
        }
      }
    }
  }

  getTransId = data => {
    const {idLength} = this.state;
    if (data) {
      console.log(data);
      var id = '';
      for (var i = 0; i < idLength - data.id.toString().length; i++) {
        id += '0';
      }
      return id + data.id.toString();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.header}> */}
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
            <Text style={styles.headerText}>Notification</Text>
          </View>
        </View>
        {/*  </View> */}

        <View style={styles.contentHeader}>
          <View style={styles.pag}>
            {images.map((i, k) => (
              <View
                key={k}
                style={
                  k == this.state.active ? styles.activePaging : styles.paging
                }
              />
            ))}
          </View>
          <TouchableOpacity
            onPress={() => this.setState({active: 0})}
            style={styles.contentHeaderLeft}>
            <Text
              style={{
                color: 'white',
                fontSize: 17,
              }}>
              Transactions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({active: 1})}
            style={styles.contentHeaderRight}>
            <Text
              style={{
                color: 'white',
                fontSize: 17,
              }}>
              Announcements
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.sl}>
            <ScrollView
              onScroll={this.change}
              pagingEnabled
              horizontal
              style={{width}}
              showsHorizontalScrollIndicator={false}>
              {this.state.ListTrans.map((data, index) => (
                <View key={index}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.boxShadow}>
                    {index === 0 || this.state.active === 0
                      ? this.state.ListTrans[0].map((data, index) => (
                          <TouchableOpacity
                            onPress={() =>
                              NavigationService.navigate(NAV_TYPES.TRAN_DE, {
                                result: item,
                              })
                            }
                            key={index}
                            style={styles.eachTrans}>
                            <Image
                              source={require('../../../Assets/Images/pfPic.png')}
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50 / 2,
                                borderWidth: 1,
                                borderColor: '#2477B2',
                              }}
                            />
                            <View style={{marginLeft: 20}}>
                              <Text style={{fontSize: 15}}>
                                <Text style={{fontWeight: '700', fontSize: 17}}>
                                  $ {data.USD}
                                </Text>{' '}
                                is paid by {data.senderLastName}{' '}
                                {data.senderFirstName} for{' '}
                                {this.getTransId(data)}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 13,
                                  color: 'gray',
                                  marginTop: 5,
                                }}>
                                {data.date}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ))
                      : this.state.ListTrans[1].map((data, index) => (
                          <TouchableOpacity
                            onPress={() =>
                              NavigationService.navigate(NAV_TYPES.TRAN_DE, {
                                result: item,
                              })
                            }
                            key={index}
                            style={styles.eachTrans}>
                            <Ionicons
                              name="notifications-circle"
                              style={{fontSize: 40, color: '#2477B2'}}
                            />
                            <View style={{marginLeft: 20}}>
                              <Text style={{fontSize: 17}}>{data.note}</Text>
                              <Text
                                style={{
                                  fontSize: 13,
                                  color: 'gray',
                                  marginTop: 5,
                                }}>
                                {data.date}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                  </ScrollView>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  contentHeaderLeft: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4%',
  },
  contentHeaderRight: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4%',
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    height: '8%',
    marginBottom: '5%',
  },
  content: {
    width: '100%',
    flex: 10,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    marginLeft: '3%',
    fontWeight: 'bold',
  },
  detailUserHeader: {
    width: '70%',
    paddingBottom: '3%',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  imgSlide: {
    width: '100%',
    /* backgroundColor:'yellow', */
    height: '100%',
    paddingBottom: 100,
    /*  resizeMode:'cover',
        backgroundColor:'#fafafa',
        borderRadius:5,
        marginBottom:'2%', */
  },
  pag: {
    flexDirection: 'row',
    bottom: '-5%',
    left: '3%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    height: '6%',
  },
  boxShadow: {
    width,
    height: '100%',
    /*   alignItems:'center', */
    backgroundColor: 'white',
    /*backgroundColor:'blue', */
    position: 'relative',
    paddingTop: 0,
    paddingBottom: 200,
  },
  sl: {
    width: '100%',
    top: '2%',
  },
  paging: {fontSize: 22, width: '50%', height: '30%'},
  activePaging: {
    height: '70%',
    width: '50%',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#2477B2',
  },
  eachTrans: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: '5%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});
