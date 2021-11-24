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
  BackHandler,
  Alert,
} from 'react-native';
import IconA from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/FontAwesome';
import IconE from 'react-native-vector-icons/Entypo';
import NavigationService from '../../../Service/navigationService';
import {NAV_TYPES} from '../../../Navigation/navTypes';
import {TouchableRipple} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
/* import { TouchableOpacity } from 'react-native-gesture-handler'; */

const width = Dimensions.get('window').width;
const height = width * 1.28;

const images = [
  <View>
    <View
      style={{
        height: 70,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f8f6f6',
        marginBottom: '2%',
        justifyContent: 'center',
      }}>
      <Image
        style={{
          width: 70,
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
        }}
        source={require('../../../Assets/Images/blank1.jpg')}
      />
      <Text style={{marginLeft: 90}}>mane by Dev@Team</Text>
      <Text style={{marginLeft: 90, color: '#a4a2a2'}}>0 Cashiers</Text>
      <TouchableOpacity style={{position: 'absolute', right: 20, top: 16}}>
        <View>
          <IconE
            style={{fontSize: 20, color: '#a4a2a2'}}
            name="dots-three-horizontal"
          />
          <IconE
            style={{fontSize: 18, color: '#01cdd4', marginTop: 8}}
            name="star"
          />
        </View>
      </TouchableOpacity>
    </View>

    <View
      style={{
        height: 70,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f8f6f6',
        marginBottom: '2%',
        justifyContent: 'center',
      }}>
      <Image
        style={{
          width: 70,
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
        }}
        source={require('../../../Assets/Images/blank1.jpg')}
      />
      <Text style={{marginLeft: 90}}>mane by M.Deound</Text>
      <Text style={{marginLeft: 90, color: '#a4a2a2'}}>0 Cashiers</Text>
      <TouchableOpacity style={{position: 'absolute', right: 20, top: 16}}>
        <View>
          <IconE
            style={{fontSize: 20, color: '#a4a2a2'}}
            name="dots-three-horizontal"
          />
          <IconE
            style={{fontSize: 18, color: '#01cdd4', marginTop: 8}}
            name="star"
          />
        </View>
      </TouchableOpacity>
    </View>

    <View
      style={{
        height: 70,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f8f6f6',
        marginBottom: '2%',
        justifyContent: 'center',
      }}>
      <Image
        style={{
          width: 70,
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
        }}
        source={require('../../../Assets/Images/blank1.jpg')}
      />
      <Text style={{marginLeft: 90}}>mane by M.Deound</Text>
      <Text style={{marginLeft: 90, color: '#a4a2a2'}}>0 Cashiers</Text>
      <TouchableOpacity style={{position: 'absolute', right: 20, top: 16}}>
        <View>
          <IconE
            style={{fontSize: 20, color: '#a4a2a2'}}
            name="dots-three-horizontal"
          />
          <IconE
            style={{fontSize: 18, color: '#01cdd4', marginTop: 8}}
            name="star"
          />
        </View>
      </TouchableOpacity>
    </View>

    <View
      style={{
        height: 70,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f8f6f6',
        marginBottom: '2%',
        justifyContent: 'center',
      }}>
      <Image
        style={{
          width: 70,
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
        }}
        source={require('../../../Assets/Images/blank1.jpg')}
      />
      <Text style={{marginLeft: 90}}>mane by M.Deound</Text>
      <Text style={{marginLeft: 90, color: '#a4a2a2'}}>0 Cashiers</Text>
      <TouchableOpacity style={{position: 'absolute', right: 20, top: 16}}>
        <View>
          <IconE
            style={{fontSize: 20, color: '#a4a2a2'}}
            name="dots-three-horizontal"
          />
          <IconE
            style={{fontSize: 18, color: '#01cdd4', marginTop: 8}}
            name="star"
          />
        </View>
      </TouchableOpacity>
    </View>

    <View
      style={{
        height: 70,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f8f6f6',
        marginBottom: '2%',
        justifyContent: 'center',
      }}>
      <Image
        style={{
          width: 70,
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
        }}
        source={require('../../../Assets/Images/blank1.jpg')}
      />
      <Text style={{marginLeft: 90}}>mane by M.Deound</Text>
      <Text style={{marginLeft: 90, color: '#a4a2a2'}}>0 Cashiers</Text>
      <TouchableOpacity style={{position: 'absolute', right: 20, top: 16}}>
        <View>
          <IconE
            style={{fontSize: 20, color: '#a4a2a2'}}
            name="dots-three-horizontal"
          />
          <IconE
            style={{fontSize: 18, color: '#01cdd4', marginTop: 8}}
            name="star"
          />
        </View>
      </TouchableOpacity>
    </View>

    <View
      style={{
        height: 70,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f8f6f6',
        marginBottom: '2%',
        justifyContent: 'center',
      }}>
      <Image
        style={{
          width: 70,
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
        }}
        source={require('../../../Assets/Images/blank1.jpg')}
      />
      <Text style={{marginLeft: 90}}>mane by M.Deound</Text>
      <Text style={{marginLeft: 90, color: '#a4a2a2'}}>0 Cashiers</Text>
      <TouchableOpacity style={{position: 'absolute', right: 20, top: 16}}>
        <View>
          <IconE
            style={{fontSize: 20, color: '#a4a2a2'}}
            name="dots-three-horizontal"
          />
          <IconE
            style={{fontSize: 18, color: '#01cdd4', marginTop: 8}}
            name="star"
          />
        </View>
      </TouchableOpacity>
    </View>
  </View>,
  <View>
    <View
      style={{
        height: 70,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f8f6f6',
        marginBottom: '2%',
        justifyContent: 'center',
      }}>
      <Image
        style={{
          width: 70,
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
        }}
        source={require('../../../Assets/Images/blank1.jpg')}
      />
      <Text style={{marginLeft: 90}}>mane by M.Deound</Text>
      <Text style={{marginLeft: 90, color: '#a4a2a2'}}>0 Cashiers</Text>
      <TouchableOpacity style={{position: 'absolute', right: 20, top: 16}}>
        <View>
          <IconE
            style={{fontSize: 20, color: '#a4a2a2'}}
            name="dots-three-horizontal"
          />
          <IconE
            style={{fontSize: 18, color: '#01cdd4', marginTop: 8}}
            name="star"
          />
        </View>
      </TouchableOpacity>
    </View>
  </View>,
];

export default class Manage extends Component {
  state = {
    active: 0,
    phonenumber: '',
    payUsername: '',
    profileName: '',
    profileAddress: '',
    profileCity: '',
    profileLogo: '',
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    NavigationService.navigate(NAV_TYPES.REQUIRE_PIN);
    this.props.f_profile_detail();
  }

  UNSAFE_componentWillReceiveProps(nextProp) {
    const {user} = this.props;

    if (
      nextProp.user.result_profile_detail &&
      nextProp.user.result_profile_detail !== user.result_profile_detail
    ) {
      if (nextProp.user.result_profile_detail.message === 'success') {
        this.setState({
          phonenumber: nextProp.user.result_profile_detail.data.phonenumber,
          payUsername: nextProp.user.result_profile_detail.data.payUsername,
          profileName: nextProp.user.result_profile_detail.data.profileName,
          phonenumber: nextProp.user.result_profile_detail.data.phonenumber,
          phonenumber: nextProp.user.result_profile_detail.data.phonenumber,
          phonenumber: nextProp.user.result_profile_detail.data.phonenumber,
        });
      }
    }
  }

  change = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== this.state.active) {
      this.setState({active: slide});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 2}}>
          <TouchableOpacity onPress={() => NavigationService.goBack()}>
            <IconA
              name="arrowleft"
              style={{
                fontSize: 25,
                color: 'white',
                margin: '3%',
              }}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerText}>Manage Business</Text>
          </View>
          <View style={styles.boxUser}>
            <View style={styles.detailUser}>
              <View style={styles.detailUserHeader}>
                <Text>Amatak by DevTeam</Text>
                <Text style={{color: 'gray'}}>Electronics</Text>
              </View>
              <View style={styles.detailUserFooter}>
                <TouchableOpacity
                  onPress={() => NavigationService.navigate(NAV_TYPES.SEE_DE)}>
                  <Text
                    style={{
                      color: '#34afac',
                      fontWeight: 'bold',
                    }}>
                    See Details
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.user} />
            </View>
          </View>
        </View>
        <View style={styles.content}>
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
            <View style={styles.contentHeaderLeft}>
              <Text>Outlets</Text>
            </View>
            <View style={styles.contentHeaderRight}>
              <Text>Cashiers</Text>
            </View>
          </View>

          <View style={styles.sl}>
            <ScrollView
              onScroll={this.change}
              pagingEnabled
              horizontal
              style={{width}}
              showsHorizontalScrollIndicator={false}>
              {images.map((item, index) => (
                <View key={index}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.boxShadow}>
                    <View style={styles.imgSlide}>
                      <View>{item}</View>
                    </View>
                  </ScrollView>
                  <TouchableRipple
                    style={styles.plus}
                    onPress={() =>
                      NavigationService.navigate(NAV_TYPES.NEW_OUT)
                    }
                    borderless={true}>
                    <IconA
                      name="plus"
                      style={{
                        color: 'white',
                        fontSize: 27,
                      }}
                    />
                  </TouchableRipple>
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
  plus: {
    position: 'absolute',
    elevation: 6,
    width: 60,
    height: 60,
    backgroundColor: '#01cdd4',
    bottom: '3%',
    right: '3%',
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: '12%',
  },
  content: {
    width: '100%',
    flex: 4,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    marginLeft: '3%',
  },
  boxUser: {
    width: '100%',
    height: '63%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3%',
  },
  detailUser: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 6,
    padding: '3%',
    justifyContent: 'space-between',
  },
  detailUserHeader: {
    width: '70%',
    paddingBottom: '3%',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  detailUserFooter: {},
  user: {
    width: 60,
    backgroundColor: '#a2edfb',
    height: 60,
    position: 'absolute',
    borderRadius: 100,
    right: '3%',
    top: '13%',
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
    paddingHorizontal: '1.5%',
    /*backgroundColor:'blue', */
    position: 'relative',
    paddingTop: 20,
    paddingBottom: 200,
  },
  sl: {
    width: '100%',
    height: '86%',
    top: '2%',
  },
  paging: {
    fontSize: 22,
    width: '50%',
    backgroundColor: '#e0dede',
    height: '30%',
  },
  activePaging: {
    height: '80%',
    width: '50%',
    backgroundColor: '#30afa8',
  },
  container: {
    flex: 1,
    backgroundColor: '#2477B2',
  },
});
