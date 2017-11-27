import React from 'react';
import { Dimensions, Platform } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation';
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
import Splash from './containers/auth/splash';
// import Modal from './components/modal';

export const StackRoot = StackNavigator({
  splash: {
    screen: StackNavigator({
      splash1: { screen: Splash },
      authMain: { screen: StackNavigator({
        auth: { screen: Index },
        login: { screen: LoginContainer },
        signup: { screen: SignupContainer },
        uploadPhoto: { screen: UploadPhoto },
        confirmEmail: { screen: ConfirmEmailContainer }
      }, {
        navigationOptions: {
          headerStyle: { backgroundColor: colours.transparent },
          headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
          headerTintColor: colours.headerButtonColor
        }
      }) }
    }, { headerMode: 'none' }
    )
  },
  tabsMain: {
    screen: TabNavigator({
      Code: { screen: StackNavigator({ ScreenCode: { screen: Code, path: 'code/:eventcode' } }) },
      Calendar: { screen: StackNavigator({ ScreenCalendar: { screen: CalendarContainer } }) },
      Feed: { screen: StackNavigator({ ScreenFeed: { screen: FeedContainer } }) },
      Profile: { screen: StackNavigator({ ScreenProfile: { screen: ProfileContainer } }) },
      Create: { screen: StackNavigator({
        ScreenCreate: { screen: DetailsContainer },
        What: { screen: WhatContainer },
        Where: { screen: WhereContainer },
        When: { screen: WhenContainer },
        Confirm: { screen: ConfirmContainer } }),
        navigationOptions: {
          tabBarLabel: 'Create',
          tabBarIcon: ({ tintColor }) =>
            <Icon name="pencil" size={32} color={tintColor} />
        }
      }
    }, {
      tabBarPosition: 'bottom',
      swipeEnabled: true,
      // lazy: true, // added to attempt to stop Code loading until Feed has initialised.
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
          backgroundColor: colours.white,
          height: Platform.OS === 'ios' ? 60 : 100
        },
        tabStyle: {

        },
        iconStyle: {
          width: Dimensions.get('window').width / 5,
          height: 42
        },
        labelStyle: {
          fontSize: Platform.OS === 'ios' ? 12 : 14,
          fontWeight: Platform.OS === 'ios' ? '400' : '400',
          width: Dimensions.get('window').width / 5,
          marginBottom: 0
        }
      }
    })
  },
  event: { screen: StackNavigator({
    Event: { screen: EventContainer },
    Edit: { screen: EditContainer } })
  }
}, {
  mode: 'modal',
  headerMode: 'none'
}, {
  initialRouteName: 'splash'
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <StackRoot navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
