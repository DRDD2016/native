import { connect } from 'react-redux';
import OfflineIcon from '../../components/common/offline-icon';


const mapStateToProps = ({ connectivity }) => {
  console.log('connectivity.isConnected:', connectivity.isConnected);

  return {
    isConnected: connectivity.isConnected
  };

};

const mapDispatchToProps = () => ({


});

const OfflineIconContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OfflineIcon);

export default OfflineIconContainer;
