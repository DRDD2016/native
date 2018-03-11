// import PropTypes from 'prop-types';
/* eslint-disable*/
import React, { Component } from 'react';
import { View, Text, FlatList, Dimensions, Platform, Image } from 'react-native';
import Fabric from 'react-native-fabric';
import { Header } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarItem from './calendar-item';
import FilterPanel from './general/filter-panel';
import Spinner from './common/Spinner';
import ImageHeader from './common/ImageHeader';
import HeaderBack from './common/FeedHeaderBackground';
import FeedHeader from './common/FeedHeader';
import styles from '../../styles';
import colours from '../../styles/colours';
import { connectAlert } from './Alert';
import ButtonHeader from './common/ButtonHeader';
import BurgerIcon from './common/burger-icon';

const { Answers } = Fabric;
const logoHeight = Platform.OS === 'ios' ? Header.HEIGHT * 0.8 : Header.HEIGHT * 2;
const logo = require('../../img/sparkLoginLogo.png');

class Albums extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: <Image style={{ height: logoHeight, width: logoHeight * 3 }} source={ logo } resizeMode="contain" />,
    headerLeft: <ButtonHeader />,
    tabBarIcon: ({ tintColor }) =>
      <Icon name="photo" size={32} color={tintColor} />,
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor,
    header: props => <ImageHeader {...props} />,
    headerRight: <ButtonHeader
      onPress={() => navigation.navigate('DrawerOpen')}
    >
      <BurgerIcon />
    </ButtonHeader>,
  });

  componentWillMount () {
    console.log('albums compWillMount', this.props);
    const sortedData = this.props.filteredEvents.sort((a, b) => {
      return a.when[0] > b.when[0];
    });
    this.createDataSource(sortedData);

  }

  componentDidMount () {
    Answers.logCustom('Albums.js Mounted', { additionalData: 'nothing' });
  }

  componentWillReceiveProps (nextProps) {
    console.log('albums compWillReceiveNextprops', nextProps);
    const sortedData = nextProps.filteredEvents.sort((a, b) => {
      return a.when[0] > b.when[0];
    });
    this.createDataSource(sortedData);

  }

  createDataSource (calendar) {
    this.dataSource = calendar;
  }

  renderAlert = () => {
    setTimeout(() => {
      this.props.alertWithType('error', 'No connection', 'You are not connected to Internet!');
    }, 2000);
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
            isFetching && <Spinner />
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
                  data={this.dataSource}
                  extraData={this.state}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.event_id}
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

export default connectAlert(Albums);
