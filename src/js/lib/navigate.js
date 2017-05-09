// import { NavigationActions } from '@exponent/ex-navigation';
import { NavigationActions } from 'react-navigation';
// import { store } from '../init-store';
import Router from '../router';

/**
 * pushTo dispatches an action to navigate app to a given route
 * @param {string} route - route to navigate to
 * @param {object} params - params for target route (optional)
 * @returns {void}
 */

export function pushTo (route, params, navigation) {
  if (route) {
    console.log(route);
    console.log(params);
    console.log(navigation);
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: { params },
      action: NavigationActions.navigate({ routeName: route })
    });
    navigation.dispatch(navigateAction);

  }
}

/**
 * resetStackTo dispatches an action to navigate app to a given route and reset app stack
 * @param {string} route - route to navigate to
 * @param {number} index - stack index. Defaults to 0
 * @returns {void}
 */

export function resetStackTo (route, index = 0) {
  if (route) {
    NavigationActions.reset({
      index,
      actions: [
        NavigationActions.navigate({ routeName: route })
      ]
    });
  }
}

// export function resetStackTo (route, index = 0) {
//   if (route) {
//     const navigatorUID = store.getState().navigation.currentNavigatorUID;
//     store.dispatch(NavigationActions.immediatelyResetStack(navigatorUID, [Router.getRoute(route)], index));
//   }
// }

/**
 * jumpTo navigates from one TabNavigation tab to another
 * @param {string} from - tab route to navigate from
 * @param {string} to - tab route to navigate to
 * @returns {void}
 */

export function jumpTo (from, to) {
  NavigationActions.performAction(({ tabs, stacks }) => {
    tabs('main').jumpToTab(to);
    stacks(from).immediatelyResetStack([Router.getRoute(to)], 0);
  });
}

/**
 * popToTop redirects to the top of the stack
 * @param {object} nav - navigtion prop
 * @returns {void}
 */
export function popToTop (nav) {
  nav.performAction(({ tabs, stacks }) => { // eslint-disable-line no-unused-vars
    const { currentNavigatorUID } = nav.navigationState;
    if (nav.navigationState.currentNavigatorUID !== 'main') {
      stacks(currentNavigatorUID).popToTop(currentNavigatorUID);
    }
  });
}
