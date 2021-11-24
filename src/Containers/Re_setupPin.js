import {connect} from 'react-redux';
import Re_setupPin from '../Screens/Register/Re_SetupPin';

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Re_setupPin);
