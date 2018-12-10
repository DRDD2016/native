import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, ScrollView } from 'react-native';
import { Header } from 'react-navigation';
import CategoryDetails from './category-details';
import ButtonSmall from '../common/ButtonSmall';
import { styles, Msg1, Msg3, Msg4, ConfirmButton, ConfirmButtonText } from '../../../styles';
import colours from '../../../styles/colours';
import Spinner from '../common/Spinner';

const headerHeight = Header.HEIGHT;
console.log('Header height: ', Header.HEIGHT);

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
      what: what.length === 1 ? what : [],
      where: where.length === 1 ? where : [],
      when: when.length === 1 ? when : []
    };
    this.toggleSelection = this.toggleSelection.bind(this);
  }

  toggleSelection (category, selection) {

    if (!this.state[category].includes(selection)) {

      this.setState({
        [category]: [selection]
      });

    } else {
      this.setState({
        [category]: []
      });
    }
  }


  render () {

    const { event,
      voteCount,
      handleInviteMoreFriends,
      handleConfirmEvent,
      finalChoices,
      isFetching } = this.props;
    console.log('voteCount: ', voteCount);
    const allCategoriesSelected = Object.keys(this.state)
      .map(category => this.state[category].length)
      .every(length => length === 1);

    console.log('finalChoices: ', finalChoices);
    console.log('this.state: ', this.state);


    // if (!finalChoices && isConfirming) {
    //
    // }
    if (finalChoices) {
      this.props.confirmedEvent();
    }

    return (
      <ScrollView>

        {
          isFetching && <Spinner />
        }

        {
          !isFetching &&

          <View style={{ flexDirection: 'column', borderWidth: 2, borderColor: 'red' }}>
            <View style={{ marginTop: 10, marginBottom: 10 }}>

              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

                <View
                  style={{ width: '20%', paddingHorizontal: 2 }}
                />

                <View style={{ width: '60%', flexDirection: 'column', alignItems: 'center' }}>

                  <Msg1 style={{ textAlign: 'center', marginBottom: 5 }}>{event.name}</Msg1>
                  <Msg4 style={{ textAlign: 'left' }}>created on: XX/XX/XX</Msg4>
                  <Msg4 style={{ textAlign: 'left' }}>voting closes: XX/XX/XX</Msg4>

                </View>

                <View style={{ width: '20%', paddingRight: 0, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <ButtonSmall
                    onPress={ () => handleInviteMoreFriends() }
                    backgroundColor={colours.green}
                    headerHeight={headerHeight}

                  >
                    <View style={{ opacity: 0.9, justifyContent: 'center', alignSelf: 'center' }}>
                      <Icon name="user-plus" size={20} color={colours.white} />
                    </View>

                  </ButtonSmall>
                </View>

              </View>

              <View style={{ marginTop: 20 }}>
                <Msg3>
                  You can review the responses and tap to select your final choices when ready
                </Msg3>
              </View>

            </View>

            <View style={ inlineStyle.row }>
              <CategoryDetails
                category="what"
                data={event.what}
                toggleSelection={this.toggleSelection}
                voteCount={voteCount && voteCount.what}
                userIsHost
                isHostPollView
              />
            </View>
            <View style={ inlineStyle.row }>
              <CategoryDetails
                category="where"
                data={event.where}
                toggleSelection={this.toggleSelection}
                voteCount={voteCount && voteCount.where}
                userIsHost
                isHostPollView
              />
            </View>
            <View style={ inlineStyle.row }>
              <CategoryDetails
                category="when"
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
                  onPress={ () => { handleConfirmEvent(this.state, event.event_id); }}
                >
                  <ConfirmButtonText>CONFIRM EVENT DETAILS</ConfirmButtonText>
                </ConfirmButton>
              }
              {
                !allCategoriesSelected &&
                <ConfirmButton
                  style={{ marginBottom: 40, backgroundColor: colours.lightgray, borderColor: colours.lightgray }}
                  onPress={ () => { }}
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
