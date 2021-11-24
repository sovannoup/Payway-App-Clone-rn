import {connect} from 'react-redux';
import Reset_PinScreen from '../Screens/components/otherCom/resetPIN';
import {f_reset_pin} from '../Modules/User/reducer';

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = {
  f_reset_pin,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reset_PinScreen);
