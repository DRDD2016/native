import React, { Component } from 'react';
import { Dimensions, Platform, BackHandler, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import ViewOverflow from 'react-native-view-overflow';
import { Header, createStackNavigator, createBottomTabNavigator, createDrawerNavigator, NavigationActions } from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon2 from 'react-native-vector-icons/Entypo';
// import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import colours from '../styles/colours';
import MyStatusBar, { STATUSBAR_HEIGHT } from './components/common/StatusBar';
import BannerBar from './components/common/BannerBar';
import CreateButton from './components/common/createButton';
import { AddCreateButton, TabBarText } from '../styles';
import { moderateScale, verticalScale } from '../styles/scaling';
// import CustomTabBar from './components//general/customTabBar';
import DrawerContainer from './containers/drawer';
import Index from './components/auth';
import LoginContainer from './containers/auth/login';
import SignupContainer from './containers/auth/signup';
// import AlbumsContainer from './containers/albums';
import CalendarContainer from './containers/calendar';
import FeedContainer from './containers/feed';
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
import CodeContainer from './containers/code';
import Splash from './components/auth/splash';
// import CreateButton from './components/general/create-button';
// import Modal from './components/modal';

const NAVBAR_HEIGHT = Header.HEIGHT;
const TABBAR_HEIGHT = verticalScale(NAVBAR_HEIGHT - STATUSBAR_HEIGHT) + 8;
console.log('NAVBAR_HEIGHT', NAVBAR_HEIGHT);
console.log('STATUSBAR_HEIGHT', STATUSBAR_HEIGHT);
console.log('TABBAR_HEIGHT', TABBAR_HEIGHT);

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
          // Albums: { screen: createStackNavigator({ ScreenAlbums: { screen: AlbumsContainer } }),
          //   navigationOptions: () => ({
          //     tabBarIcon: ({ tintColor }) => (
          //       <View style={{ height: TABBAR_HEIGHT, alignItems: 'center', justifyContent: 'center' }}>
          //         <Icon
          //           name="image"
          //           color={tintColor}
          //           size={verticalScale(28)}
          //         />
          //         <TabBarText color={tintColor} >Albums</TabBarText>
          //       </View>
          //     )
          //   })
          // },
          settings: { screen: createStackNavigator({ ScreenSettings: { screen: SettingsContainer } }),
            navigationOptions: () => ({
              tabBarIcon: ({ tintColor }) => (
                <View style={{ height: TABBAR_HEIGHT, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon
                    name="user"
                    color={tintColor}
                    size={verticalScale(28)}
                  />
                  <TabBarText color={tintColor} >Profile</TabBarText>
                </View>
              )
            })
          },
          Calendar: { screen: createStackNavigator({ ScreenCalendar: { screen: CalendarContainer } }),
            navigationOptions: () => ({
              tabBarIcon: ({ tintColor }) => (
                <View style={{ height: TABBAR_HEIGHT, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon
                    name="calendar-o"
                    color={tintColor}
                    size={verticalScale(28)}
                  />
                  <TabBarText color={tintColor} >Calendar</TabBarText>
                </View>
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
              tabBarIcon: () => (
                <AddCreateButton style={{ position: 'absolute', alignItems: 'center', zIndex: 97 }}>
                  <Icon name="plus" size={verticalScale(28)} color={colours.white} />
                </AddCreateButton>
              )

            }
          },
          Feed: { screen: createStackNavigator({ ScreenFeed: { screen: FeedContainer } }),
            navigationOptions: () => ({
              tabBarIcon: ({ tintColor }) => (
                <View style={{ height: TABBAR_HEIGHT, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon
                    name="envelope"
                    color={tintColor}
                    size={verticalScale(28)}
                  />
                  <TabBarText color={tintColor} >Feed</TabBarText>
                </View>
              )
            })
          },
          Code: { screen: createStackNavigator({ ScreenRsvp: { screen: CodeContainer } }),
            navigationOptions: () => ({
              tabBarIcon: ({ tintColor }) => (
                <View style={{ height: TABBAR_HEIGHT, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon
                    name="link"
                    color={tintColor}
                    size={verticalScale(28)}
                  />
                  <TabBarText color={tintColor} >RSVP</TabBarText>
                </View>
              )
            })
          }

        }, {
          // swipeEnabled: false,
          // lazy: true, // added to attempt to stop Code loading until Feed has initialised.
          // animationEnabled: true,
          pressColor: colours.purple,
          initialRouteName: 'Feed',
          labeled: false,
          tabBarComponent: (props) => {
            const {
                navigation: { state: { index, routes } },
                style,
                activeTintColor,
                inactiveTintColor,
                renderIcon,
                jumpTo
            } = props;

            return (
              <ViewOverflow style={{
                  ...style,
                  flexDirection: 'row',
                  width: '100%',
                  backgroundColor: colours.white,
                  // height: 60,
                  borderTopColor: colours.main,
                  borderTopWidth: 0,
                  height: TABBAR_HEIGHT + 4,
                  alignItems: 'stretch'
              }}>
                <View style={{
                  width: '100%', flexDirection: 'column', alignItems: 'center' }}
                >
                  <BannerBar style={{ marginTop: 0, alignSelf: 'flex-start' }} />
                  <View style={{
                    width: '100%', flex: 1, flexDirection: 'row' }}
                  >


                    { // maybe add Tips here if +
                      routes.map((route, idx) => (

                        (route === 'Create') ?
                          <ViewOverflow
                            key={route.key}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center'

                            }}
                          >

                            <CreateButton onPress={() => jumpTo(route.key)}>
                              {renderIcon({
                                route,
                                focused: index === idx,
                                tintColor: index === idx ? activeTintColor : inactiveTintColor
                              })}
                            </CreateButton>

                          </ViewOverflow>

                        :
                          <ViewOverflow
                            key={route.key}
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center'

                            }}
                          >
                            <TouchableWithoutFeedback
                              style={{ }}
                              onPress={() => jumpTo(route.key)}
                            >
                              {renderIcon({
                                route,
                                focused: index === idx,
                                tintColor: index === idx ? activeTintColor : inactiveTintColor
                              })}

                            </TouchableWithoutFeedback>


                          </ViewOverflow>


                      ))
                    }
                  </View>
                </View>

              </ViewOverflow>
            );
          }, // new code
          tabBarOptions: {
            // gesturesEnabled: false,
            showIcon: true,
            showLabel: false,
            // upperCaseLabel: false,
            activeTintColor: colours.blue,
            inactiveTintColor: colours.gray,
            // indicatorStyle: {
            //   backgroundColor: colours.blue,
            //   height: 3
            // },
            style: {


            },
            tabStyle: {
              // backgroundColor: 'green',
              paddingTop: 4,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              // borderWidth: 2,
              // borderColor: 'blue',
              flex: 1
            },
            iconStyle: {
              // color: 'lightblue',
              // // width: Dimensions.get('window').width / 5,
              // // height: 18,
              // borderWidth: 2,
              // borderColor: 'red',
              // alignItems: 'center',
              // justifyContent: 'center'
            }, // has no effect
            labelStyle: {
              backgroundColor: 'red',
              fontSize: Platform.OS === 'ios' ? moderateScale(12) : 14,
              fontWeight: Platform.OS === 'ios' ? '400' : '400',
              marginTop: 3,
              flex: 1,
              borderWidth: 2,
              borderColor: 'green',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            } // doesn't center properly
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
    Edit: { screen: EditContainer } }, {
      mode: 'modal'

    })
  },
  settings: { screen: createStackNavigator({
    Settings: { screen: SettingsContainer } })
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
      <View style={{ flex: 1 }}>
        <MyStatusBar backgroundColor={colours.main} barStyle="light-content" />
        <AppNavigator navigation = {{
          dispatch,
          state: nav,
          addListener
        }} />
      </View>

    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav
});


export default connect(mapStateToProps)(AppWithNavigationState);
