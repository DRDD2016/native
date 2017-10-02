import { NavigationActions } from 'react-navigation';
import { clearCreateEvent } from '../actions/create';
import { store } from '../init-store';

export default async function discardEvent (stack, navigation) {


  switch (stack) {
    case 'ScreenCreate': {
      store.dispatch(clearCreateEvent());

      const resetAction = NavigationActions.reset({
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

      navigation.dispatch(NavigationActions.back());
      break;
    }


    default:
  }

}
