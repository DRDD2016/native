import React, { PropTypes, Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import BarChart from '../../components/event/bar-chart';
import colours from '../../../styles/colours';
// import styles from '../../../styles';

export default class CategoryDetails extends Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedNodes: new Array(props.data.length).fill(false)
    };
    this._handleOnPress = this._handleOnPress.bind(this);
    this.toggleHighlight = this.toggleHighlight.bind(this);
  }

  _handleOnPress (category, selection, index) {
    this.props.toggleSelection(category, selection);
    this.toggleHighlight(index);
  }

  toggleHighlight (index) {
    const newNodes = [...this.state.selectedNodes];
    newNodes[index] = !newNodes[index];
    this.setState({
      selectedNodes: newNodes
    });
  }

  icons = {
    what: 'star',
    where: 'map-marker',
    when: 'calendar'
  }

  // const styles = {
  //   title: {
  //     flex: 1,
  //     fontSize: 12,
  //     fontWeight: 'bold',
  //     color: colours[category],
  //     paddingTop: 10
  //   },
  //   left: {
  //     // flex: 1.2,
  //     flexDirection: 'column',
  //     justifyContent: 'flex-start',
  //     alignItems: 'flex-start'
  //   },
  //   centre: {
  //     // flex: 3.8,
  //     flexDirection: 'column',
  //     justifyContent: 'flex-start',
  //     alignItems: 'flex-start',
  //     marginRight: 0
  //   },
  //   right: {
  //
  //   },
  //   row: {
  //     flex: 1,
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     alignItems: 'center'
  //   },
  //   button: {
  //     deselected: {
  //       component: {
  //         flex: 1,
  //         backgroundColor: colours.white,
  //         borderColor: colours[category],
  //         borderWidth: 1,
  //         borderRadius: 100,
  //         paddingTop: 8,
  //         paddingBottom: 8,
  //         paddingLeft: 15,
  //         paddingRight: 15,
  //         marginBottom: 2
  //       },
  //       text: {
  //         flex: 1,
  //         fontSize: 12,
  //         color: colours[category]
  //       }
  //     },
  //     selected: {
  //       component: {
  //         flex: 1,
  //         backgroundColor: colours[category],
  //         borderColor: colours[category],
  //         borderWidth: 1,
  //         borderRadius: 100,
  //         paddingTop: 8,
  //         paddingBottom: 8,
  //         paddingLeft: 15,
  //         paddingRight: 15,
  //         marginBottom: 2
  //       }
  //     },
  //     text: {
  //       flex: 1,
  //       fontSize: 12,
  //       color: colours.white,
  //       justifyContent: 'space-around'
  //     }
  //   }
  // };

  render () {
    const { category, data } = this.props;
    const categoryTitle = `W${category.substring(1)}`;

    return (
      <View style={ { paddingTop: 80 } }>
        {
          data.map((datum, index) => {

            if (category === 'when') {
              return (
                <View key={JSON.stringify(datum)} style={{ flexDirection: 'row' }}>

                  <View style={{ width: 150 }}>
                    <Text style={{ alignSelf: 'center' }}>{ index === 0 && categoryTitle }</Text>
                  </View>

                  <View>
                    <View>
                      <Icon.Button
                        name={this.icons[category]}
                        size={16} color={this.state.selectedNodes[index] ? '#efefef' : colours[category]}
                        backgroundColor={this.state.selectedNodes[index] ? colours[category] : '#efefef'}
                        onPress={() => this._handleOnPress(category, { date: datum.date, time: datum.time }, index)}
                      >
                        { datum.date }
                        { datum.time || 'TBC' }
                      </Icon.Button>
                    </View>
                  </View>
                </View>
              );
            }
            return (
              <View key={JSON.stringify(datum)} style={{ flexDirection: 'row' }}>

                <View style={{ width: 150 }}>
                  <Text style={{ alignSelf: 'center' }}>{ index === 0 && categoryTitle }</Text>
                </View>

                <View>
                  <View>
                    <Icon.Button
                      name={this.icons[category]}
                      size={16} color={this.state.selectedNodes[index] ? '#efefef' : colours[category]}
                      backgroundColor={this.state.selectedNodes[index] ? colours[category] : '#efefef'}
                      onPress={() => this._handleOnPress(category, datum, index)}
                    >
                      { datum || 'TBC' }
                    </Icon.Button>
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
