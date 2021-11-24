import {call, put, takeLatest} from 'redux-saga/effects';
import {error, success} from 'redux-saga-requests';
import {axios} from '../app/index';
import nomalize from './../../Utils/normiliseServerResponce';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import {API_URL} from '../app/config';

import {
  PIN_VERIFY,
  LOGIN,
  REGISTER_SMS,
  SIGNUP,
  USERNAME_VERIFY,
  SETUP_PIN,
  PIN_CHECK_PAGE,
  GET_QR,
  RE_BUSINESS,
  CHECK_PROFILE,
  CHANGE_PW,
  RESET_USERNAME,
  RESET_PIN,
  CHECK_PHONE,
  GET_TRANS,
  CHECK_QR,
  PROFILE_DETAIL,
} from './reducer';

export function* getQRWorker({payload}) {
  try {
    const result_qr = yield call(axios.post, 'payway/qr/insert', payload);
    yield put({
      type: success(GET_QR),
      payload: {
        result_qr: nomalize(result_qr),
      },
    });
  } catch (e) {
    const parseError = yield JSON.parse(JSON.stringify(e));
    const message = parseError.data || parseError.response;
    console.log('getting QR error', message);
    yield put({
      type: error(GET_QR),
      payload: {errorQR: message},
    });
  }
}

export function* Re_BusinessWorker({payload}) {
  try {
    // const result_re_business = yield call(
    //   axios.post,
    //   'payway/profile/detail',
    //   payload,
    // );
    // yield put({
    //   type: success(RE_BUSINESS),
    //   payload: {
    //     result_re_business: nomalize(result_re_business),
    //   },
    // });
    var body = [];
    var success_ = false;
    var dataError = {};
    var dataRes = {};
    var authDataString = yield AsyncStorage.getItem('@loginToken');
    const authData = yield JSON.parse(authDataString);
    for (var key in payload) {
      if (key === 'logo') {
        body.push({
          name: String(key),
          filename: payload[key].path.substring(
            payload[key].path.lastIndexOf('/') + 1,
          ),
          type: payload[key].mime,
          data: String(RNFetchBlob.wrap(payload[key].path)),
        });
      } else {
        body.push({
          name: String(key),
          data: String(payload[key]),
        });
      }
    }
    console.log('body is', body);

    yield RNFetchBlob.fetch(
      'POST',
      `${API_URL}payway/profile/insert`,
      {
        Authorization: `Bearer ${authData.data.token}`,
        'Content-Type': 'multipart/form-data',
      },
      body,
    )
      .then(res => {
        dataRes = {
          data: JSON.parse(nomalize(res)),
        };
        console.log('res', dataRes);
        success_ = true;
      })
      .catch(res => {
        dataError = res;
        console.log('error', dataError);
      });
    if (success_) {
      yield put({
        type: success(RE_BUSINESS),
        payload: {
          result_re_business: dataRes,
        },
      });
    } else {
      yield put({
        type: error(RE_BUSINESS),
        payload: {
          errorUpload: JSON.parse(dataError),
        },
      });
    }
  } catch (e) {
    const parseError = yield JSON.parse(JSON.stringify(e));
    const message = parseError.data || parseError.response;
    console.log('Re_Business error', message);
    yield put({
      type: error(RE_BUSINESS),
      payload: {errorGetWithdrawFee: e},
    });
  }
}

export function* checkProfileWorker({payload}) {
  try {
    const result_check_pf = yield call(
      axios.get,
      'payway/profile/view',
      payload,
    );
    yield put({
      type: success(CHECK_PROFILE),
      payload: {
        result_check_pf: nomalize(result_check_pf),
      },
    });
  } catch (e) {
    // const parseError = yield JSON.parse(JSON.stringify(e));
    // const message = parseError.data || parseError.response;
    console.log('Check Profile error', e);
    yield put({
      type: error(CHECK_PROFILE),
      payload: {profileErrMessage: e},
    });
  }
}

export function* loginWorker({payload}) {
  try {
    const result_login = yield call(axios.post, 'payway/login', payload);
    console.log('LoginToken', result_login.data);
    if (result_login.token) {
      yield (axios.defaults.headers.common = {
        Authorization: `Bearer ${result_login.token}`,
      });
    }
    AsyncStorage.setItem('@loginToken', JSON.stringify(result_login));
    yield put({
      type: success(LOGIN),
      payload: {
        result_login: nomalize(result_login),
      },
    });
  } catch (e) {
    const parseError = yield JSON.parse(JSON.stringify(e));
    const message = parseError.data || parseError.response;
    console.log('Login error', message);
    yield put({
      type: error(LOGIN),
      payload: {errorLoginMessage: message},
    });
  }
}

export function* registerSmsWorker({payload}) {
  try {
    const result_getSms = yield call(axios.post, 'payway/registersms', payload);
    console.log('hiii', result_getSms.data);
    yield (axios.defaults.headers.common = {
      Authorization: `Bearer ${result_getSms.data.token}`,
    });
    AsyncStorage.setItem('smsCode', result_getSms.data.results[0].smsCode);
    yield put({
      type: success(REGISTER_SMS),
      payload: {
        result_getSms: nomalize(result_getSms),
      },
    });
  } catch (e) {
    const parseError = yield JSON.parse(JSON.stringify(e));
    const message = parseError.data || parseError.response;
    console.log('Error Request SMS', message);
    yield put({
      type: error(REGISTER_SMS),
      payload: {error_getSms: message},
    });
  }
}

export function* signupWorker({payload}) {
  try {
    console.log('Signup Payload', payload);
    const result_signup = yield call(axios.post, 'payway/signup', payload);
    yield put({
      type: success(SIGNUP),
      payload: {
        result_signup: nomalize(result_signup),
      },
    });
  } catch (e) {
    const parseError = yield JSON.parse(JSON.stringify(e));
    const message = parseError.data || parseError.response;
    console.log('signup ssssssss error', message);
    yield put({
      type: error(SIGNUP),
      payload: {errorGetWithdrawFee: e},
    });
  }
}

export function* usernameVerifyWorker({payload}) {
  try {
    console.log('Verify Username', payload);
    const result_username = yield call(
      axios.post,
      'payway/register/verify/username',
      payload,
    );
    yield put({
      type: success(USERNAME_VERIFY),
      payload: {
        result_username: nomalize(result_username),
      },
    });
  } catch (e) {
    // const parseError = yield JSON.parse(JSON.stringify(e));
    // const message = parseError.data || parseError.response
    console.log('withdraw fee error', e);
    yield put({
      type: error(USERNAME_VERIFY),
      payload: {errorGetWithdrawFee: e},
    });
  }
}

export function* checkPinWorker({payload}) {
  try {
    const result_pin = yield call(axios.get, 'payway/pin/view', payload);
    console.log('checking!!!');
    yield put({
      type: success(PIN_VERIFY),
      payload: {
        result_pin: nomalize(result_pin),
      },
    });
  } catch (e) {
    // const parseError = yield JSON.parse(JSON.stringify(e));
    // const message = parseError.data || parseError.response;
    console.log('Checking Pin error', e);
    yield put({
      type: error(PIN_VERIFY),
      payload: {errorGetWithdrawFee: e},
    });
  }
}

export function* setupPinWorker({payload}) {
  try {
    const result_setup = yield call(axios.post, 'payway/pin/insert', payload);
    yield put({
      type: success(SETUP_PIN),
      payload: {
        result_setup: nomalize(result_setup),
      },
    });
  } catch (e) {
    const parseError = yield JSON.parse(JSON.stringify(e));
    const message = parseError.data || parseError.response;
    console.log('Setup Pin error', message);
    yield put({
      type: error(SETUP_PIN),
      payload: {errorGetWithdrawFee: e},
    });
  }
}

export function* pinCheckPageWorker({payload}) {
  try {
    const result_check_page = yield call(
      axios.post,
      'payway/pin/verify',
      payload,
    );
    yield put({
      type: success(PIN_CHECK_PAGE),
      payload: {
        result_check_page: nomalize(result_check_page),
      },
    });
  } catch (e) {
    // const parseError = yield JSON.parse(JSON.stringify(e));
    // const message = parseError.data || parseError.response;
    console.log('Setup Pin error', e);
    yield put({
      type: error(PIN_CHECK_PAGE),
      payload: {errorGetWithdrawFee: e},
    });
  }
}

export function* changePasswordWorker({payload}) {
  try {
    const change_pw = yield call(axios.post, 'payway/password/reset', payload);
    yield put({
      type: success(CHANGE_PW),
      payload: {
        change_pw: nomalize(change_pw),
      },
    });
  } catch (e) {
    const parseError = yield JSON.parse(JSON.stringify(e));
    const message = parseError.data || parseError.response;
    // console.log('Change Password error', message);
    yield put({
      type: error(CHANGE_PW),
      payload: {errorMessage: message},
    });
  }
}

export function* changeUsernameWorker({payload}) {
  try {
    const reset_username = yield call(
      axios.post,
      'payway/username/reset',
      payload,
    );
    yield put({
      type: success(RESET_USERNAME),
      payload: {
        reset_username: nomalize(reset_username),
      },
    });
  } catch (e) {
    const parseError = yield JSON.parse(JSON.stringify(e));
    const message = parseError.data || parseError.response;
    console.log('Change Username error', message);
    yield put({
      type: error(RESET_USERNAME),
      payload: {errorMessage: message},
    });
  }
}

export function* resetPinWorker({payload}) {
  try {
    const result_resetPin = yield call(axios.post, 'payway/pin/reset', payload);
    yield put({
      type: success(RESET_PIN),
      payload: {
        result_resetPin: nomalize(result_resetPin),
      },
    });
  } catch (e) {
    const parseError = yield JSON.parse(JSON.stringify(e));
    const message = parseError.data || parseError.response;
    console.log('Change Username error', message);
    yield put({
      type: error(RESET_PIN),
      payload: {errorMessage: message},
    });
  }
}

export function* checkPhoneWorker({payload}) {
  try {
    const result_checkPhone = yield call(
      axios.post,
      'payway/register/verify/phonenumber',
      payload,
    );
    yield put({
      type: success(CHECK_PHONE),
      payload: {
        result_checkPhone: nomalize(result_checkPhone),
      },
    });
  } catch (e) {
    const parseError = yield JSON.parse(JSON.stringify(e));
    const message = parseError.data || parseError.response;
    console.log('Change Username error', message);
    yield put({
      type: error(CHECK_PHONE),
      payload: {error_checkPhone: message},
    });
  }
}

export function* getTransWorker({payload}) {
  try {
    const result_getTrans = yield call(
      axios.get,
      `payway/histories/${payload.type}/1`,
    );
    if (payload.type === 1) {
      yield put({
        type: success(GET_TRANS),
        payload: {
          result_getTrans: nomalize(result_getTrans),
        },
      });
    } else {
      yield put({
        type: success(GET_TRANS),
        payload: {
          notification: nomalize(result_getTrans),
        },
      });
    }
  } catch (e) {
    const parseError = yield JSON.parse(JSON.stringify(e));
    const message = parseError.data || parseError.response;
    console.log('Get Transition error', message);
    yield put({
      type: error(GET_TRANS),
      payload: {error_checkPhone: message},
    });
  }
}

export function* checkQrWorker({payload}) {
  try {
    const result_checkQR = yield call(
      axios.post,
      'payway/qr/verify/required',
      payload,
    );
    yield put({
      type: success(CHECK_QR),
      payload: {
        result_checkQR: nomalize(result_checkQR),
      },
    });
  } catch (e) {
    // const parseError = yield JSON.parse(JSON.stringify(e));
    // const message = parseError.data || parseError.response;
    console.log('Change Username error', e);
    yield put({
      type: error(CHECK_QR),
      payload: {error_checkQr: e},
    });
  }
}

export function* getProfileDetailWorker({payload}) {
  try {
    const result_profile_detail = yield call(
      axios.get,
      `payway/profile/detail`,
    );
    yield put({
      type: success(PROFILE_DETAIL),
      payload: {
        result_profile_detail: nomalize(result_profile_detail),
      },
    });
  } catch (e) {
    const parseError = yield JSON.parse(JSON.stringify(e));
    const message = parseError.data || parseError.response;
    console.log('Get Profile error', message);
    yield put({
      type: error(PROFILE_DETAIL),
      payload: {error_getProfile: message},
    });
  }
}

export function* userSaga() {
  yield takeLatest(LOGIN, loginWorker);
  yield takeLatest(REGISTER_SMS, registerSmsWorker);
  yield takeLatest(SIGNUP, signupWorker);
  yield takeLatest(USERNAME_VERIFY, usernameVerifyWorker);
  yield takeLatest(PIN_VERIFY, checkPinWorker);
  yield takeLatest(CHECK_PHONE, checkPhoneWorker);
  yield takeLatest(SETUP_PIN, setupPinWorker);
  yield takeLatest(PIN_CHECK_PAGE, pinCheckPageWorker);
  yield takeLatest(GET_QR, getQRWorker);
  yield takeLatest(RE_BUSINESS, Re_BusinessWorker);
  yield takeLatest(CHECK_PROFILE, checkProfileWorker);
  yield takeLatest(CHANGE_PW, changePasswordWorker);
  yield takeLatest(RESET_USERNAME, changeUsernameWorker);
  yield takeLatest(RESET_PIN, resetPinWorker);
  yield takeLatest(GET_TRANS, getTransWorker);
  yield takeLatest(CHECK_QR, checkQrWorker);
  yield takeLatest(PROFILE_DETAIL, getProfileDetailWorker);
}
