import React, { Component } from 'react';
import { Dimensions, Platform, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator, NavigationActions } from 'react-navigation';
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import Icon from 'react-native-vector-icons/FontAwesome';
import colours from '../styles/colours';

import DrawerContainer from './containers/drawer';
import Index from './components/auth';
import LoginContainer from './containers/auth/login';
import SignupContainer from './containers/auth/signup';
import AlbumsContainer from './containers/albums';
import CalendarContainer from './containers/calendar';
import FeedContainer from './containers/feed';
import ProfileContainer from './containers/profile';
import SettingsContainer from './containers/settings';
import DetailsContainer from './containers/create/details';
import WhatContainer from './containers/create/what';
import WhereContainer from './containers/create/where';
import WhenContainer from './containers/create/when';
import NoteContainer from './containers/create/note';
import ConfirmContainer from './containers/create/confirm';
import EventContainer from './containers/event';
// import TabBar from './components/tab-bar';
import UploadPhoto from './containers/upload-photo';
import ConfirmEmailContainer from './containers/auth/confirm-email';
import EditContainer from './containers/edit';
import Code from './containers/code';
import Splash from './components/auth/splash';
// import Modal from './components/modal';

const { width } = Dimensions.get('window');
export const menuWidth = width > 700 ? (width * 0.6) : (width * 0.8);

export const AppNavigator = createStackNavigator({
  splash: {
    screen: createStackNavigator({
      splash1: { screen: Splash },
      authMain: { screen: createStackNavigator({
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
    screen: createDrawerNavigator({
      Spark: {
        screen: createBottomTabNavigator({
          Albums: { screen: createStackNavigator({ ScreenAlbums: { screen: AlbumsContainer } }),
            navigationOptions: () => ({
              tabBarIcon: ({ tintColor }) => (
                <Icon
                  name="photo"
                  color={tintColor}
                  size={32}
                  />
              )
            })
          },
          Calendar: { screen: createStackNavigator({ ScreenCalendar: { screen: CalendarContainer } }),
            navigationOptions: () => ({
              tabBarIcon: ({ tintColor }) => (
                <Icon
                  name="calendar"
                  color={tintColor}
                  size={32}
                  />
              )
            })
          },
          Feed: { screen: createStackNavigator({ ScreenFeed: { screen: FeedContainer } }),
            navigationOptions: () => ({
              tabBarIcon: ({ tintColor }) => (
                <Icon
                  name="globe"
                  color={tintColor}
                  size={32}
                  />
              )
            })
          },
          Profile: { screen: createStackNavigator({ ScreenProfile: { screen: ProfileContainer } }),
            navigationOptions: () => ({
              tabBarIcon: ({ tintColor }) => (
                <Icon
                  name="user"
                  color={tintColor}
                  size={32}
                  />
              )
            })
          },
          Create: { screen: createStackNavigator({
            ScreenCreate: { screen: DetailsContainer },
            What: { screen: WhatContainer },
            Where: { screen: WhereContainer },
            When: { screen: WhenContainer },
            Note: { screen: NoteContainer },
            Confirm: { screen: ConfirmContainer } }),
            navigationOptions: {
              tabBarLabel: 'Create',
              tabBarVisible: false,
              tabBarIcon: ({ tintColor }) =>
                <Icon name="pencil" size={32} color={tintColor} />
            }
          }
        }, {
          // swipeEnabled: false,
          // lazy: true, // added to attempt to stop Code loading until Feed has initialised.
          animationEnabled: true,
          // pressColor: colours.purple,
          initialRouteName: 'Feed',
          tabBarOptions: {
            // gesturesEnabled: false,
            showIcon: true,
            // upperCaseLabel: false,
            activeTintColor: colours.blue,
            inactiveTintColor: colours.gray,
            // indicatorStyle: {
            //   backgroundColor: colours.blue,
            //   height: 3
            // },
            style: {
              backgroundColor: colours.white,
              borderTopColor: colours.lightgray,
              borderTopWidth: 0,
              height: Platform.OS === 'ios' ? 60 : 70
            },
            tabStyle: {
              // backgroundColor: 'green',
              paddingTop: 4
            },
            // iconStyle: {
            //   // backgroundColor: 'lightblue',
            //   width: Dimensions.get('window').width / 5,
            //   height: 18
            // },
            labelStyle: {
              // backgroundColor: 'red',
              fontSize: Platform.OS === 'ios' ? 12 : 14,
              fontWeight: Platform.OS === 'ios' ? '400' : '400',
              width: Dimensions.get('window').width / 5,
              marginTop: 3
            }
          }
        })
      }

    }, {
      headerMode: 'float',
      title: 'Spark',
      initialRouteName: 'Spark',
      gesturesEnabled: true,
      drawerPosition: 'right',
      drawerWidth: menuWidth,
      contentOptions: {
        inactiveTintColor: colours.blue,
        activeTintColor: colours.blue,
        activeBackgroundColor: colours.lightgray
      },
      contentComponent: DrawerContainer
    })

  },
  event: { screen: createStackNavigator({
    Event: { screen: EventContainer },
    Edit: { screen: EditContainer } })
  },
  settings: { screen: createStackNavigator({
    Settings: { screen: SettingsContainer } })
  },
  code: { screen: createStackNavigator({
    Code: { screen: Code } })
  }
}, {
  mode: 'modal',
  headerMode: 'none'
}, {
  initialRouteName: 'splash'
});

export const navMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

export const addListener = createReduxBoundAddListener('root');

class AppWithNavigationState extends Component {

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    console.log('nav routes', nav.routes[0]);
    if (nav.routes[0].index === 4) {
      dispatch(NavigationActions.back());
      return true;
    } else if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render () {
    const { dispatch, nav } = this.props;

    return (
      <AppNavigator navigation = {{
        dispatch,
        state: nav,
        addListener
      }} />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav
});


export default connect(mapStateToProps)(AppWithNavigationState);
