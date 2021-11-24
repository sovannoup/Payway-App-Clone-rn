import {success, error, abort} from 'redux-saga-requests';

export const REGISTER_SMS = 'REGISTER_SMS';
export const USERNAME_VERIFY = 'USERNAME_VERIFY';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const PIN_VERIFY = 'PIN_VERIFY';
export const SETUP_PIN = 'SETUP_PIN';
export const PIN_CHECK_PAGE = 'PIN_CHECK_PAGE';
export const GET_QR = 'GET_QR';
export const RE_BUSINESS = 'RE_BUSINESS';
export const CHECK_PROFILE = 'CHECK_PROFILE';
export const CHANGE_PW = 'CHANGE_PW';
export const RESET_USERNAME = 'RESET_USERNAME';
export const RESET_PIN = 'RESET_PIN';
export const CHECK_PHONE = 'CHECK_PHONE';
export const GET_TRANS = 'GET_TRANS';
export const CHECK_QR = 'CHECK_QR';
export const PROFILE_DETAIL = 'PROFILE_DETAIL';

export const f_register_Sms = payload => ({
  type: REGISTER_SMS,
  payload,
});
export const f_username_verify = payload => ({
  type: USERNAME_VERIFY,
  payload,
});
export const f_signup = payload => ({
  type: SIGNUP,
  payload,
});
export const f_login = payload => ({
  type: LOGIN,
  payload,
});
export const f_checkPin = payload => ({
  type: PIN_VERIFY,
  payload,
});
export const f_checkProfile = payload => ({
  type: CHECK_PROFILE,
  payload,
});
export const f_setup_pin = payload => ({
  type: SETUP_PIN,
  payload,
});
export const f_pin_check_page = payload => ({
  type: PIN_CHECK_PAGE,
  payload,
});
export const f_get_qr = payload => ({
  type: GET_QR,
  payload,
});
export const f_re_business = payload => ({
  type: RE_BUSINESS,
  payload,
});
export const f_change_pw = payload => ({
  type: CHANGE_PW,
  payload,
});
export const f_reset_username = payload => ({
  type: RESET_USERNAME,
  payload,
});
export const f_reset_pin = payload => ({
  type: RESET_PIN,
  payload,
});
export const f_check_phone = payload => ({
  type: CHECK_PHONE,
  payload,
});
export const f_get_trans = payload => ({
  type: GET_TRANS,
  payload,
});
export const f_check_qr = payload => ({
  type: CHECK_QR,
  payload,
});
export const f_profile_detail = payload => ({
  type: PROFILE_DETAIL,
  payload,
});

const initialState = {
  pending: false,
  error: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    //REGISTER_SMS
    case REGISTER_SMS: {
      return {
        ...state,
        pending: true,
      };
    }
    case success(REGISTER_SMS): {
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    }
    case error(REGISTER_SMS): {
      return {...state, error: true, pending: false, ...action.payload};
    }
    case abort(REGISTER_SMS): {
      return {...state, pending: false};
    }

    //PIN_CHECK_PAGE
    case PIN_CHECK_PAGE: {
      return {
        ...state,
        pending: true,
        verify_ph: false,
      };
    }
    case success(PIN_CHECK_PAGE): {
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    }
    case error(PIN_CHECK_PAGE): {
      return {...state, error: true, pending: false, ...action.payload};
    }
    case abort(PIN_CHECK_PAGE): {
      return {...state, pending: false};
    }

    //LOGIN
    case LOGIN: {
      return {
        ...state,
        pending: true,
      };
    }
    case success(LOGIN): {
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    }
    case error(LOGIN): {
      return {...state, error: true, pending: false, ...action.payload};
    }
    case abort(LOGIN): {
      return {...state, pending: false};
    }

    //SIGNUP
    case SIGNUP: {
      return {
        ...state,
        pending: true,
        verify_ph: false,
      };
    }
    case success(SIGNUP): {
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    }
    case error(SIGNUP): {
      return {...state, error: true, pending: false, ...action.payload};
    }
    case abort(SIGNUP): {
      return {...state, pending: false};
    }

    //USERNAME_VERIFY
    case USERNAME_VERIFY: {
      return {
        ...state,
        pending: true,
      };
    }
    case success(USERNAME_VERIFY): {
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    }
    case error(USERNAME_VERIFY): {
      return {...state, error: true, pending: false, ...action.payload};
    }
    case abort(USERNAME_VERIFY): {
      return {...state, pending: false};
    }

    //PIN_VERIFY
    case PIN_VERIFY: {
      return {
        ...state,
        pending: true,
      };
    }
    case success(PIN_VERIFY): {
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    }
    case error(PIN_VERIFY): {
      return {...state, error: true, pending: false, ...action.payload};
    }
    case abort(PIN_VERIFY): {
      return {...state, pending: false};
    }

    //SETUP_PIN
    case SETUP_PIN: {
      return {
        ...state,
        pending: true,
      };
    }
    case success(SETUP_PIN): {
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    }
    case error(SETUP_PIN): {
      return {...state, error: true, pending: false, ...action.payload};
    }
    case abort(SETUP_PIN): {
      return {...state, pending: false};
    }

    //GET_QR
    case GET_QR: {
      return {
        ...state,
        pending: true,
      };
    }
    case success(GET_QR): {
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    }
    case error(GET_QR): {
      return {...state, error: true, pending: false, ...action.payload};
    }
    case abort(GET_QR): {
      return {...state, pending: false};
    }

    //RE_BUSINESS
    case RE_BUSINESS: {
      return {
        ...state,
        pending: true,
      };
    }
    case success(RE_BUSINESS): {
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    }
    case error(RE_BUSINESS): {
      return {...state, error: true, pending: false, ...action.payload};
    }
    case abort(RE_BUSINESS): {
      return {...state, pending: false};
    }

    //CHECK_PROFILE
    case CHECK_PROFILE: {
      return {
        ...state,
        pending: true,
      };
    }
    case success(CHECK_PROFILE): {
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    }
    case error(CHECK_PROFILE): {
      return {...state, error: true, pending: false, ...action.payload};
    }
    case abort(CHECK_PROFILE): {
      return {...state, pending: false};
    }

    //CHANGE_PW
    case CHANGE_PW: {
      return {
        ...state,
        pending: true,
      };
    }
    case success(CHANGE_PW): {
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    }
    case error(CHANGE_PW): {
      return {...state, error: true, pending: false, ...action.payload};
    }
    case abort(CHANGE_PW): {
      return {...state, pending: false};
    }

    //RESET_USERNAME
    case RESET_USERNAME: {
      return {
        ...state,
        pending: true,
      };
    }
    case success(RESET_USERNAME): {
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    }
    case error(RESET_USERNAME): {
      return {...state, error: true, pending: false, ...action.payload};
    }
    case abort(RESET_USERNAME): {
      return {...state, pending: false};
    }

    //RESET_PIN
    case RESET_PIN: {
      return {
        ...state,
        pending: true,
      };
    }
    case success(RESET_PIN): {
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    }
    case error(RESET_PIN): {
      return {...state, error: true, pending: false, ...action.payload};
    }
    case abort(RESET_PIN): {
      return {...state, pending: false};
    }

    //CHECK_PHONE
    case CHECK_PHONE: {
      return {
        ...state,
        pending: true,
      };
    }
    case success(CHECK_PHONE): {
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    }
    case error(CHECK_PHONE): {
      return {...state, error: true, pending: false, ...action.payload};
    }
    case abort(CHECK_PHONE): {
      return {...state, pending: false};
    }

    //GET_TRANS
    case GET_TRANS: {
      return {
        ...state,
        pending: true,
      };
    }
    case success(GET_TRANS): {
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    }
    case error(GET_TRANS): {
      return {...state, error: true, pending: false, ...action.payload};
    }
    case abort(GET_TRANS): {
      return {...state, pending: false};
    }

    //CHECK_QR
    case CHECK_QR: {
      return {
        ...state,
        pending: true,
      };
    }
    case success(CHECK_QR): {
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    }
    case error(CHECK_QR): {
      return {...state, error: true, pending: false, ...action.payload};
    }
    case abort(CHECK_QR): {
      return {...state, pending: false};
    }

    //PROFILE_DETAIL
    case PROFILE_DETAIL: {
      return {
        ...state,
        pending: true,
      };
    }
    case success(PROFILE_DETAIL): {
      return {
        ...state,
        ...action.payload,
        pending: false,
      };
    }
    case error(PROFILE_DETAIL): {
      return {...state, error: true, pending: false, ...action.payload};
    }
    case abort(PROFILE_DETAIL): {
      return {...state, pending: false};
    }

    /**
     * DEFAULT_CASE
     */
    default:
      return state;
  }
};

export default userReducer;
