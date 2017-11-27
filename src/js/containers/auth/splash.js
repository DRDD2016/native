import { connect } from 'react-redux';
import Splash from '../../components/auth/splash';

const mapStateToProps = ({ network }) => ({
  inComingLinkCode: network.inComingLinkCode,
  isFetching: network.isFetching
});

export default connect(mapStateToProps)(Splash);
