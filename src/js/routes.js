import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import colours from '../styles/colours';

import Index from './components/auth';
import LoginContainer from './containers/auth/login';
import SignupContainer from './containers/auth/signup';
// import AlbumsContainer from './containers/albums';
import CalendarContainer from './containers/calendar';
import FeedContainer from './containers/feed';
import ProfileContainer from './containers/profile';
import DetailsContainer from './containers/create/details';
import WhatContainer from './containers/create/what';
import WhereContainer from './containers/create/where';
import WhenContainer from './containers/create/when';
import ConfirmContainer from './containers/create/confirm';
import EventContainer from './containers/event';
// import TabBar from './components/tab-bar';
import UploadPhoto from './containers/upload-photo';
import ConfirmEmailContainer from './containers/auth/confirm-email';
import EditContainer from './containers/edit';
import Code from './containers/code';
import Splash from './components/auth/splash';
// import Modal from './components/modal';

export const StackCode = StackNavigator({
  ScreenCode: {
    screen: Code
  }
}, {
  navigationOptions: {
    headerStyle: { backgroundColor: colours.transparent },
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor
  }
});

export const StackCalendar = StackNavigator({
  ScreenCalendar: {
    screen: CalendarContainer
  }
}, {
  navigationOptions: {
    headerStyle: { backgroundColor: colours.transparent },
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor
  }
});

export const StackFeed = StackNavigator({
  ScreenFeed: {
    screen: FeedContainer
  }
}, {
  navigationOptions: {
    headerStyle: { backgroundColor: colours.transparent },
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor
  }
});

export const StackProfile = StackNavigator({
  ScreenProfile: {
    screen: ProfileContainer
  }
}, {
  navigationOptions: {
    headerStyle: { backgroundColor: colours.transparent },
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor
  }
});

export const StackEvent = StackNavigator({
  Event: {
    screen: EventContainer
  },
  Edit: {
    screen: EditContainer
  }
}, {
  navigationOptions: {
    headerStyle: { backgroundColor: colours.transparent },
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor
  }
});

export const StackCreate = StackNavigator({
  ScreenCreate: {
    screen: DetailsContainer
  },
  What: {
    screen: WhatContainer
  },
  Where: {
    screen: WhereContainer
  },
  When: {
    screen: WhenContainer
  },
  Confirm: {
    screen: ConfirmContainer
  }
}, {
  navigationOptions: {
    headerStyle: { backgroundColor: colours.transparent },
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor
  }
});

export const Tabs = TabNavigator({
  Code: {
    screen: StackCode,
    navigationOptions: {
      tabBarLabel: 'Code',
      tabBarIcon: ({ tintColor }) =>
        <Icon name="barcode" size={28} color={tintColor} />
    }
  },
  Calendar: {
    screen: StackCalendar,
    navigationOptions: {
      tabBarLabel: 'Calendar',
      tabBarIcon: ({ tintColor }) =>
        <Icon name="calendar" size={28} color={tintColor} />
    }
  },
  Feed: {
    screen: StackFeed,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) =>
        <Icon name="globe" size={28} color={tintColor} />
    }
  },
  Profile: {
    screen: StackProfile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) =>
        <Icon name="user" size={28} color={tintColor} />
    }
  },
  Create: {
    screen: StackCreate,
    navigationOptions: {
      tabBarLabel: 'Create',
      tabBarIcon: ({ tintColor }) =>
        <Icon name="pencil" size={28} color={tintColor} />
    }
  }
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
  pressColor: colours.purple,
  initialRouteName: 'Feed',
  tabBarOptions: {
    showIcon: true,
    upperCaseLabel: false,
    activeTintColor: colours.blue,
    inactiveTintColor: colours.gray,
    indicatorStyle: {
      backgroundColor: colours.blue
    },
    style: {
      backgroundColor: colours.white
    }
  }
});

export const StackAuth = StackNavigator({
  auth: {
    screen: Index
  },
  login: {
    screen: LoginContainer
  },
  signup: {
    screen: SignupContainer
  },
  uploadPhoto: {
    screen: UploadPhoto
  },
  confirmEmail: {
    screen: ConfirmEmailContainer
  }
}, {
  navigationOptions: {
    headerStyle: { backgroundColor: colours.transparent },
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor
  }
});

export const StackSplash = StackNavigator({
  splash1: {
    screen: Splash
  },
  authMain: {
    screen: StackAuth
  }
}, { headerMode: 'none' }
);

export const StackRoot = StackNavigator({
  splash: {
    screen: StackSplash
  },
  tabsMain: {
    screen: Tabs
  },
  event: {
    screen: StackEvent
  }
}, {
  mode: 'modal',
  headerMode: 'none'
}, {
  initialRouteName: 'splash'
});
