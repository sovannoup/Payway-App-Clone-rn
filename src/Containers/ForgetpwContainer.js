import {connect} from 'react-redux';
import ScreenForgetPw from '../Screens/Intro_Login_Signup/ScreenForgetPw';
import {} from '../Modules/User/reducer';

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenForgetPw);
