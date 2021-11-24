import {connect} from 'react-redux';
import ScreenQR from '../Screens/ScreenScanQR';
import {f_check_qr} from '../Modules/User/reducer';

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = {
  f_check_qr,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenQR);
