import {connect} from 'react-redux';
import Re_Username from '../Screens/Register/Re_Username';
import {f_username_verify} from '../Modules/User/reducer';

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = {
  f_username_verify,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Re_Username);
