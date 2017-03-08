import { NavigationContext } from '@exponent/ex-navigation';
import Router from './router';
import { store } from './init-store';

class CustomNavigationContext extends NavigationContext {
  showModal (initialRouteName, initialRouteParams = {}) {
    const initialRoute = Router.getRoute(initialRouteName, initialRouteParams);
    const rootNavigator = this.getNavigator('root');
    const route = Router.getRoute('modal', { initialRoute });

    rootNavigator.push(route);
  }

  dismissModal () {
    const rootNavigator = this.getNavigator('root');
    rootNavigator.pop();
  }
}

export default new CustomNavigationContext({
  router: Router,
  store
});
