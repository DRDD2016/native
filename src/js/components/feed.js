import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import FeedItem from './feed-item';
import FilterPanel from './general/filter-panel';
import Spinner from './common/Spinner';
import styles from '../../styles';
import colours from '../../styles/colours';

export default class Feed extends Component {

  static route = {
    navigationBar: {
      title: 'Feed',
      backgroundColor: colours.blue,
      tintColor: colours.white
    }
  }

  render () {
    const { allEvents, feed, isFetching, handleSelection, displaySome, displayAll, feedIsFiltered, isShowHosting } = this.props;
    if (isFetching) {
      return <Spinner />;
    }
    const mappedFeed = [].concat(feed).reverse().map((data, i) => {
      return (
        <FeedItem
          key={ Math.random() }
          index={ i }
          event_id={ data.event_id }
          timestamp={ data.timestamp }
          name={ data.name }
          is_poll={ data.is_poll }
          what={ data.what }
          where={ data.where }
          when={ data.when }
          inviteesNumber={ 5 }
          userIsHost={ data.host_user_id === 1 }
          hostID={ data.host_user_id }
          firstname={ data.firstname }
          surname={ data.surname }
          photo_url={ data.photo_url }
          subject_user_id={ data.subject_user_id }
          viewed={ data.viewed }
          edited={ data.edited }
          handleSelection={ handleSelection }
        />
      );
    });

    return (
      <View>

        {
          isFetching && <Spinner />
        }


        {
          !isFetching && allEvents.length > 0 &&
          <FilterPanel
            displayAll={ displayAll }
            displaySome={ displaySome }
            dataIsFiltered={ feedIsFiltered }
            isShowHosting={ isShowHosting }
          />
        }


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
  }
}
