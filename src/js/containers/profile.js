import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import Profile from '../components/profile';
import { changeName, editName } from '../actions/profile.old';

const mapStateToProps = ({ user }) => ({
  photo_url: user.photo_url,
  user_id: user.user_id,
  email: user.email,
  firstname: user.firstname,
  surname: user.surname
});

const mapDispatchToProps = dispatch => ({
  handleLogOut: (nav) => {
    AsyncStorage.removeItem('spark_token')
    .then(() => {
      const rootNavigator = nav.getNavigator('root');
      rootNavigator.replace('auth');
    });
  },
  handleChangeName: (category, e) => {
    dispatch(changeName(e.target.value, category));
  },
  handleEditName: (firstname, surname) => {
    dispatch(editName(firstname, surname));
  }
});


const ProfileContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Profile);

export default ProfileContainer;
