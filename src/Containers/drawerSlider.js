import {connect} from 'react-redux';
import drawerSlider from '../Screens/DrawerSlider/drawerSlider';
import {} from '../Modules/User/reducer';

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(drawerSlider);
