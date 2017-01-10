import React from 'react';
import { View, Text } from 'react-native';
import Input from '../general/input';
import Router from '../../router';
import AddInput from '../general/add-input';
import EventDetailsHeader from '../general/event-details-header';
import Button from '../common/Button';
import styles from '../../../styles';

const Where = ({ name, description, data, addInput, removeInput, handleChange, navigator }) => { // eslint-disable-line react/prop-types

  const nextPage = () => {
    navigator.push(Router.getRoute('when'));
  };

  const inputs = data.map((value, i) => {

    return (
      <Input
        key={ i }
        handleChange={ () => handleChange(i) }
        inputKey={ i }
        inputCount={ data.length }
        value={ value }
        placeholder="Where?"
        removeInput={ removeInput }
      />
    );
  });

  const hideNext = data[0].placeName === '';

  return (
    <View>
      <View style={styles.rowEventDetailsHeader}>

        <EventDetailsHeader
          location="Enter details"
          name={ name }
          description={ description }
        />

      </View>
      <View style={ styles.container }>
        <Text style={ styles.smallMessageText} >
          Enter where the event will take place (or leave blank to decide it later).
        </Text>
        <Text style={ styles.smallMessageText }>
          You can add more than one option to create a poll.
        </Text>

        { inputs }

        <AddInput data={ data } handler={ addInput } />

        <View style={ styles.row }>
          { (hideNext) &&
            <View />
          }
          { (!hideNext) &&
            <Button
              buttonStyle={ styles.buttonStyle }
              onPress={ () => nextPage() }
            >
              Next
            </Button>
          }
        </View>
      </View>
    </View>
  );
};

export default Where;
