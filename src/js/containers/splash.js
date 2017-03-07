import { connect } from 'react-redux';
import Splash from '../components/auth/splash';
import { setIsConnected } from '../actions/network';

const mapStateToProps = ({ network }) => {
  return {
    isConnected: network.isConnected
  };
};

const mapDispatchToProps = dispatch => ({
  handleConnect: (isConnected) => {
    dispatch(setIsConnected(isConnected));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
