/* eslint-disable */
import React from 'react';
import moment from 'moment';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import formatDate from '../../lib/format-date';
import formatTime from '../../lib/format-time';
import styles from '../../../styles';
import colours from '../../../styles/colours';
import { Title3, Button, ButText } from '../../../styles';

const ConfirmWhen = ({ data }) => {

  // console.log('data: ', data);
  // const sortedData = _.sortBy(data, function(o) { return new moment(o); })
  //
  // console.log('sortedData: ', sortedData);
  const layout = data.map((timestamp, i) => {
    const hideTitle = i > 0;
    return (
      <View
        style={{ flexDirection: 'row', alignItems: 'center' }}
        key={ i }
      >
        { (hideTitle) &&
          <View style={{ flex: 150, marginHorizontal: 5 }} />
        }
        { (!hideTitle) &&
          <View style={{ flex: 150, marginHorizontal: 5 }}>
            <Title3 color={colours.when}>
              When
            </Title3>
          </View>
        }
        <View style={{ flex: 800 }}>
          <View style={{ }}>
            <View>
              <ButText color={colours.when}>
                <Icon name="calendar" size={18} color={colours.when} />
                {'  '}
                {
                  // in create/confirm view, timestamp will be an object: { date: DD-MM-YYYY, time: HH:mm }
                  // everywhere else will be ISO string
                  formatDate(timestamp)
                }
                {'  '}
                <Icon name="clock-o" size={18} color={colours.when} />
                {'  '}
                {
                  // in create/confirm view, timestamp will be an object: { date: DD-MM-YYYY, time: HH:mm }
                  // everywhere else will be ISO string, or for 'TBC' a modified ISO string with `:TBC` appended
                  formatTime(timestamp)
                }
              </ButText>
            </View>
          </View>
        </View>
      </View>
    );
  });

  console.log('confirmWhen finished');

  return (
    <View style={{ marginTop: 3, marginRight: 10 }}>
      { layout }
    </View>
  );
};

export default ConfirmWhen;
