import {connect} from 'react-redux';
import ScreenStartup from '../Screens/StartUp/StartupScreen';
import {startupWorker} from '../Modules/app/reducer';
const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = {
  startupWorker,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenStartup);
