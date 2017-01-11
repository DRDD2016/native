/* eslint-disable */
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import FeedItem from './feedItem';
import getUserID from '../lib/getUserID';
import TopBar from './event/top-bar';
import FilterPanel from './general/filter-panel';
import Button from './common/Button';
import Spinner from './common/Spinner';
// import Navbar from './general/navbar';
import styles from '../../styles';

const Feed = ({ navigator, allEvents, feed, isFetching,
  handleUpdateFeedItem, displaySome, displayAll, feedIsFiltered, isShowHosting }) => {

  const mappedFeed = feed.map((data, i) => {
    return (
      <FeedItem
        key={ i }
        index={ i }
        viewed={ data.viewed }
        eventID={ data.eventID }
        timestamp={ data.timestamp }
        isPoll={ data.isPoll }
        firstName={ data.firstName }
        lastName={ data.lastName }
        photoURL={ data.photoURL }
        eventWhat={ data.eventWhat }
        eventWhere={ data.eventWhere }
        eventWhen={ data.eventWhen }
        userIsHost={ data.hostID === getUserID() }
        hostID={ data.hostID }
        subjectID={ data.subjectID }
        handleUpdateFeedItem={ handleUpdateFeedItem }
        inviteesNumber={ data.inviteesNumber }
        eventName={ data.eventName }
        hasEdited={ data.hasEdited }
      />
    );
  });

  return (
    <View>

      {
        isFetching && <Spinner />
      }
      {
        !isFetching &&
        <View>
          <TopBar location="feed" />
          <Button onPress={ () => navigator.pop() }>
            BACK (test navigation stack)
          </Button>
        </View>
      }
      <View style={styles.filterPanelContainer}>
        {
          !isFetching && allEvents.length > 0 &&
          <FilterPanel
            displayAll={ displayAll }
            displaySome={ displaySome }
            dataIsFiltered={ feedIsFiltered }
            isShowHosting={ isShowHosting }
          />
        }
      </View>

      <ScrollView>
        <View style={styles.containerFeed}>

          {
            allEvents.length === 0 && !isFetching &&
            <Text style={styles.smallMessageText}>
              You have no events.
              (Why not create some?)
            </Text>
          }
          {
            feed.length === 0 && isShowHosting &&
              <Text style={styles.smallMessageText}>
                You are not hosting any events.
                (Why not create some?)
            </Text>
          }
          {
            feed.length === 0 && isShowHosting === false &&
              <Text style={styles.smallMessageText}>
                You have not been invited to any events.
              </Text>
          }
          {
            !isFetching && mappedFeed
          }
        </View>
      </ScrollView>

    </View>
  );
};

export default Feed;
