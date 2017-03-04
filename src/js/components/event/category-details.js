/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React, { PropTypes, Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import formatDate from '../../lib/format-date';
import formatTime from '../../lib/format-time';
// import BarChart from '../../components/event/bar-chart';
import styles from '../../../styles';
import colours from '../../../styles/colours';

const OFF_WHITE = '#efefef';

export default class CategoryDetails extends Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedNodes: new Array(props.data.length).fill(false),
      isToggleable: props.data.length !== 1
    };
    this._handleOnPress = this._handleOnPress.bind(this);
    this.toggleHighlight = this.toggleHighlight.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.voteCount) {
      if (nextProps.voteCount.length > 1) {
        this.setState({
          selectedNodes: nextProps.voteCount
        });
      }
    }
  }

  _handleOnPress (category, selection, index) {
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
    const categoryTitle = `W${category.substring(1)}`;
    return (
      <View>
        {
          data.map((datum, index) => {
            return (
              <View key={JSON.stringify(datum)} style={{ flexDirection: 'row' }}>

                <View style={{ flexBasis: 50 }}>
                  <Text style={styles[`optionTitle${categoryTitle}`]}>{ index === 0 && categoryTitle }</Text>
                </View>

                <View style={{ flexBasis: 250 }}>
                  <View>
                    <Icon.Button
                      name={this.icons[category]}
                      size={16}
                      borderRadius={100}
                      color={(!this.state.isToggleable && colours[category]) || this.state.selectedNodes[index] ? OFF_WHITE : colours[category]}
                      backgroundColor={(!this.state.isToggleable && OFF_WHITE) || this.state.selectedNodes[index] ? colours[category] : OFF_WHITE}
                      onPress={() => this._handleOnPress(category, datum, index)}
                    >
                      {

                        <Text style={{ color: (!this.state.isToggleable && colours[category]) || this.state.selectedNodes[index] ? OFF_WHITE : colours[category] }}>
                          {category !== 'when' && (datum || 'TBC')}
                          {category === 'when' && `${formatDate(datum, 'half')}, ${formatTime(datum) || 'TBC'}`}
                        </Text>
                      }
                    </Icon.Button>
                  </View>
                </View>

                {
                  this.props.isHostPollView &&
                  <View>
                    <Text>{ voteCount[index] }</Text>
                  </View>
                }

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
