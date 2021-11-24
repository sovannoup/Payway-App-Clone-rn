import {connect} from 'react-redux';
import Re_PayAcc from '../Screens/Register/Re_PayAcc';
import {
  f_register_Sms,
  f_check_phone,
  f_username_verify,
} from '../Modules/User/reducer';

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = {
  f_register_Sms,
  f_check_phone,
  f_username_verify,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Re_PayAcc);
