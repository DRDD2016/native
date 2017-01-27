import { connect } from 'react-redux';
import UploadPhoto from '../components/upload-photo';

const mapStateToProps = ({ user }) => ({
  firstname: user.firstname,
  surname: user.surname,
  email: user.email,
  user_id: user.user_id
});

export default connect(mapStateToProps)(UploadPhoto);
