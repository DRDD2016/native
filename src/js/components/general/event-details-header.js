import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../../../styles';

const EventDetailsHeader = ({ location, name, description, hostPhotoURL }) => {

  const hideEventDetails = name === '' || description === '' || location === 'createEvent';

  if (!hostPhotoURL) {

    return (
      <View>
        { (hideEventDetails) &&
          <View />
        }
        { (!hideEventDetails) &&
          <View style={styles.rowEventDetailsHeader}>
            <View>
              <Text style={styles.eventDetailTextTitle}>
                { name }
              </Text>

              <Text style={styles.eventDetailText}>
                { description }
              </Text>
            </View>
          </View>
        }
      </View>
    );
  }
  return (
    <View>
      { (hideEventDetails) &&
        <View />
      }
      { (!hideEventDetails) &&
        <View>
          <View style={styles.rowEventDetailsHeader}>
            <View style={styles.columnLeft}>
              <View>
                <Image
                  source={{ uri: hostPhotoURL }}
                  style={styles.uiEventDetailPhotoCircularImage}
                />
              </View>
            </View>
            <View style={styles.columnMiddle}>

              <View style={styles.rowCentered}>
                <View style={styles.columnCentered}>

                  <Text style={styles.eventDetailTextTitle}>
                    { name }
                  </Text>
                  <Text style={styles.eventDetailText}>
                    { description }
                  </Text>
                </View>
              </View>

            </View>
          </View>
        </View>
      }
    </View>

  );
};

export default EventDetailsHeader;
