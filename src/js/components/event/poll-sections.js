import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import formatDate from '../../lib/formatDate';
import Button from '../common/Button';
import styles from '../../../styles';
import colours from '../../../styles/colours';
import BarChart from '../../components/event/bar-chart';
import jsonState from '../../testState/jsonStateEvent.json';

export const EventWhatSection = ({ text, tally, choiceClasses, labelClasses }) => { //eslint-disable-line
  return (
    <View style={styles.pollSection}>
      { (labelClasses) &&
        <View style={styles.columnLeft} />
      }
      { (!labelClasses) &&
        <View style={styles.columnLeft}>
          <Text style={styles.optionTitleWhat}>What</Text>
        </View>
      }
      { (!choiceClasses) &&
        <View style={styles.columnMiddlePoll}>
          <View style={styles.rowSpaced}>
            <Button buttonStyle={styles.optionDeselectedWhat} textStyle={styles.optionTextDeselectedWhat}>
              <Icon name="star" size={16} color={colours.what} />
              {' '}
              { text || 'TBC' }
            </Button>
          </View>
        </View>
      }
      { (choiceClasses) &&
        <View style={styles.columnMiddlePoll}>
          <View style={styles.rowSpaced}>
            <Button buttonStyle={styles.optionSelectedWhat} textStyle={styles.optionTextSelected}>
              <Icon name="star" size={16} color="white" />
              {' '}
              { text || 'TBC' }
            </Button>
          </View>
        </View>
      }
      <View style={styles.columnRight}>
        <View style={styles.chartRow}>
          <View
            style={{
              width: 1,
              backgroundColor: colours.what,
              marginLeft: 10 }}
          />

          <View style={styles.columnFlexStart}>
            <Text style={styles.msg4}>
              {(tally !== 0) && `  ${tally} votes`}
            </Text>
            <BarChart tally={tally} allData={jsonState.event.tally.eventWhat} chartColor={colours.what} />
          </View>
        </View>
      </View>
    </View>
  );
};

export const EventWhereSection = ({ text, tally, choiceClasses, labelClasses }) => { //eslint-disable-line

  const placeNameLong = text.placeName.length > 18;
  return (
    <View style={styles.pollSection}>
      { (labelClasses) &&
        <View style={styles.columnLeft} />
      }
      { (!labelClasses) &&
        <View style={styles.columnLeft}>
          <Text style={styles.optionTitleWhere}>Where</Text>
        </View>
      }
      { (!choiceClasses) &&
        <View style={styles.columnMiddlePoll}>
          <View style={styles.rowSpaced}>
            <Button buttonStyle={styles.optionDeselectedWhere} textStyle={styles.optionTextDeselectedWhere}>
              <Icon name="map-marker" size={16} color={colours.where} />
              {' '}
              { (!placeNameLong) &&
                <Text style={styles.placeNameShort}>
                  { text.placeName || 'TBC' }
                </Text>
              }
              { (placeNameLong) &&
                <Text style={styles.placeNameLong}>
                  { text.placeName || 'TBC' }
                </Text>
              }

              {
                text.placeAddress !== '' &&
                <Text style={styles.placeAddress}>
                  { text.placeAddress }
                </Text>
              }
            </Button>
          </View>
        </View>
      }
      { (choiceClasses) &&
        <View style={styles.columnMiddlePoll}>
          <View style={styles.rowSpaced}>
            <Button buttonStyle={styles.optionSelectedWhere} textStyle={styles.optionTextSelected}>
              <Icon name="map-marker" size={16} color="white" />
              {' '}
              { (!placeNameLong) &&
                <Text style={styles.placeNameShort}>
                  { text.placeName || 'TBC' }
                </Text>
              }
              { (placeNameLong) &&
                <Text style={styles.placeNameLong}>
                  { text.placeName || 'TBC' }
                </Text>
              }

              {
                text.placeAddress !== '' &&
                <Text style={styles.placeAddress}>
                  { text.placeAddress }
                </Text>
              }
            </Button>
          </View>
        </View>
      }
      <View style={styles.columnRight}>
        <View style={styles.chartRow}>
          <View
            style={{
              width: 1,
              backgroundColor: colours.where,
              marginLeft: 10 }}
          />

          <View style={styles.columnFlexStart}>
            <Text style={styles.msg4}>
              {(tally !== 0) && `  ${tally} votes`}
            </Text>
            <BarChart tally={tally} allData={jsonState.event.tally.eventWhere} chartColor={colours.where} />
          </View>
        </View>
      </View>
    </View>
  );
};

export const EventWhenSection = ({ text, tally, choiceClasses, labelClasses }) => { //eslint-disable-line
  return (
    <View style={styles.pollSection}>
      { (labelClasses) &&
        <View style={styles.columnLeft} />
      }
      { (!labelClasses) &&
        <View style={styles.columnLeft}>
          <Text style={styles.optionTitleWhen}>When</Text>
        </View>
      }
      { (!choiceClasses) &&
        <View style={styles.columnMiddlePoll}>
          <View style={styles.rowSpaced}>
            <Button buttonStyle={styles.optionDeselectedWhen} textStyle={styles.optionTextDeselectedWhen}>
              <Icon name="calendar" size={16} color={colours.when} />
              {' '}
              { formatDate(text.date, 'half') || 'TBC' }
              {'  '}
              <Icon name="clock-o" size={16} color={colours.when} />
              {' '}
              { text.time || 'TBC' }
            </Button>
          </View>
        </View>
      }
      { (choiceClasses) &&
        <View style={styles.columnMiddlePoll}>
          <View style={styles.rowSpaced}>
            <Button buttonStyle={styles.optionSelectedWhen} textStyle={styles.optionTextSelected}>
              <Icon name="calendar" size={16} color="white" />
              {' '}
              { formatDate(text.date, 'half') || 'TBC' }
              {'  '}
              <Icon name="clock-o" size={16} color="white" />
              {' '}
              { text.time || 'TBC' }
            </Button>
          </View>
        </View>
      }
      <View style={styles.columnRight}>
        <View style={styles.chartRow}>
          <View
            style={{
              width: 1,
              backgroundColor: colours.when,
              marginLeft: 10 }}
          />

          <View style={styles.columnFlexStart}>
            <Text style={styles.msg4}>
              {(tally !== 0) && `  ${tally} votes`}
            </Text>
            <BarChart tally={tally} allData={jsonState.event.tally.eventWhen} chartColor={colours.when} />
          </View>
        </View>
      </View>
    </View>
  );
};
