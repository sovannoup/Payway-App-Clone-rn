import React, {Component, createRef} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import NavigationService from '../Service/navigationService';
import {NAV_TYPES} from '../Navigation/navTypes';
import Icon from 'react-native-vector-icons/Feather';
import Feather from 'react-native-vector-icons/Feather';
import {SwipeablePanel} from 'rn-swipeable-panel';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import BottomSheet from 'reanimated-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
const sheetRef = createRef(null);
export default class Transaction extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      dataActive: false,
      CustomPd: false,
      defaultActive: false,
      moneyIn: false,
      idLength: 8,

      box1: false,
      box2: false,
      ListTrans: [],
      totalSale: 0,
      totalRefund: 0,
      saleTrans: 0,
      refundTrans: 0,
    };
  }
  componentDidMount() {
    // NavigationService.navigate(NAV_TYPES.REQUIRE_PIN);
    this.props.f_get_trans({type: 1});
    if (!this.state.ListTrans || this.state.ListTrans[0] === '') {
      sheetRef.current.snapTo(0);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProp) {
    const {user} = this.props;

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
          if (
            nextProp.user.result_getTrans.results[i].userId ===
            nextProp.user.result_getTrans.results[i].receiverId
          ) {
            this.setState({
              saleTrans: this.state.saleTrans + 1,
              totalSale:
                this.state.totalSale +
                nextProp.user.result_getTrans.results[i].USD,
            });
          } else {
            this.setState({
              refundTrans: this.state.refundTrans + 1,
              totalRefund:
                this.state.totalRefund +
                nextProp.user.result_getTrans.results[i].USD,
            });
          }
          this.state.ListTrans[i] = nextProp.user.result_getTrans.results[i];
        }
      }
    }
  }
  getUserId = userId => {
    const {idLength} = this.state;
    if (userId !== 0) {
      var id = '';
      for (var i = 0; i < idLength - userId.length; i++) {
        id += '0';
      }
      return id + userId;
    }
  };

  renderContent = () => (
    <View style={styles.secondBox}>
      <View style={styles.searchHeader}>
        <FontAwesome
          style={{
            position: 'absolute',
            fontSize: 18,
            left: 20,
            top: 10,
            zIndex: 1,
            color: '#2477B2',
          }}
          name="search"
        />
        <TextInput
          style={styles.searchBox}
          placeholder="Search transaction"
          secureTextEntry={true}
        />
      </View>
      {this.state.ListTrans[0] != '' && (
        <View>
          {this.state.ListTrans.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                NavigationService.navigate(NAV_TYPES.TRAN_DE, {result: item})
              }
              style={styles.eachTran}>
              <View style={styles.eachTranLeft}>
                <Image
                  style={styles.logo}
                  source={require('./../Assets/Images/bg.jpg')}
                />
                <View>
                  <Text style={{fontSize: 19}}>
                    {item.id.length > 6
                      ? item.id
                      : this.getUserId(item.id.toString())}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: 'gray',
                      marginTop: 5,
                    }}>
                    {item.date}
                  </Text>
                </View>
              </View>
              <View style={styles.eachTranRight}>
                {item.KH === 0 ? (
                  <Text
                    style={[
                      item.userId === item.senderId
                        ? styles.outMoney
                        : styles.inMoney,
                    ]}>
                    {item.userId === item.senderId ? '- ' + item.USD : item.USD}{' '}
                    $
                  </Text>
                ) : (
                  <Text
                    style={[
                      item.userId === item.senderId
                        ? styles.outMoney
                        : styles.inMoney,
                    ]}>
                    {item.KH} ៛
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  selectDate() {
    sheetRef.current.snapTo(3);
    this.setState({dataActive: true});
  }

  closeDatePanel = () => {
    // sheetRef.current.snapTo(1);
    this.setState({dataActive: false});
  };
  render() {
    const {
      heightFirstBox,
      dataActive,
      CustomPd,
      defaultActive,
      box1,
      box2,
    } = this.state;
    return (
      <SafeAreaView style={styles.conatiner}>
        <View style={styles.firstBox}>
          <View style={styles.header}>
            <View style={styles.headerRow1}>
              <TouchableOpacity onPress={() => NavigationService.goBack()}>
                <Icon
                  name="arrow-left"
                  style={{
                    fontSize: 25,
                    color: 'white',
                    marginRight: 10,
                  }}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 20,
                  color: 'white',
                }}>
                TRANSACTION HISTORY
              </Text>
            </View>
            <TouchableOpacity
              style={styles.headerRow2}
              onPress={() => NavigationService.navigate(NAV_TYPES.REPORT)}>
              <MaterialIcons
                style={{
                  fontSize: 20,
                  marginRight: 5,
                  color: 'white',
                }}
                name="report"
              />
              <Text
                style={{
                  fontSize: 14,
                  color: 'white',
                }}>
                Report
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            // onPress={() => this.selectDate()}
            style={styles.dropdown}>
            <View style={styles.dropdownInner}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'white',
                }}>
                Last 7 days
              </Text>
              <Feather name="chevrons-down" style={styles.downBtn} />
            </View>
          </TouchableOpacity>
          {this.state.ListTrans && this.state.ListTrans[0] != '' && (
            <View style={styles.transactionBox}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    box1: !box1,
                    box2: false,
                  });
                  if (box1) {
                    sheetRef.current.snapTo(1);
                  } else {
                    sheetRef.current.snapTo(2);
                  }
                }}
                style={styles.tranBtn}>
                <View style={styles.netSaleFirst}>
                  <View style={styles.netSaleLeft}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'white',
                      }}>
                      $1.00
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'white',
                          marginRight: 5,
                        }}>
                        Net Sales
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'white',
                        }}>
                        H
                      </Text>
                    </View>
                  </View>
                  <View style={styles.netSaleRight}>
                    <AntDesign
                      name="calculator"
                      size={55}
                      style={{
                        marginRight: 10,
                        color: 'white',
                        opacity: 0.7,
                      }}
                    />
                  </View>
                </View>

                {box1 && (
                  <View style={styles.netSaleSecond}>
                    <View
                      style={{
                        borderTopWidth: 1,
                        borderTopColor: '#88bfe7',
                      }}
                    />
                    <View style={styles.netSaleDetail}>
                      <View style={styles.leftSide}>
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'white',
                          }}>
                          Total Sale
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'white',
                            marginTop: 5,
                          }}>
                          Total Refund
                        </Text>
                      </View>
                      <View style={styles.rightSide}>
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'white',
                          }}>
                          $ {this.state.totalSale}
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'white',
                            marginTop: 5,
                          }}>
                          $ {this.state.totalRefund}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    box1: false,
                    box2: !box2,
                  });
                  if (box2) {
                    sheetRef.current.snapTo(1);
                  } else {
                    sheetRef.current.snapTo(2);
                  }
                }}
                style={styles.tranBtn}>
                <View style={styles.totalTranFirst}>
                  <View style={styles.netSaleLeft}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'white',
                      }}>
                      {this.state.ListTrans.length}
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'white',
                          marginRight: 5,
                        }}>
                        Total Transactions
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'white',
                        }}>
                        H
                      </Text>
                    </View>
                  </View>
                  <View style={styles.netSaleRight}>
                    <AntDesign
                      name="copy1"
                      size={45}
                      style={{
                        marginRight: 10,
                        color: 'white',
                        opacity: 0.7,
                      }}
                    />
                  </View>
                </View>
                {box2 && (
                  <View style={styles.totalTranSecond}>
                    <View
                      style={{
                        borderTopWidth: 1,
                        borderTopColor: '#88bfe7',
                      }}
                    />
                    <View style={styles.netSaleDetail}>
                      <View style={styles.leftSide}>
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'white',
                          }}>
                          Sales Transactions
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'white',
                            marginTop: 5,
                          }}>
                          Refund Transactions
                        </Text>
                      </View>
                      <View style={styles.rightSide}>
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'white',
                          }}>
                          {this.state.saleTrans}
                        </Text>
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'white',
                            marginTop: 5,
                          }}>
                          {this.state.refundTrans}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>

        <BottomSheet
          ref={sheetRef}
          snapPoints={[640, 430, 370]}
          initialSnap={1}
          enabledHeaderGestureInteraction={false}
          renderContent={this.renderContent}
        />
        <SwipeablePanel
          closeOnTouchOutside={true}
          isActive={dataActive}
          onClose={() => this.closeDatePanel()}
          onlyLarge={true}
          fullWidth={true}
          style={{height: '38%'}}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                }}>
                Transaction Period
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#2477B2',
                  }}>
                  Edit Default
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => this.closeDatePanel()}
              style={styles.periodBtn}>
              <Text
                style={{
                  fontSize: 17,
                  color: '#2477B2',
                }}>
                Today
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.closeDatePanel()}
              style={styles.periodBtn}>
              <Text
                style={{
                  fontSize: 17,
                  color: '#2477B2',
                }}>
                Last 7 Days
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.closeDatePanel()}
              style={styles.periodBtn}>
              <Text
                style={{
                  fontSize: 17,
                  color: '#2477B2',
                }}>
                Last 30 Days
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.closeDatePanel()}
              style={styles.periodBtn}>
              <Text
                style={{
                  fontSize: 17,
                  color: '#2477B2',
                }}>
                All
              </Text>
            </TouchableOpacity>
          </View>
        </SwipeablePanel>

        {/* Default is true */}

        <SwipeablePanel
          closeOnTouchOutside={true}
          isActive={defaultActive}
          onClose={() => this.setState({defaultActive: false})}
          onlyLarge={true}
          fullWidth={true}
          style={{height: '38%'}}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '700',
                }}>
                Select Default Period
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 15,
                    color: '#2477B2',
                  }}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  dataActive: false,
                })
              }
              style={styles.periodBtn}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <BouncyCheckbox
                  style={styles.bCheckBox}
                  size={20}
                  isChecked={false}
                  fillColor="#2477B2"
                  unfillColor="#FFFFFF"
                  // text="I have read and accept the"
                  iconStyle={{
                    borderColor: '#cccccc',
                  }}
                />
                <Text
                  style={{
                    fontSize: 17,
                    color: '#2477B2',
                  }}>
                  Today
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  dataActive: false,
                })
              }
              style={styles.periodBtn}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <BouncyCheckbox
                  style={styles.bCheckBox}
                  size={20}
                  isChecked={false}
                  fillColor="#2477B2"
                  unfillColor="#FFFFFF"
                  // text="I have read and accept the"
                  iconStyle={{
                    borderColor: '#cccccc',
                  }}
                />
                <Text
                  style={{
                    fontSize: 17,
                    color: '#2477B2',
                  }}>
                  Last 7 Days
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  dataActive: false,
                })
              }
              style={styles.periodBtn}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <BouncyCheckbox
                  style={styles.bCheckBox}
                  size={20}
                  isChecked={false}
                  fillColor="#2477B2"
                  unfillColor="#FFFFFF"
                  // text="I have read and accept the"
                  iconStyle={{
                    borderColor: '#cccccc',
                  }}
                />
                <Text
                  style={{
                    fontSize: 17,
                    color: '#2477B2',
                  }}>
                  Last 30 Days
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  dataActive: false,
                })
              }
              style={styles.periodBtn}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <BouncyCheckbox
                  style={styles.bCheckBox}
                  size={20}
                  isChecked={false}
                  fillColor="#2477B2"
                  unfillColor="#FFFFFF"
                  // text="I have read and accept the"
                  iconStyle={{
                    borderColor: '#cccccc',
                  }}
                />
                <Text
                  style={{
                    fontSize: 17,
                    color: '#2477B2',
                  }}>
                  All
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SwipeablePanel>

        {/* Custom Period */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  // Container
  conatiner: {
    flex: 1,
  },

  //First Box Header
  firstBox: {
    height: '100%',
    paddingHorizontal: '5%',
    backgroundColor: '#2477B2',
  },

  //header
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headerRow1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRow2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#489dda',
  },

  //last .... days
  dropdown: {
    marginVertical: 30,
  },
  dropdownInner: {
    display: 'flex',
    flexDirection: 'row',
  },
  downBtn: {
    color: 'white',
    fontSize: 20,
    marginLeft: 5,
  },

  //Transaction Box
  transactionBox: {
    display: 'flex',
    flexDirection: 'column',
  },
  tranBtn: {
    backgroundColor: '#489dda',
    borderRadius: 5,
    padding: 15,
    marginVertical: 4,
  },

  //default UI
  netSaleFirst: {
    width: '100%',
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  netSaleLeft: {
    display: 'flex',
    flexDirection: 'column',
  },

  //details Trans Box
  netSaleSecond: {
    // display: 'none',
  },
  netSaleDetail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  //Total Transactions
  totalTranSecond: {},
  totalTranFirst: {
    width: '100%',
    paddingBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  //Each Transaction Footer

  bottomSheet: {
    position: 'absolute',
    backgroundColor: 'white',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    width: '100%',
    top: '46%',
    height: '54%',
  },
  secondBox: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: '5%',
    paddingVertical: 15,
    backgroundColor: 'white',
    height: '100%',
  },
  searchBox: {
    borderRadius: 20,
    backgroundColor: '#ececec',
    padding: 0,
    paddingVertical: 7,
    paddingLeft: '15%',
  },
  eachTran: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 25,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    justifyContent: 'space-between',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#2477B2',
  },
  eachTranLeft: {
    display: 'flex',
    flexDirection: 'row',
  },

  //Transaction Period
  header: {
    marginTop: 10,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    width: '90%',
    marginHorizontal: '5%',
  },
  periodBtn: {
    paddingVertical: 15,
  },

  //Button Sheet Each Tran

  searchHeader: {
    width: '100%',
  },

  //money
  inMoney: {
    fontSize: 18,
    color: '#64e764',
    fontWeight: '700',
    marginTop: '15%',
  },
  outMoney: {
    fontSize: 18,
    color: '#ff4d4d',
    fontWeight: '700',
    marginTop: '15%',
  },
});
