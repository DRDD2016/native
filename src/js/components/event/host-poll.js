import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, ScrollView } from 'react-native';
import CategoryDetails from './category-details';
import { styles, Msg1, Msg2, Msg3, InviteSmallButton, ConfirmButton, ConfirmButtonText, ButText } from '../../../styles';
import colours from '../../../styles/colours';
import Spinner from '../common/Spinner';


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
      }
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

    const { event,
      voteCount,
      confirmedEvent,
      handleInviteMoreFriends,
      handleConfirmEvent,
      finalChoices,
      isFetching } = this.props;
    console.log('voteCount: ', voteCount);
    const allCategoriesSelected = Object.keys(this.state.eventdetails)
      .map(category => this.state.eventdetails[category].length)
      .every(length => length === 1);

    console.log('finalChoices: ', finalChoices);
    console.log('confirmedEvent: ', confirmedEvent);
    console.log('this.state: ', this.state);
    console.log('this.state.eventdetails: ', this.state.eventdetails);

    // if (!finalChoices && isConfirming) {
    //
    // }
    if (finalChoices) {
      confirmedEvent();
    }

    return (
      <ScrollView>

        {
          isFetching && <Spinner />
        }

        {
          !isFetching &&

          <View style={{ flexDirection: 'column' }}>
            <View style={{ marginHorizontal: 5, marginBottom: 20 }}>

              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

                <View
                  style={{ paddingHorizontal: 20, flex: 1, minWidth: 80, maxWidth: 150, marginHorizontal: 5 }}
                />

                <View style={{ flexShrink: 1, flexDirection: 'column', alignItems: 'center', marginHorizontal: 5 }}>
                  <Msg2 style={{ textAlign: 'center' }}>You created a poll for</Msg2>
                  <Msg1 style={{ textAlign: 'center' }}>{event.name}</Msg1>
                </View>

                <InviteSmallButton
                  style={{
                    minWidth: 90,
                    maxWidth: 150,
                    marginHorizontal: 5,
                    paddingHorizontal: 10,
                    flexDirection: 'row' }}
                  onPress={ () => handleInviteMoreFriends() }
                >
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexShrink: 1, flexDirection: 'column' }}>
                      <ButText style={{ color: colours.white, opacity: 0.9 }}>
                        {'Invite friends'}
                      </ButText>
                    </View>
                    <View style={{ flexGrow: 1, opacity: 0.9 }}>
                      <Icon name="user-plus" size={20} color={colours.white} />
                    </View>
                  </View>

                </InviteSmallButton>

              </View>

              <View style={{ marginTop: 10 }}>
                <Msg3>
                  You can review the responses and tap to select your final choices and tap &quot;Confirm&quot; when you are ready:
                </Msg3>
              </View>

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
                <ConfirmButton
                  style={{ marginBottom: 40 }}
                  onPress={ () => {
                    handleConfirmEvent(this.state.eventdetails, event.event_id);
                  }}
                >
                  <ConfirmButtonText>CONFIRM EVENT DETAILS</ConfirmButtonText>
                </ConfirmButton>
              }
            </View>

          </View>
        }
      </ScrollView>
    );
  }
}
