import {connect} from 'react-redux';
import ScreenBusiness from '../Screens/components/otherCom/manage';
import {f_pin_check_page, f_profile_detail} from '../Modules/User/reducer';

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = {
  f_pin_check_page,
  f_profile_detail,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenBusiness);
