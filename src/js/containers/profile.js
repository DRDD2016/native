import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import Profile from '../components/profile';
import { changeName, editName, uploadPhoto } from '../actions/profile';

const mapStateToProps = ({ nav, user, network }) => ({
  nav,
  photo_url: user.photo_url,
  user_id: user.user_id,
  email: user.email,
  firstname: user.firstname,
  surname: user.surname,
  isFetching: user.isFetching,
  errorUpdate: user.errorUpdate,
  isFetchingUpload: user.isFetchingUpload,
  errorUpload: user.errorUpload,
  isConnected: network.isConnected
});

const mapDispatchToProps = dispatch => ({
  handleChangeName: (text, category) => {
    dispatch(changeName(text, category));
  },
  handleEditName: (firstname, surname) => {
    AsyncStorage.getItem('spark_token')
    .then((token) => {
      AsyncStorage.getItem('spark_user_id')
      .then((user_id) => {
        if (token && user_id) {
          dispatch(editName(token, user_id, firstname, surname));
        }
      });
    });
  },
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


const ProfileContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile);

export default ProfileContainer;
