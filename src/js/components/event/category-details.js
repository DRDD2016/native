import PropTypes from 'prop-types';
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import formatDate from '../../lib/format-date';
import formatTime from '../../lib/format-time';
import BarChart from '../../components/event/bar-chart';
import { BarButton } from '../../../styles';
import { VoteText, OptionText, CategoryTitleText } from '../../../styles/text';
import { barScale, feedVertPaddingScale, moderateScale } from '../../../styles/scaling';
import colours from '../../../styles/colours';

const OFF_WHITE = colours.offWhite;

export default class CategoryDetails extends Component {

  constructor (props) {
    super(props);
    // console.log('category details - constructor props: ', props);
    this.state = {
      selectedNodes: new Array(props.data.length).fill(false),
      isToggleable: props.data.length !== 1
    };
    // console.log('category details - constructor state: ', this.state);
    this._handleOnPress = this._handleOnPress.bind(this);
    this.toggleHighlight = this.toggleHighlight.bind(this);
  }

  componentWillMount () {
    // console.log('category details - compWillMountprops', this.props);
    // hydrates the state with invitee's previous votes
    if (this.props.voteCount && !this.props.isHostPollView) {
      if (this.props.voteCount.length > 1) {
        this.setState({
          selectedNodes: this.props.voteCount
        });
      }
    }
    // console.log('cat details - compWillReceiveProps this.state: ', this.state);

  }

  componentWillReceiveProps (nextProps) {
    // console.log('category details - compWillReceiveNextprops');
    // hydrates the state with invitee's previous votes
    if (nextProps.voteCount && !this.props.isHostPollView) {
      if (nextProps.voteCount.length > 1) {
        this.setState({
          selectedNodes: nextProps.voteCount
        });
      }
    }
    // console.log('cat details - compWillReceiveProps this.state: ', this.state);
  }

  _handleOnPress (category, selection, index) {
    // console.log('handlingOnPress');
    if (this.state.isToggleable) {
      this.toggleHighlight(this.props.userIsHost, index);

      if (this.props.userIsHost) {
        this.props.toggleSelection(category, selection);
      } else {
        this.props.toggleSelection(category, index);
      }
    }
  }

  toggleHighlight (userIsHost, index) {
    let newNodes;
    if (userIsHost) { // host must select ONE option per category
      newNodes = new Array(this.props.data.length).fill(false);
      if (this.state.selectedNodes[index] === false) { // if toggling on
        newNodes[index] = !newNodes[index];
      }
    } else { // invitees can select multiple options per category
      newNodes = [...this.state.selectedNodes];
      newNodes[index] = !newNodes[index];
    }

    this.setState({
      selectedNodes: newNodes
    });
  }

  icons = {
    what: 'star',
    where: 'map-marker',
    when: 'calendar'
  }

  render () {
    const { category, data, voteCount } = this.props;
    // console.log('cat details Render Props: ', this.props);
    // console.log('voteCount: ', voteCount);

    const totalVoteCount = _.sum(voteCount);

    // console.log('totalVoteCount: ', totalVoteCount);

    const categoryTitle = `W${category.substring(1)}`;
    return (
      <View style={{ flex: 1 }}>
        {
          // need to sort array by date if CatDetails is "When" and keep Votes with associated dates
          data.map((datum, index) => {
            const tally = voteCount && voteCount[index];

            const key = (JSON.stringify(datum) === 0) ? JSON.stringify(`${index}${Math.random()}`) : JSON.stringify(`${datum}${Math.random()}`);
            const categoryTitleColour = colours.main; // colours[`${categoryTitle}`.toLowerCase()];

            return (
              <View key={key} style={{ paddingBottom: 2, flexDirection: 'column' }}>
                { index === 0 &&
                  <View style={{ paddingBottom: feedVertPaddingScale(4), paddingTop: feedVertPaddingScale(4) }}>
                    <CategoryTitleText style={{ color: categoryTitleColour }}>{ index === 0 && categoryTitle }</CategoryTitleText>
                  </View>
                }
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>


                  <View style={{ flex: this.props.isHostPollView ? 4 : 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                      <View style={{
                        flex: 1,
                        marginTop: 0,
                        marginBottom: 0,
                        elevation: 1,
                        shadowColor: colours.shadowColour,
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2
                      }}>
                        <Icon.Button
                          name={this.icons[category]}
                          size={moderateScale(16)}
                          borderRadius={5}
                          style={{ paddingHorizontal: 10, paddingVertical: 8 }}
                          color={(!this.state.isToggleable && colours[category]) || this.state.selectedNodes[index] ? OFF_WHITE : colours[category]}
                          backgroundColor={(!this.state.isToggleable && OFF_WHITE) || this.state.selectedNodes[index] ? colours[category] : OFF_WHITE}
                          onPress={() => this._handleOnPress(category, datum, index)}
                        >
                          {
                            <View style={{ flex: 4 }}>
                              <OptionText style={{ color: (!this.state.isToggleable && colours[category]) || this.state.selectedNodes[index] ? OFF_WHITE : colours[category] }}>
                                {category !== 'when' && (datum || 'TBC')}
                                {category === 'when' && `${formatDate(datum, 'half')}, ${formatTime(datum) || 'TBC'}`}
                              </OptionText>
                            </View>
                          }
                          {
                            (!this.state.isToggleable && OFF_WHITE) || this.state.selectedNodes[index]
                            ? <Icon name="check" size={20} style={{ textAlign: 'right', paddingLeft: 5 }} color={colours.white} />
                            : <Text />
                          }


                        </Icon.Button>

                      </View>
                    </View>
                  </View>
                  <View style={{ flex: this.props.isHostPollView ? 4 : 0, paddingLeft: this.props.isHostPollView ? moderateScale(5) : 0, justifyContent: 'center' }}>

                    {
                      this.props.isHostPollView &&
                      <BarButton style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>

                        {
                          (totalVoteCount !== 0) && (tally !== 0) && <View style={{ paddingLeft: 1, paddingVertical: 10, width: 1, backgroundColor: colours.spacerColour }} />
                        }

                        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                          <View style={{ height: barScale(18), justifyContent: 'center', alignItems: 'center' }}>

                            { (tally !== 0) && (tally !== undefined) && (tally !== 1) && <VoteText>{`${tally} votes`}</VoteText> }
                            { (tally === 1) && <VoteText>{`${tally} vote`}</VoteText> }

                            {
                              ((tally === 0) || (tally === undefined)) &&
                              <View style={{ flex: 1 }}>
                                <VoteText>{' '}</VoteText>
                              </View>
                            }
                          </View>

                          <View style={{ height: barScale(18), justifyContent: 'center' }}>

                            {
                              (tally !== 0) && (tally !== undefined) &&
                              <BarChart tally={tally} allData={voteCount} chartColor={colours[category]} />
                            }

                            { this.state.isToggleable && (index === 0) && (totalVoteCount === 0) && <VoteText>No votes yet</VoteText> }
                            { this.state.isToggleable && (totalVoteCount !== 0) && (tally === 0) && <VoteText>No votes</VoteText> }

                          </View>
                          <View style={{ height: barScale(18) }}>
                            <VoteText>{' '}</VoteText>
                          </View>

                        </View>

                      </BarButton>
                    }
                  </View>


                </View>
              </View>
            );
          })
        }
      </View>
    );
  }
}

CategoryDetails.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.oneOfType(
      [PropTypes.string, PropTypes.object]
    )
  ).isRequired,
  category: PropTypes.oneOf(
    ['what', 'where', 'when']
  ).isRequired
};
