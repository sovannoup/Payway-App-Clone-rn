import {connect} from 'react-redux';
import ScreenHome from '../Screens/ScreenHome';
import {f_checkPin, f_get_qr, f_checkProfile} from '../Modules/User/reducer';
const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = {
  f_checkPin,
  f_get_qr,
  f_checkProfile,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenHome);
