import {connect} from 'react-redux';
import Re_SetupConfirmPin from '../Screens/Register/Re_SetupConfirmPin';
import {f_setup_pin} from '../Modules/User/reducer';

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = {
  f_setup_pin,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Re_SetupConfirmPin);
