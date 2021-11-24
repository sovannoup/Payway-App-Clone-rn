import {connect} from 'react-redux';
import PinRequireScreen from '../Screens/ScreenPinRequire';
import {f_pin_check_page} from '../Modules/User/reducer';

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = {
  f_pin_check_page,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PinRequireScreen);
