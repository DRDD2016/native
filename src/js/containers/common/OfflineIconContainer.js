import { connect } from 'react-redux';
import OfflineIcon from '../../components/common/offline-icon';


const mapStateToProps = ({ network }) => {
  console.log('network', network);

  return {
    isConnected: network.isConnected
  };

};

const mapDispatchToProps = () => ({


});

const OfflineIconContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OfflineIcon);

export default OfflineIconContainer;
