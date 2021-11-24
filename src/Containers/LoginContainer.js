import {connect} from 'react-redux';
import ScreenLogin from '../Screens/Intro_Login_Signup/ScreenLogin';
import {f_login} from '../Modules/User/reducer';
const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = {
  f_login,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenLogin);
