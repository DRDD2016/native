import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import UploadPhoto from '../components/upload-photo';
import { uploadPhoto } from '../actions/profile';

const mapStateToProps = ({ user }) => ({
  firstname: user.firstname,
  surname: user.surname,
  email: user.email,
  user_id: user.user_id,
  photo_url: user.photo_url,
  isFetchingUpload: user.isFetchingUpload,
  errorUpload: user.errorUpload
});

const mapDispatchToProps = dispatch => ({

  handleUpload: (source) => {
    AsyncStorage.getItem('spark_token')
    .then((token) => {
      if (token) {
        const uri = source.uri;
        const fileName = uri.substr(uri.indexOf('.') + 1); // check iphone name is unique
        const fileType = uri.substr(uri.lastIndexOf('.') + 1);
        const formData = new FormData();
        formData.append('photo', {
          uri,
          name: `photo.${fileName}`,
          type: `image/${fileType}`
        });
        dispatch(uploadPhoto(token, formData));
      }
    });
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(UploadPhoto);
