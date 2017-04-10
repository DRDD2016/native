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

  renderAlert = () => {
    setTimeout(() => {
      this.props.navigator.showLocalAlert('You are not connected to Internet!', {
        text: { color: '#fff' },
        container: { backgroundColor: 'red' }
      });
    }, 2000);
  }

  render () {
    const { user_id, allEvents, feed, isFetching, handleSelection, displaySome, displayAll, filterActive, selectedFilter, isConnected } = this.props;

    const mappedFeed = [].concat(feed).reverse().map(({ feed_item, id }, i) => {

      return (
        <FeedItem
          user_id={ user_id }
          key={ Math.random() }
          index={ i }
          event_id={ feed_item.event_id }
          timestamp={ feed_item.timestamp }
          name={ feed_item.name }
          is_poll={ feed_item.is_poll }
          what={ feed_item.what }
          where={ feed_item.where }
          when={ feed_item.when }
          userIsHost={ feed_item.host_user_id === user_id }
          hostID={ feed_item.host_user_id }
          firstname={ feed_item.firstname }
          surname={ feed_item.surname }
          photo_url={ feed_item.photo_url }
          subject_user_id={ feed_item.subject_user_id }
          viewed={ feed_item.viewed }
          edited={ feed_item.edited }
          handleSelection={ handleSelection }
          feed_item_id={ id }
        />
      );
    });

    return (
      <View style={{ flex: 1 }}>
        {
          !isFetching && allEvents.length > 0 &&
          <FilterPanel
            displayAll={ displayAll }
            displaySome={ displaySome }
            filterActive={ filterActive }
            selectedFilter={ selectedFilter }
          />
        }


        <ScrollView>
          <View style={styles.containerFeed}>
            { !isConnected && this.renderAlert() }

            {
              isFetching && <Spinner />
            }

            {
              allEvents.length === 0 && !isFetching &&
              <Text style={styles.smallMessageText}>
                You have no events.
                (Why not create some?)
              </Text>
            }
            {
              feed.length === 0 && selectedFilter === 'hosting' &&
                <Text style={styles.smallMessageText}>
                  You are not hosting any events.
                  (Why not create some?)
              </Text>
            }
            {
              feed.length === 0 && selectedFilter === 'received' &&
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
