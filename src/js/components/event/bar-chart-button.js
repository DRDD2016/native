import React, { Component } from 'react';
import { View } from 'react-native';
import { BarButton } from '../../../styles';
import colours from '../../../styles/colours';
import { VoteText } from '../../../styles/text';
import BarChart from '../../components/event/bar-chart';

export default class BarChartButton extends Component {

  // constructor (props) {
  //   super(props);
  //
  //
  //   this.state = {
  //
  //   };
  // }

  componentDidMount () {
    console.log('bar Chart Button Did Mount');
  }

  shouldComponentUpdate (nextProps) {

    console.log('should?', this.props.voteCount === nextProps.voteCount);
    if (this.props.voteCount === nextProps.voteCount) {

      return false;
    }
      return true;


  }
  componentWillUpdate (nextProps) {
    if (nextProps !== this.props) {
      console.log('BarChartButton thisProps:', this.props);
      console.log('BarChartButton nextProps:', nextProps);
    } else {
      console.log('BarChartButton componentUpdatingAnyway');
    }

  }

  render () {
    const { totalVoteCount, tally, previousTally, voteCount, category, index, isToggleable } = this.props;

    return (
      <BarButton style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>

        {
          (totalVoteCount !== 0) && (tally !== 0) &&
          <View style={{ paddingLeft: 1, paddingVertical: 10, width: 1, backgroundColor: colours.spacerColour }} />
        }

        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            { (tally !== 0) && (tally !== undefined) && (tally !== 1) && <VoteText>{`${tally} votes`}</VoteText> }
            { (tally === 1) && <VoteText>{`${tally} vote`}</VoteText> }

            {
              ((tally === 0) || (tally === undefined)) &&
              <View style={{ flex: 1 }}>
                <VoteText>{' '}</VoteText>
              </View>
            }
          </View>

          <View style={{ flex: 1, justifyContent: 'center', height: '100%' }}>

            {
              (tally !== 0) && (tally !== undefined) &&
              <BarChart tally={tally} previousTally={previousTally} allData={voteCount} chartColor={colours[category]} />
            }

            { isToggleable && (index === 0) && (totalVoteCount === 0) && <VoteText>No votes yet</VoteText> }
            { isToggleable && (totalVoteCount !== 0) && (tally === 0) && <VoteText>No votes</VoteText> }

          </View>
          <View style={{ flex: 1 }}>
            <VoteText>{' '}</VoteText>
          </View>

        </View>

      </BarButton>
    );
  }
}
