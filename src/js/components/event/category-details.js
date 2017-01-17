import React, { PropTypes } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import BarChart from '../../components/event/bar-chart';
import colours from '../../../styles/colours';
// import styles from '../../../styles';

const CategoryDetails = ({ category, data }) => {

  const categoryTitle = `W${category.substring(1)}`;

  const icons = {
    what: 'star',
    where: 'map-marker',
    when: 'calendar'
  };

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

  return (
    <View style={ { paddingTop: 80 } }>
      {
        data.map((datum, i) => {

          if (category === 'when') {
            return (
              <View key={JSON.stringify(datum)} style={{ flexDirection: 'row' }}>

                <View style={{ width: 150 }}>
                  <Text style={{ alignSelf: 'center' }}>{ i === 0 && categoryTitle }</Text>
                </View>

                <View>
                  <View>
                    <Icon.Button name={icons[category]} size={16} color={colours[category]} backgroundColor="#efefef" onPress={() => {}}>
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
                <Text style={{ alignSelf: 'center' }}>{ i === 0 && categoryTitle }</Text>
              </View>

              <View>
                <View>
                  <Icon.Button name={icons[category]} size={16} color={colours[category]} backgroundColor="#efefef" onPress={() => {}}>
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
};

export default CategoryDetails;

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
