import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { persistor, store } from '../init-store';
import Drawer from '../components/common/Drawer';
import { logout } from '../actions/profile';

const mapStateToProps = ({ nav }) => ({
  nav
});

const mapDispatchToProps = dispatch => ({
  handleLogOut: (navigation) => {
    AsyncStorage.removeItem('spark_token')
    .then(() => {
      AsyncStorage.removeItem('spark_user_id')
      .then(() => {

        const resetAction = StackActions.reset({
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({ routeName: 'splash' })
          ]
        });

        navigation.dispatch(resetAction);

        // const rootNavigator = nav.getNavigator('root');
        // rootNavigator.replace('auth');
        // clean up persisted state
        persistor.purge();
        store.getState().network.socket.disconnect();
        dispatch(logout());
        // redirect
      });
    });
  }
});


const DrawerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Drawer);

export default DrawerContainer;
