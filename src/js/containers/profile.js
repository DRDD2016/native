import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import Profile from '../components/profile';
import { changeName, editName } from '../actions/profile';

const mapStateToProps = ({ user }) => ({
  photo_url: user.photo_url,
  user_id: user.user_id,
  email: user.email,
  firstname: user.firstname,
  surname: user.surname,
  isFetching: user.isFetching,
  errorUpdate: user.errorUpdate
});

const mapDispatchToProps = dispatch => ({
  handleLogOut: (nav) => {
    AsyncStorage.removeItem('spark_token')
    .then(() => {
      const rootNavigator = nav.getNavigator('root');
      rootNavigator.replace('auth');
    });
  },
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
  }
});


const ProfileContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile);

export default ProfileContainer;
