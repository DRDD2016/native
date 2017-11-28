
/* eslint-disable no-else-return */
import React, { Component } from 'react';
import { Text, View, TouchableHighlight, ScrollView, Modal } from 'react-native';
import update from 'immutability-helper';
import CategoryDetails from './category-details';
import styles from '../../../styles';
import Spinner from '../common/Spinner';

export default class InviteePoll extends Component {

  constructor (props) {
    super(props);
    console.log('inviteePoll constructor Props: ', this.props);

    const { what, where, when } = this.props.event;

    this.state = {
      eventdetails: {
        what: what.length > 1 ? new Array(what.length).fill(0) : [1],
        where: where.length > 1 ? new Array(where.length).fill(0) : [1],
        when: when.length > 1 ? new Array(when.length).fill(0) : [1]
      },
      isModalVisible: false
    };
    this.toggleSelection = this.toggleSelection.bind(this);

  }

  componentWillMount () {
    console.log('inviteePoll compWillMount: ', this.props);

    // new
    const { what, where, when } = this.props.event;

    if (this.props.voteCount) {
      this.setState({

        eventdetails: {
          what: what.length > 1 ? this.props.voteCount.what : [1],
          where: where.length > 1 ? this.props.voteCount.where : [1],
          when: when.length > 1 ? this.props.voteCount.when : [1]
        }

      });

    }
    console.log('InviteePoll this.state: ', this.state);
    //

  }

  componentWillReceiveProps (nextProps) {
    console.log('inviteePoll compWillReceiveNextprops: ', nextProps);
    const { what, where, when } = this.props.event;
    if (nextProps.voteCount && this.props.voteCount !== nextProps.voteCount) {
      this.setState({

        eventdetails: {
          what: what.length > 1 ? nextProps.voteCount.what : [1],
          where: where.length > 1 ? nextProps.voteCount.where : [1],
          when: when.length > 1 ? nextProps.voteCount.when : [1]
        }

      });

    }

  }

  toggleSelection (category, index) {

    const newArray = this.state.eventdetails[category];

    newArray[index] = parseInt(this.state.eventdetails[category][index], 10) ? 0 : 1;

    update(this.state.eventdetails, {
      [category]: { $set: newArray }
    });

    this.forceUpdate(); // forces this component to update to take account of child components updates
  }

  render () {

    const { event, handleVote, voteSaved, voteCount, navigator } = this.props;
    console.log('inviteePoll RenderProps: ', this.props);
    console.log('inviteePoll this.state.isModalVisible: ', this.state.isModalVisible);
    const allCategoriesSelected = Object.keys(this.state.eventdetails)
      .every(category => this.state.eventdetails[category].includes(1));

    return (

      <ScrollView>
        <Modal transparent animationType={'slide'} visible={this.state.isModalVisible} onRequestClose={() => { alert('Modal has been closed.'); }}>
          {
            <View style={styles.modalWrapper}>

              {
                !voteSaved &&
                <View style={styles.modalConfirm}>

                  <Text style={[styles.msg1, { flex: 1 }]}>Sending vote</Text>
                  <Text style={[styles.msg2, { flex: 1 }]}>please wait...</Text>
                  <Spinner size="large" />
                  <View style={{ flex: 1 }} />

                </View>
              }

              {
                voteSaved &&
                <View style={styles.modalConfirm}>

                  <Text style={[styles.msg1, { flex: 1 }]}>Vote Sent</Text>
                  <Text style={[styles.msg2, { flex: 1 }]}>Thanks for voting!</Text>
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
        <Text>{'Click the options below to vote on the poll '}</Text>
        <View style={styles.row}>

          <CategoryDetails
            category={'what'}
            data={event.what}
            toggleSelection={this.toggleSelection}
            voteCount={voteCount && voteCount.what}
          />
        </View>

        <View style={styles.row}>
          <CategoryDetails
            category={'where'}
            data={event.where}
            toggleSelection={this.toggleSelection}
            voteCount={voteCount && voteCount.where}
          />
        </View>

        <View style={styles.row}>
          <CategoryDetails
            category={'when'}
            data={event.when}
            toggleSelection={this.toggleSelection}
            voteCount={voteCount && voteCount.when}
          />
        </View>

        <View style={[styles.row, { justifyContent: 'center' }]}>
          {
            allCategoriesSelected &&
            <TouchableHighlight
              style={ [styles.confirmButton, { marginBottom: 20 }] }
              onPress={ () => {
                this.setState({
                  isModalVisible: true
                });
                return (
                  handleVote(this.state.eventdetails, event.event_id)
                );
              }}
            >
              <Text style={styles.confirmButtonText}>VOTE</Text>
            </TouchableHighlight>
          }
        </View>

      </ScrollView>

    );
  }
}
