import {connect} from 'react-redux';
import Re_ConfirmPin from '../Screens/Register/Re_ConfirmPin';
import {f_signup, f_login} from '../Modules/User/reducer';

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = {
  f_signup,
  f_login,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Re_ConfirmPin);
