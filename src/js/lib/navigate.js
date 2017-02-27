import { NavigationActions } from '@exponent/ex-navigation';
import { store } from '../init-store';
import Router from '../router';

/**
 * pushTo dispatches an action to navigate app to a given route
 * @param {string} route - route to navigate to
 * @returns {void}
 */

export function pushTo (route) { // eslint-disable-line import/prefer-default-export
  if (route) {
    const navigatorUID = store.getState().navigation.currentNavigatorUID;
    store.dispatch(NavigationActions.push(navigatorUID, Router.getRoute(route)));
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
    const navigatorUID = store.getState().navigation.currentNavigatorUID;
    store.dispatch(NavigationActions.immediatelyResetStack(navigatorUID, [Router.getRoute(route)], index));
  }
}


export function jumpTo (from, to) {
  NavigationActions.performAction(({ tabs, stacks }) => {
    tabs('main').jumpToTab(to);
    stacks(from).immediatelyResetStack([Router.getRoute(to)], 0);
  });
}
