import React, { Component } from 'react';
import { Dimensions, Platform, BackHandler, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import ViewOverflow from 'react-native-view-overflow';
import Tips from 'react-native-tips';
import { Header, createStackNavigator, createBottomTabNavigator, createDrawerNavigator, NavigationActions } from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigationService from './navigationService';
// import IconN from './components/general/icon';
// import Icon2 from 'react-native-vector-icons/Entypo';
// import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import colours from '../styles/colours';
import MyStatusBar, { STATUSBAR_HEIGHT } from './components/common/StatusBar';
import BannerBar from './components/common/BannerBar';
import CreateButton from './components/common/createButton';
// import { AddCreateButton } from '../styles';
import { TabBarText } from '../styles/text';
import { scale, moderateScale } from '../styles/scaling';
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
import { nextTips } from './actions/tips';
import { store } from './init-store';
// import CreateButton from './components/general/create-button';
// import Modal from './components/modal';

const NAVBAR_HEIGHT = Header.HEIGHT;
const TABBAR_HEIGHT = Platform.OS === 'ios' ? moderateScale(NAVBAR_HEIGHT - STATUSBAR_HEIGHT) + 8 : moderateScale(NAVBAR_HEIGHT) - 2;
// console.log('NAVBAR_HEIGHT', NAVBAR_HEIGHT);
// console.log('STATUSBAR_HEIGHT', STATUSBAR_HEIGHT);
// console.log('TABBAR_HEIGHT', TABBAR_HEIGHT);

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
                    size={moderateScale(28)}
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
                    size={moderateScale(28)}
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
                <View />
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
                    size={moderateScale(28)}
                  />
                  <TabBarText color={tintColor} >Feed</TabBarText>
                </View>
              )
            })
          },
          Code: { screen: createStackNavigator({ ScreenRsvp: { screen: CodeContainer } }),
            navigationOptions: ({ screenProps }) => ({
              tabBarIcon: ({ tintColor }) => {

                const { tipsNo, handleNextTips } = screenProps;
                return (
                  <View style={{ height: TABBAR_HEIGHT, alignItems: 'center', justifyContent: 'center' }}>
                    <Tips
                      tooltipContainerStyle={{ left: -TABBAR_HEIGHT * 6, borderWidth: 1, borderColor: 'red' }}
                      contentStyle={{ borderWidth: 0, borderColor: 'blue' }}
                      childrenStyle={{ borderWidth: 0, borderColor: 'yellow' }}
                      visible={ tipsNo === 1 }
                      position="left"
                      // offsetLeft={280}
                      onRequestClose={() => handleNextTips()}
                      delay={500}

                      text="or tap RSVP to respond to a friend's event."
                    >


                      <Icon
                        name="link"
                        color={tintColor}
                        size={moderateScale(28)}
                      />
                      <TabBarText color={tintColor} >RSVP</TabBarText>
                    </Tips>
                  </View>


                );
              }
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
                jumpTo,
                screenProps
            } = props;

            // const { tipsNo } = screenProps;
            console.log('TabBarProps.screenProps:', screenProps);
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
                            <TouchableOpacity
                              style={{ }}
                              onPress={() => jumpTo(route.key)}
                            >
                              {renderIcon({
                                route,
                                focused: index === idx,
                                tintColor: index === idx ? activeTintColor : inactiveTintColor
                              })}

                            </TouchableOpacity>


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
              fontSize: Platform.OS === 'ios' ? scale(12) : 14,
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
); // not sure if this is still used?

export const addListener = createReduxBoundAddListener('root');


class AppWithNavigationState extends Component {


  constructor (props) {
    super(props);

    // 1st step - Create your helper with keys that will represent your tips
    // this.waterfallTips = new Tips.Waterfall([
    //   'myTipsA',
    //   'myTipsB'
    // ]);
    //
    // this.state = {
    //
    // };
    //
    // // This method will trigger the changement of tips
    // this.handleNextTips = this.handleNextTips.bind(this);

    this.state = {
      showCreateButton: false
    };

  }


  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);

  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps);
    const currentRouteName = NavigationService.getRouteName(nextProps.nav);
    if ((currentRouteName === 'ScreenFeed')
      || (currentRouteName === 'ScreenCalendar')
      || (currentRouteName === 'ScreenSettings')
      || (currentRouteName === 'ScreenRsvp')
      ) {
      this.setState({ showCreateButton: true });
    } else {
      this.setState({ showCreateButton: false });
    }

    console.log('NavigationService.getCurrentRoute', currentRouteName);
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


  onCreatePress = () => {
    // const { dispatch } = this.props;
    NavigationService.navigate('Create');
    // dispatch(NavigationActions.navigate('Create'));
    // dispatch(NavigationActions.back());
    console.log('clicked:');
  };

  handleNextTips = () => {
    store.dispatch(nextTips());
  }

  // handleNavigationStateChange = (prevState, newState) => {
  //   console.log('newState:', newState);
  //   // this.props.setRoute(getCurrentRoute(newState));
  // };

  render () {
    const { showCreateButton } = this.state;
    const { dispatch, nav, tipsNo } = this.props;
    console.log('screenPropstips:', this.props.tipsNo); // forces this component to update when change of state, necessary to fire getCurrentRoute


    return (
      <SafeAreaView style={{ backgroundColor: colours.main, flex: 1 }}>
        <MyStatusBar backgroundColor={colours.main} barStyle="light-content" />
        <AppNavigator
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
          screenProps={{ tipsNo, handleNextTips: this.handleNextTips }}
          navigation = {{
            dispatch,
            state: nav,
            addListener
          }} />
        {
          (showCreateButton === true) &&
          <View style={{
            position: 'absolute',
            width: 60,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            bottom: 50,
            borderRadius: 30,
            backgroundColor: colours.main }}
          >
            <CreateButton
              tips={tipsNo}
              onPress={() => this.onCreatePress()}
              style={{ position: 'absolute', alignItems: 'center', zIndex: 97 }}
            />

          </View>
        }
      </SafeAreaView>

    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
  tipsNo: state.tips.tipsNo
});

// const mapDispatchToProps = dispatch => ({
//
//   handleNextTips: () => {
//     dispatch(nextTips());
//   }
// });

export default connect(mapStateToProps)(AppWithNavigationState);
