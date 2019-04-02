import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator (navigatorRef) {
  _navigator = navigatorRef;
}

function navigate (routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function getCurrentRoute () {
  // console.log('_navigator:', _navigator);

  // console.log('gettingRouteName:');

  if (!_navigator || (_navigator.props.navigation.state === null)) {
    return;
  }
  // console.log('gettingRouteName: there is some state');
  let route = _navigator.props.navigation.state;
  let currentRouteName = null;
  // console.log('gettingRouteName: currentroute:', route);
  while (route.routes) {
    route = route.routes[route.index];
    // console.log('gettingRouteName: this route:', route);
    currentRouteName = route.routeName;
  }
  // console.log('gettingRouteName: currentrouteName:', currentRouteName);
  return currentRouteName;

}

function getRouteName (navState) {
  // console.log('_navigator:', _navigator);

  // console.log('gettingRouteName:');

  if (!navState) {
    return;
  }
  // console.log('gettingRouteName: there is some state');
  let route = navState;
  let currentRouteName = null;
  // console.log('gettingRouteName: currentroute:', route);
  if (route.routes[route.index].isDrawerOpen === true) {
    return 'DrawerIsOpen';
  }
  while (route.routes) {
    route = route.routes[route.index];
    // console.log('gettingRouteName: this route:', route);
    currentRouteName = route.routeName;
  }
  // console.log('gettingRouteName: currentrouteName:', currentRouteName);
  return currentRouteName;

}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  getCurrentRoute,
  getRouteName
};
