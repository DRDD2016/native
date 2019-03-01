import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, ScrollView, TouchableHighlight } from 'react-native';
import { Header } from 'react-navigation';
import CategoryDetails from './category-details';
import ButtonSmall from '../common/ButtonSmall';
import DeleteIcon from '../common/delete-icon';
import ButtonWide from '../common/ButtonWide';
// import DeleteIcon from '../common/delete-icon';
import { styles, Msg1, Msg4, ConfirmButton, ConfirmButtonText } from '../../../styles';
import colours from '../../../styles/colours';
import { MessageText, ForgotPasswordText } from '../../../styles/text';
import { feedHorizPaddingScale, feedVertPaddingScale } from '../../../styles/scaling';
import Spinner from '../common/Spinner';

const headerHeight = Header.HEIGHT;
// console.log('Header height: ', Header.HEIGHT);

const inlineStyle = {
  row: {
    flexDirection: 'row',
    marginTop: feedVertPaddingScale(5),
    marginBottom: feedVertPaddingScale(5),
    paddingLeft: feedHorizPaddingScale(10),
    paddingRight: feedHorizPaddingScale(10)
    // minHeight: 40
  }
};

export default class HostPoll extends Component {

  constructor (props) {
    super(props);
    const { what, where, when } = this.props.event;
    this.state = {
      what: what.length === 1 ? what : [],
      where: where.length === 1 ? where : [],
      when: when.length === 1 ? when : []
    };
    this.toggleSelection = this.toggleSelection.bind(this);
  }

  componentDidMount () {
    console.log('HostPoll DidMount: ', this.props);
  }

  componentWillReceiveProps (nextProps) {

    console.log('HostPoll nextProps: ', nextProps);

  }

  componentWillUpdate (nextProps, nextState) {
    console.log('HostPoll willUpdate: ', nextProps);

// v test code
    if (nextState !== this.state) {
      console.log('HostPoll thisState:', this.state);
      console.log('HostPoll nextState:', nextState);
    }
    if (nextProps !== this.props) {
      console.log('HostPoll thisProps:', this.props);
      console.log('HostPoll nextProps:', nextProps);
    }
    if ((nextProps === this.props) && (nextState === this.state)) {
      console.log('HostPoll componentUpdatingAnyway');
    }

// ^ test code
    if (nextProps.finalChoices) {
      this.props.confirmedEvent();
    }
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
      handleDeleteEvent,
      isFetching } = this.props;

    const allCategoriesSelected = Object.keys(this.state)
      .map(category => this.state[category].length)
      .every(length => length === 1);

    // if (!finalChoices && isConfirming) {
    //
    // }

    // rethink what should happen to state and dialog


    return (
      <ScrollView>

        {
          isFetching && <Spinner />
        }

        {
          !isFetching &&

          <View style={{ flexDirection: 'column' }}>
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
              <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 20 }}>
                <ButtonWide
                  onPress={ () => handleInviteMoreFriends() }
                  backgroundColor={colours.green}
                  headerHeight={headerHeight}

                >
                  <View style={{ opacity: 0.9, justifyContent: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                    <ConfirmButtonText>Invite Friends</ConfirmButtonText>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                      <Icon name="user-plus" size={20} color={colours.white} />
                    </View>
                  </View>

                </ButtonWide>
              </View>

              <MessageText style={{ marginTop: 20, textAlign: 'center' }}>
                You can review the responses and tap to select your final choices when ready
              </MessageText>


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
                  style={{ marginBottom: 20, backgroundColor: colours.lightgray, borderColor: colours.lightgray }}
                  onPress={ () => { }}
                >
                  <ConfirmButtonText>CONFIRM EVENT DETAILS</ConfirmButtonText>
                </ConfirmButton>
              }

            </View>

            <MessageText style={{ textAlign: 'center' }}>or</MessageText>
            <TouchableHighlight
              style={{ paddingVertical: 20, paddingHorizontal: 20, flexDirection: 'row', alignSelf: 'center' }}
              onPress={ () => handleDeleteEvent(event, event.event_id) }
            >
              <View style={{ flexDirection: 'row' }}>

                <DeleteIcon color={colours.main} />
                <ForgotPasswordText>
                Delete this event
                </ForgotPasswordText>
              </View>
            </TouchableHighlight>


          </View>
        }
      </ScrollView>
    );
  }
}
