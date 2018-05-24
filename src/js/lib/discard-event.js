import { StackActions, NavigationActions } from 'react-navigation';
import { clearCreateEvent } from '../actions/create';
import { deleteIncomingLink } from '../actions/network';
import { store } from '../init-store';

export default async function discardEvent (stack, navigation) {


  switch (stack) {
    case 'ScreenCreate': {
      store.dispatch(clearCreateEvent());

      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'ScreenCreate'
          })
          // NavigationActions.navigate({
          //   routeName: 'Feed'
          // })
        ]
      });

      await navigation.dispatch(resetAction);

      navigation.navigate('Feed');
      break;
    }
    case 'Event': {

      store.dispatch(deleteIncomingLink());

      const backAction = NavigationActions.back();

      await navigation.dispatch(backAction);


      break;

    }


    default:
  }

}
