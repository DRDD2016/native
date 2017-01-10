import { createRouter } from '@exponent/ex-navigation';
import Index from './components/auth';
import LoginContainer from './containers/auth/login';
import SignupContainer from './containers/auth/signup';
import Navbar from './components/navbar';

const Router = createRouter(() => ({
  auth: () => Index,
  login: () => LoginContainer,
  signup: () => SignupContainer,
  navbar: () => Navbar
}));

export default Router;
