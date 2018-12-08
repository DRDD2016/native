// import PropTypes from 'prop-types';
/* eslint-disable*/
import React, { Component } from 'react';
import { InteractionManager, ActivityIndicator, View, Text, FlatList, Dimensions, Platform, Image } from 'react-native';
import Fabric from 'react-native-fabric';
import { Header } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarItem from './calendar-item';
import FilterPanel from './general/filter-panel';
import BannerBar from './common/BannerBar';
import Spinner from './common/Spinner';
import ImageHeader from './common/ImageHeader';
import HeaderBack from './common/FeedHeaderBackground';
import FeedHeader from './common/FeedHeader';
import styles from '../../styles';
import colours from '../../styles/colours';
// import { connectAlert } from './Alert';
import ButtonHeader from './common/ButtonHeader';
import BurgerIcon from './common/burger-icon';
import OfflineIconContainer from '../containers/common/OfflineIconContainer';


const { Answers } = Fabric;
const logoHeight = Platform.OS === 'ios' ? Header.HEIGHT * 0.6 : Header.HEIGHT * 0.6;
const logo = require('../../img/sparkLoginLogo.png');

class Albums extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerForceInset: { top: 'never', bottom: 'never' },
    tabBarIcon: ({ tintColor }) =>
      <Icon name="photo" size={32} color={tintColor} />,
    headerLeft: <View style={{ paddingLeft: 1, alignItems: 'center', flex: 1 }}>
      <Image style={{ height: logoHeight, width: logoHeight * 3 }} source={ logo } resizeMode="contain" />
    </View>,
    headerRight: <View style={{ flexDirection: 'row', alignItems: 'center' }}>

      <OfflineIconContainer />
      <ButtonHeader
        onPress={() => navigation.openDrawer()}
      >
        <BurgerIcon />
      </ButtonHeader>
    </View>,
    headerStyle: { backgroundColor: colours.headerBackgroundColor },
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colours.headerTitleColor },
    headerTintColor: colours.headerButtonColor
  });

  state = {
    isReady : false
  }

  componentWillMount () {
    console.log('albums compWillMount', this.props);
    const sortedData = this.props.filteredEvents.sort((a, b) => {
      return a.when[0] > b.when[0];
    });
    this.createDataSource(sortedData);

  }

  componentDidMount () {
    console.log('albums DidMount');
    Answers.logCustom('Albums.js Mounted', { additionalData: 'nothing' });
    // 1: Component is mounted off-screen
    InteractionManager.runAfterInteractions(() => {
      // 2: Component is done animating
      // 3: Start fetching the team / or render the view
      // this.props.dispatchTeamFetchStart();

      console.log('albums Did Mount - interactions finished - expensive code starts');

      // expensive code starting


      // expensive code finished

      console.log('albums Did Mount - expensive code finished');

      this.setState({
         isReady: true
      })
    });
  }

  componentWillReceiveProps (nextProps) {
    console.log('albums WillReceiveProps');
    this.setState({
       isReady: false
    })
    // 1: Component is mounted off-screen
    InteractionManager.runAfterInteractions(() => {
      // 2: Component is done animating
      // 3: Start fetching the team / or render the view
      // this.props.dispatchTeamFetchStart();

      console.log('albums Will Receive Props - interactions finished - expensive code starts');

      // expensive code starting

      console.log('albums compWillReceiveNextprops', nextProps);
      const sortedData = nextProps.filteredEvents.sort((a, b) => {
        return a.when[0] > b.when[0];
      });
      this.createDataSource(sortedData);


      // expensive code finished

      console.log('albums WillReceiveProps - expensive code finished');

      this.setState({
         isReady: true
      })
    });

  }

  createDataSource (calendar) {
    this.dataSource = calendar;
  }

  renderItem = (item) => {

    const { event_id, host_user_id, status, name, what, where, when } = item.item;
    const { user_id, handleOnPress } = this.props;

    return (

        <CalendarItem

        />

    );
  }

  render () {

    console.log('renderAlbums');

    if (!this.state.isReady) {
      console.log('renderAlbumsActivityIndicator');

      return (
        <View style={{ backgroundColor: colours.background, flex: 1, alignItems: 'center', justifyContent: 'center' }}><Spinner /></View>
      );
    }

    console.log('renderAlbumsContent');

    const { allEvents, isFetching, displaySome, displayAll, filterActive, selectedFilter, user_id, isConnected } = this.props;

    return (
      <View style={{ flex: 1 }}>


        <View
          style={{
            flex: 1,
            backgroundColor: colours.white,
            borderBottomWidth: 1,
            borderBottomColor: colours.lightgray }}
        >

          {
            isFetching && <View style={{ backgroundColor: colours.background, flex: 1, alignItems: 'center', justifyContent: 'center' }}><Spinner /></View>
          }

          <View>

              {
                this.props.filteredEvents.length === 0 && !isFetching &&
                <View style={[styles.containerFeed, { alignItems: 'center' }]}>
                  <Text style={[styles.msg3, { marginTop: 80, marginHorizontal: 15 }]}>
                    Albums are coming to Spark soon.
                  </Text>
                </View>
              }

              {
                !isFetching && this.dataSource &&
                <View style={styles.containerFeed}>
                <FlatList
                  initialNumToRender={10}
                  data={this.dataSource}
                  extraData={this.state}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.event_id.toString()}
                />
                </View>
              }

          </View>
        </View>
      </View>
    );
  }
}


// Albums.propTypes = {
//   allEvents: PropTypes.array.isRequired,
//   isFetching: PropTypes.bool.isRequired,
//   displaySome: PropTypes.func.isRequired,
//   displayAll: PropTypes.func.isRequired,
//   filterActive: PropTypes.bool.isRequired,
//   selectedFilter: PropTypes.string,
//   filteredEvents: PropTypes.array.isRequired,
//   user_id: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.number
//   ]).isRequired,
//   handleOnPress: PropTypes.func.isRequired
// };

export default Albums;
