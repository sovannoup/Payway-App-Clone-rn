import {connect} from 'react-redux';
import Reset_Username from '../Screens/components/otherCom/Reset';
import {f_reset_username} from '../Modules/User/reducer';

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = {
  f_reset_username,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reset_Username);
