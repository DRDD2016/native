import { connect } from 'react-redux';
import Profile from '../components/profile';
import { changeName, editName } from '../actions/profile';

const mapStateToProps = ({ profile }) => ({
  photo_url: profile.photo_url,
  user_id: profile.user_id,
  firstname: profile.firstname,
  surname: profile.surname,
  email: profile.email
});

const mapDispatchToProps = dispatch => ({
  handleLogOut: () => {
    console.log('log out');
  },
  handleChangeName: (inputType, e) => {
    dispatch(changeName(e.target.value, inputType));
  },
  handleEditName: (firstname, surname) => {
    dispatch(editName(firstname, surname));
  }
});


const ProfileContainer = connect(
    mapStateToProps,
    mapDispatchToProps)(Profile);

export default ProfileContainer;
