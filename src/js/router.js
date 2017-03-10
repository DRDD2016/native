import { createRouter } from '@exponent/ex-navigation';
import Index from './components/auth';
import LoginContainer from './containers/auth/login';
import SignupContainer from './containers/auth/signup';
import AlbumsContainer from './containers/albums';
import CalendarContainer from './containers/calendar';
import FeedContainer from './containers/feed';
import ProfileContainer from './containers/profile';
import DetailsContainer from './containers/create/details';
import WhatContainer from './containers/create/what';
import WhereContainer from './containers/create/where';
import WhenContainer from './containers/create/when';
import ConfirmContainer from './containers/create/confirm';
import EventContainer from './containers/event';
import TabBar from './components/tab-bar';
import UploadPhoto from './containers/upload-photo';
import ConfirmEmailContainer from './containers/auth/confirm-email';
import EditContainer from './containers/edit';
import Code from './containers/code';
import Splash from './components/auth/splash';
import Modal from './components/modal';

const Router = createRouter(() => ({
  auth: () => Index,
  login: () => LoginContainer,
  signup: () => SignupContainer,
  albums: () => AlbumsContainer,
  calendar: () => CalendarContainer,
  feed: () => FeedContainer,
  profile: () => ProfileContainer,
  tabBar: () => TabBar,
  details: () => DetailsContainer,
  what: () => WhatContainer,
  where: () => WhereContainer,
  when: () => WhenContainer,
  confirm: () => ConfirmContainer,
  event: () => EventContainer,
  uploadPhoto: () => UploadPhoto,
  confirmEmail: () => ConfirmEmailContainer,
  edit: () => EditContainer,
  code: () => Code,
  splash: () => Splash,
  modal: () => Modal
}),
{ ignoreSerializableWarnings: true }
);

export default Router;
