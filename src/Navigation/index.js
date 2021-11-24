import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {NAV_TYPES} from './navTypes';
import {createDrawerNavigator} from 'react-navigation-drawer';
import screenLogin from '../Containers/LoginContainer';
import screenHome from '../Containers/HomeContainer';
import RegisterFtCode from '../Screens/Register/Register_Main';
import ScreenQR from '../Containers/ScreenQRContainer';
import ScreenTransaction from '../Containers/TransitionContainer';
import ScreenTranDetails from '../Screens/tranDetails';
import ScreenReport from '../Screens/ScreenReport';
import ScreenNotification from '../Containers/notificationContainer';
import MangeScreen from '../Containers/BusinessPfContainer';
import SeeDetailScreen from '../Screens/components/otherCom/SeeDetail';
import AddCashierScreen from '../Screens/components/otherCom/addNewCashier';
import AddOutletScreen from '../Screens/components/otherCom/AddNewOutlet';
import ScreenSetting from '../Screens/components/otherCom/Setting';
import ScreenResetUsername from '../Containers/Reset_Username';
import ScreenResetPin from '../Containers/Reset_PinContainer';
import ScreenChangePass from '../Containers/ChangePasswordContainer';
import ScreenContact from '../Screens/components/otherCom/contact';

import Re_PayAcc from '../Containers/Re_PayAccContainer';
import Re_Username from '../Containers/Re_UsernameContainer';
import Re_Password from '../Containers/Re_PasswordContainer';
import Re_BusinessPF from '../Containers/Re_Business';
import Re_ConfirmPin from '../Containers/Re_ConfirmPin';
import Re_SetupPin from '../Containers/Re_setupPin';
import Re_SetupConfirmPin from '../Containers/Re_setupConfirmPin';

import ScreenForgetPw from '../Containers/ForgetpwContainer';
import ScreenStartUp from '../Containers/StartupContainer';
import ScreenPinRequire from '../Containers/RequirePinContainer';

import ScreenLogout from '../Screens/ScreenLogout';
import DrawerMenu from '../Containers/drawerSlider';
import {create} from 'react-test-renderer';

const IntroNavigator = createStackNavigator(
  {
    [NAV_TYPES.LOGIN]: {
      screen: screenLogin,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.CONTACT]: {
      screen: ScreenContact,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.RE_CODE]: {
      screen: RegisterFtCode,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.RE_PAYACC]: {
      screen: Re_PayAcc,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.RE_USERNAME]: {
      screen: Re_Username,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.RE_PASS]: {
      screen: Re_Password,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.RE_CONPIN]: {
      screen: Re_ConfirmPin,
      navigationOptions: {
        headerShown: false,
      },
    },

    [NAV_TYPES.FORGET_PW]: {
      screen: ScreenForgetPw,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: NAV_TYPES.LOGIN,
  },
);
const HomeNavigation = createStackNavigator(
  {
    [NAV_TYPES.HOME]: {
      screen: screenHome,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.RE_SETUP_PIN]: {
      screen: Re_SetupPin,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.RE_SETUP_CONFIRM_PIN]: {
      screen: Re_SetupConfirmPin,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.QR]: {
      screen: ScreenQR,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.NOTI]: {
      screen: ScreenNotification,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.TRAN_DE]: {
      screen: ScreenTranDetails,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.MANAGE]: {
      screen: MangeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: NAV_TYPES.HOME,
  },
);

const TransNavigation = createStackNavigator(
  {
    [NAV_TYPES.TRANS]: {
      screen: ScreenTransaction,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.TRAN_DE]: {
      screen: ScreenTranDetails,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.REPORT]: {
      screen: ScreenReport,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: NAV_TYPES.TRANS,
  },
);

const ManageNavigation = createStackNavigator(
  {
    [NAV_TYPES.MANAGE]: {
      screen: MangeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.SEE_DE]: {
      screen: SeeDetailScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.NEW_CASH]: {
      screen: AddCashierScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.NEW_OUT]: {
      screen: AddOutletScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: NAV_TYPES.MANAGE,
  },
);
const SettingNavigation = createStackNavigator(
  {
    [NAV_TYPES.SETTING]: {
      screen: ScreenSetting,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.RESET_USERNAME]: {
      screen: ScreenResetUsername,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.RE_SETUP_PIN]: {
      screen: Re_SetupPin,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.RE_SETUP_CONFIRM_PIN]: {
      screen: Re_SetupConfirmPin,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.CHANGE_PASS]: {
      screen: ScreenChangePass,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: NAV_TYPES.SETTING,
  },
);
const contactNavigation = createStackNavigator(
  {
    [NAV_TYPES.CONTACT]: {
      screen: ScreenContact,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: NAV_TYPES.CONTACT,
  },
);
const logoutNavigation = createStackNavigator({
  [NAV_TYPES.LOGOUT]: {
    screen: ScreenLogout,
    navigationOptions: {
      headerShown: false,
    },
  },
});
const HomeDrawerrr = createDrawerNavigator(
  {
    [NAV_TYPES.MAIN_HOME]: HomeNavigation,
    [NAV_TYPES.MAIN_TRANS]: TransNavigation,
    [NAV_TYPES.MAIN_MANAGE]: ManageNavigation,
    [NAV_TYPES.MAIN_SETTING]: SettingNavigation,
    [NAV_TYPES.MAIN_CONTACT]: contactNavigation,
    // [NAV_TYPES.MAIN_LOGOUT]: logoutNavigation,
  },
  {
    initialRouteName: NAV_TYPES.MAIN_HOME,
    drawerBackgroundColor: 'white',
    contentOptions: {
      activeTintColor: 'red',
    },
    contentComponent: props => <DrawerMenu {...props} />,
  },
);

const CoreNavigation = createStackNavigator(
  {
    [NAV_TYPES.DRAWER]: {
      screen: HomeDrawerrr,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.REQUIRE_PIN]: {
      screen: ScreenPinRequire,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.RE_BUS]: {
      screen: Re_BusinessPF,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.RESET_PIN]: {
      screen: ScreenResetPin,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: NAV_TYPES.DRAWER,
  },
);

const MainNavigation = createStackNavigator(
  {
    [NAV_TYPES.START_UP]: {
      screen: ScreenStartUp,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.INTRO]: {
      screen: IntroNavigator,
      navigationOptions: {
        headerShown: false,
      },
    },
    [NAV_TYPES.CORE]: {
      screen: CoreNavigation,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: NAV_TYPES.START_UP,
  },
);
export default createAppContainer(MainNavigation);
