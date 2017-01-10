import { connect } from 'react-redux';
import Profile from '../components/profile';
// import removeCookie from '../lib/removeCookie';
import { changeName, editName } from '../actions/user';
import jsonState from '../testState/jsonState.json';

const mapStateToProps = () => {
  return {
    user: jsonState.user,
    firstName: jsonState.user.firstName,
    lastName: jsonState.user.lastName
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
    handleEditName: (firstName, lastName) => {
      dispatch(editName(firstName, lastName));
    }
  };
};


const ProfileContainer = connect(
    mapStateToProps,
    mapDispatchToProps)(Profile);

export default ProfileContainer;
