import {connect} from 'react-redux';
import Re_Business from '../Screens/Register/Re_BusinessPf';
import {f_re_business, f_checkPin} from '../Modules/User/reducer';

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = {
  f_re_business,
  f_checkPin,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Re_Business);
