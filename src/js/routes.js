import React, { Component } from 'react';
import { Dimensions, Platform, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, TabNavigator, DrawerNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
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
    screen: DrawerNavigator({
      Spark: {
        screen: TabNavigator({
          Albums: { screen: StackNavigator({ ScreenAlbums: { screen: AlbumsContainer } }) },
          Calendar: { screen: StackNavigator({ ScreenCalendar: { screen: CalendarContainer } }) },
          Feed: { screen: StackNavigator({ ScreenFeed: { screen: FeedContainer } }) },
          Profile: { screen: StackNavigator({ ScreenProfile: { screen: ProfileContainer } }) },
          Create: { screen: StackNavigator({
            ScreenCreate: { screen: DetailsContainer },
            What: { screen: WhatContainer },
            Where: { screen: WhereContainer },
            When: { screen: WhenContainer },
            Note: { screen: NoteContainer },
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
            gesturesEnabled: false,
            showIcon: true,
            upperCaseLabel: false,
            activeTintColor: colours.blue,
            inactiveTintColor: colours.gray,
            indicatorStyle: {
              backgroundColor: colours.blue,
              height: 3
            },
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
            iconStyle: {
              // backgroundColor: 'lightblue',
              width: Dimensions.get('window').width / 5,
              height: 38
            },
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
      gesturesEnabled: false,
      drawerPosition: 'right',
      contentOptions: {
        inactiveTintColor: colours.blue,
        activeTintColor: colours.blue,
        activeBackgroundColor: colours.lightgray
      },
      contentComponent: DrawerContainer
    })

  },
  event: { screen: StackNavigator({
    Event: { screen: EventContainer },
    Edit: { screen: EditContainer } })
  },
  settings: { screen: StackNavigator({
    Settings: { screen: SettingsContainer } })
  },
  code: { screen: StackNavigator({
    Code: { screen: Code } })
  }
}, {
  mode: 'modal',
  headerMode: 'none'
}, {
  initialRouteName: 'splash'
});


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
    console.log('nav: ', nav);
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav
    });

    return <StackRoot navigation={navigation} />;
  }
}

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
