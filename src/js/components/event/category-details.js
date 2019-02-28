import PropTypes from 'prop-types';
/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import CategoryButton from '../../components/event/category-button';
import BarChartButton from '../../components/event/bar-chart-button';
import { CategoryTitleText } from '../../../styles/text';
import { feedVertPaddingScale, moderateScale } from '../../../styles/scaling';
import colours from '../../../styles/colours';


export default class CategoryDetails extends Component {

  constructor (props) {
    super(props);
    // console.log('category details - constructor props: ', props);
    this.state = {
      selectedNodes: new Array(props.data.length).fill(false),
      isToggleable: props.data.length !== 1,
      previousVoteCount: []
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

  componentDidMount () {
    console.log('categoryDetails did mount');


  }

  componentWillReceiveProps (nextProps) {
    // console.log('category details - compWillReceiveNextprops');
    // hydrates the state with invitee's previous votes
    console.log('receiving NextProps');
    console.log('this.props.voteCount', this.props.voteCount);
    if (nextProps.voteCount && !this.props.isHostPollView) {
      if (nextProps.voteCount.length > 1) {
        console.log('callingSetState');
        this.setState({
          selectedNodes: nextProps.voteCount,
          previousVoteCount: this.props.voteCount ? this.props.voteCount : nextProps.voteCount
        });
      }
    }

    if (nextProps.voteCount && this.props.isHostPollView) { // Host Poll View
      if (nextProps.voteCount.length > 1) {
        console.log('callingSetState');
        if (this.props.voteCount) {
          this.setState({
            previousVoteCount: this.props.voteCount
          });
        }

      }
    }
    // console.log('cat details - compWillReceiveProps this.state: ', this.state);
  }

  // shouldComponentUpdate (nextState) {
  //   return !_.isEqual(this.state, nextState);
  // }

  shouldComponentUpdate (nextProps) {
    console.log('this.props.data', this.props.data);
    console.log('nextProps.data', nextProps.data);
    if ((this.props.data === nextProps.data) && (this.props.voteCount === nextProps.voteCount)) {
      return true;
    }
    return true;

  }

  componentWillUpdate (nextProps, nextState) {
    if (nextState !== this.state) {
      console.log('catDetails thisState:', this.state);
      console.log('catDetails nextState:', nextState);
    }
    if (nextProps !== this.props) {
      console.log('catDetails thisProps:', this.props);
      console.log('catDetails nextProps:', nextProps);
    }
    if ((nextProps === this.props) && (nextState === this.state)) {
      console.log('catDetails componentUpdatingAnyway');
    }

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


  render () {
    const { category, data, voteCount } = this.props;
    const { previousVoteCount } = this.state;
    console.log('cat details Render Props: ', this.props);
    console.log('cat details previousVoteCount : ', previousVoteCount);
    console.log('cat details voteCount : ', voteCount);

    console.log('here1 ');
    const totalVoteCount = _.sum(voteCount);
    console.log('here2 ');

    // console.log('totalVoteCount: ', totalVoteCount);

    const categoryTitle = `W${category.substring(1)}`;
    // console.log('category', category);
    // console.log('this.state.isToggleable', this.state.isToggleable);
    console.log('here3 ');

    return (
      <View style={{ flex: 1 }}>
        {
          // need to sort array by date if CatDetails is "When" and keep Votes with associated dates
          data.map((datum, index) => {
            console.log('here4 ');
            const tally = voteCount && voteCount[index];
            console.log('voteCount', voteCount);
            if (voteCount) {
              console.log('voteCount[index]', voteCount[index]);
            }
            console.log('previousVoteCount', previousVoteCount);

            const previousTally = previousVoteCount && previousVoteCount[index];

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
                    <CategoryButton category={category} datum={datum} index={index} isToggleable={this.state.isToggleable} selectedNodeIndex={this.state.selectedNodes[index]} handleOnPress={this._handleOnPress} />
                  </View>
                  <View style={{ flex: this.props.isHostPollView ? 4 : 0, paddingLeft: this.props.isHostPollView ? moderateScale(5) : 0, justifyContent: 'center' }}>

                    {
                      this.props.isHostPollView &&
                      <BarChartButton totalVoteCount={totalVoteCount} tally={tally} previousTally={previousTally} voteCount={voteCount} category={category} index={index} isToggleable={this.state.isToggleable} />
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
