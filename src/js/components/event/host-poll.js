import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, ScrollView, Modal } from 'react-native';
import CategoryDetails from './category-details';
import styles from '../../../styles';
import Spinner from '../common/Spinner';
import formatDate from '../../lib/format-date';
import formatTime from '../../lib/format-time';


const inlineStyle = {
  row: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    minHeight: 40
  }
};

export default class HostPoll extends Component {

  constructor (props) {
    super(props);
    console.log('this.props.event: ', this.props.event);
    const { what, where, when } = this.props.event;
    console.log('what: ', what);
    this.state = {
      eventdetails: {
        what: what.length === 1 ? what : [],
        where: where.length === 1 ? where : [],
        when: when.length === 1 ? when : []
      },
      isModalVisible: false
    };
    this.toggleSelection = this.toggleSelection.bind(this);
  }

  toggleSelection (category, selection) {

    if (!this.state.eventdetails[category].includes(selection)) {

      this.setState({
        eventdetails: { ...this.state.eventdetails, [category]: [selection] }
      });

    } else {
      this.setState({
        eventdetails: { ...this.state.eventdetails, [category]: [] }
      });
    }
  }


  render () {

    const { event, voteCount, handleConfirmEvent, finalChoices, isFetching, navigator } = this.props;

    const allCategoriesSelected = Object.keys(this.state.eventdetails)
      .map(category => this.state.eventdetails[category].length)
      .every(length => length === 1);

    return (
      <ScrollView style={{ borderWidth: 2, borderColor: 'red' }}>
        <Modal transparent animationType={'slide'} visible={this.state.isModalVisible} onRequestClose={() => { alert('Modal has been closed.'); }}>
          {
            <View style={styles.modalWrapper}>

              {
                !finalChoices &&
                <View style={styles.modalConfirm}>

                  <Text style={[styles.msg1, { flex: 1 }]}>Confirming event</Text>
                  <Text style={[styles.msg2, { flex: 1 }]}>please wait...</Text>
                  <Spinner size="large" />
                  <View style={{ flex: 1 }} />

                </View>
              }

              {
                finalChoices &&
                <View style={styles.modalConfirm}>
                  <Text style={[styles.msg1, { flex: 1 }]}>Event confirmed</Text>
                  <Text style={[styles.msg2, { flex: 1 }]}>Your event is now confirmed:</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.msg3}>What: {finalChoices.what}</Text>
                    <Text style={styles.msg3}>Where: {finalChoices.where}</Text>
                    <Text style={styles.msg3}>When: {formatDate(finalChoices.when[0])} {formatTime(finalChoices.when[0])}</Text>
                  </View>

                  <View style={{ flex: 1 }}>
                    <TouchableHighlight
                      style={ [styles.confirmButton, { marginBottom: 20, marginTop: 20 }] }
                      onPress={ () => {
                        this.setState({
                          isModalVisible: false
                        });

                        navigator.goBack(null);

                      }}
                    >
                      <Text style={styles.confirmButtonText}>OK</Text>
                    </TouchableHighlight>
                  </View>

                </View>
              }
            </View>
          }

        </Modal>

        {
          isFetching && <Spinner />
        }

        {
          !isFetching &&

          <View style={{ flexDirection: 'column' }}>
            <View style={{ marginHorizontal: 5, marginBottom: 10, alignItems: 'center' }}>
              <Text style={{ alignSelf: 'center', marginBottom: 5 }}>You created a poll for</Text>
              <Text style={[styles.msg1, { alignSelf: 'center', marginBottom: 5 }]}>{event.name}</Text>
              <Text style={[styles.msg5, { alignSelf: 'center' }]}>
                You can review the responses and tap to select your final choices and tap &quot;Confirm&quot; when you are ready:
              </Text>
            </View>

            <View style={ inlineStyle.row }>
              <CategoryDetails
                category={'what'}
                data={event.what}
                toggleSelection={this.toggleSelection}
                voteCount={voteCount && voteCount.what}
                userIsHost
                isHostPollView
              />
            </View>
            <View style={ inlineStyle.row }>
              <CategoryDetails
                category={'where'}
                data={event.where}
                toggleSelection={this.toggleSelection}
                voteCount={voteCount && voteCount.where}
                userIsHost
                isHostPollView
              />
            </View>
            <View style={ inlineStyle.row }>
              <CategoryDetails
                category={'when'}
                data={event.when}
                toggleSelection={this.toggleSelection}
                voteCount={voteCount && voteCount.when}
                userIsHost
                isHostPollView
              />
            </View>

            <View style={[styles.row, { justifyContent: 'center' }]}>
              {
                allCategoriesSelected &&
                <TouchableOpacity
                  style={ [styles.confirmButton, { marginBottom: 20 }] }
                  onPress={ () => {
                    this.setState({
                      isModalVisible: true
                    });
                    return (
                      handleConfirmEvent(this.state.eventdetails, event.event_id)
                    );
                  }}
                >
                  <Text style={[styles.confirmButtonText, { textAlign: 'center' }]}>CONFIRM EVENT DETAILS</Text>
                </TouchableOpacity>
              }
            </View>

          </View>
        }
      </ScrollView>
    );
  }
}
