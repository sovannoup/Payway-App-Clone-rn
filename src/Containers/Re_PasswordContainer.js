import {connect} from 'react-redux';
import Re_Password from '../Screens/Register/Re_Password';
import {f_register_Sms} from '../Modules/User/reducer';

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = {
  f_register_Sms,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Re_Password);
