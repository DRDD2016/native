import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
// import Router from '../../router';
import ConfirmWhat from './confirm-what';
import ConfirmWhere from './confirm-where';
import ConfirmWhen from './confirm-when';
import Button from '../common/Button';
import styles from '../../../styles';
import colours from '../../../styles/colours';

export default class Confirm extends Component {

  // const nextPage = () => {
  //   navigation.performAction(({ tabs, stacks }) => {
  //     tabs('main').jumpToTab('feed');
  //     stacks('confirm').immediatelyResetStack([Router.getRoute('feed')], 0);
  //   });
  // };
  static route = {
    navigationBar: {
      title (params) {
        return params.name;
      },
      tintColor: colours.white,
      backgroundColor: colours.blue
    }
  }

  render () {
    const { what, where, when, description, note, handleOnPress } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{ description }</Text>
            <Text>{ note }</Text>
          </View>
          <ConfirmWhat data={what} />
          <ConfirmWhere data={where} />
          <ConfirmWhen data={when} />
          <View style={styles.rowCentered}>
            <Button
              buttonStyle={styles.confirmButton}
              textStyle={styles.confirmButtonText}
              onPress={ handleOnPress }
            >
              Invite friends
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
}
