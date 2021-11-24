import {connect} from 'react-redux';
import NotificationScreen from '../Screens/components/otherCom/notification';
import {f_get_trans} from '../Modules/User/reducer';
const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = {
  f_get_trans,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationScreen);
