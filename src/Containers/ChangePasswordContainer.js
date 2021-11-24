import {connect} from 'react-redux';
import ChangePwScreen from '../Screens/components/otherCom/ChangePassword';
import {f_change_pw} from '../Modules/User/reducer';

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = {
  f_change_pw,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePwScreen);
