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
import styles from '../../../styles';
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

            return (
              <View key={JSON.stringify(datum)} style={{ flexDirection: 'row' }}>

                <View style={{ flex: 150 }}>
                  <Text style={styles[`optionTitle${categoryTitle}`]}>{ index === 0 && categoryTitle }</Text>
                </View>

                <View style={{ flex: 500 }}>
                  <View style={{ marginTop: 5, marginBottom: 5 }}>
                    <Icon.Button
                      name={this.icons[category]}
                      size={16}
                      borderRadius={15}
                      style={{ padding: 10 }}
                      color={(!this.state.isToggleable && colours[category]) || this.state.selectedNodes[index] ? OFF_WHITE : colours[category]}
                      backgroundColor={(!this.state.isToggleable && OFF_WHITE) || this.state.selectedNodes[index] ? colours[category] : OFF_WHITE}
                      onPress={() => this._handleOnPress(category, datum, index)}
                    >
                      {
                        <View style={{ flex: 4 }}>
                          <Text style={{ color: (!this.state.isToggleable && colours[category]) || this.state.selectedNodes[index] ? OFF_WHITE : colours[category] }}>
                            {category !== 'when' && (datum || 'TBC')}
                            {category === 'when' && `${formatDate(datum, 'half')}, ${formatTime(datum) || 'TBC'}`}
                          </Text>
                        </View>
                      }
                      {
                        (!this.state.isToggleable && OFF_WHITE) || this.state.selectedNodes[index]
                        ? <View style={{ flex: 1 }}><Icon name="check" size={20} style={{ paddingLeft: 5 }} color={colours.white} /></View>
                        : <Text />
                      }


                    </Icon.Button>

                  </View>
                </View>
                <View style={{ flex: 300, paddingLeft: 5, justifyContent: 'center' }}>

                  {
                    this.props.isHostPollView &&
                    <View style={{ flex: 1, marginTop: 5, marginBottom: 5, flexDirection: 'row', alignItems: 'center' }}>
                      {
                        (totalVoteCount !== 0) && <View style={{ paddingLeft: 1, paddingVertical: 10, width: 1, backgroundColor: 'lightgray' }} />
                      }

                      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                          <Text style={styles.msg4}>
                            { (tally !== 0) && (tally !== undefined) && (tally !== 1) && `${tally} votes` }
                            { (tally === 1) && `${tally} vote` }
                            { (index === 0) && (totalVoteCount === 0) && 'No votes yet' }
                          </Text>
                        </View>

                        <View style={{ flex: 1, justifyContent: 'center' }}>

                          {
                            (tally !== 0) && (tally !== undefined) &&
                            <BarChart tally={tally} allData={voteCount} chartColor={colours[category]} />
                          }

                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.msg4} />
                        </View>
                      </View>

                    </View>
                  }
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
