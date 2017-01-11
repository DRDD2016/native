import { connect } from 'react-redux';
import Profile from '../components/profile';
import { changeName, editName } from '../actions/profile';
import jsonState from '../testState/jsonState.json';

const mapStateToProps = () => {
  return {
    user: jsonState.profile,
    firstname: jsonState.profile.firstname,
    surname: jsonState.profile.surname
  };
};

const mapDispatchToProps = (dispatch) => {

  return {
    handleLogOut: () => {
      console.log('remove cookie');
    },
    handleChangeName: (inputType, e) => {
      dispatch(changeName(e.target.value, inputType));
    },
    handleEditName: (firstname, surname) => {
      dispatch(editName(firstname, surname));
    }
  };
};


const ProfileContainer = connect(
    mapStateToProps,
    mapDispatchToProps)(Profile);

export default ProfileContainer;
