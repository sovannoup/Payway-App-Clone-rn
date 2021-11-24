import {connect} from 'react-redux';
import ScreenTransaction from '../Screens/ScreenTransaction';
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
)(ScreenTransaction);
