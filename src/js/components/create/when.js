import React, { Component } from 'react';
import { StatusBar, View, Text, ScrollView } from 'react-native';
import AddInput from '../general/add-input';
import HeaderBack from '../common/CreateHeaderBackground';
import ButtonHeader from '../common/ButtonHeader';
import BackIcon from '../common/back-icon';
import CloseButton from '../common/CloseButton';
import DateTime from '../common/date-time';
import styles, { HeaderText, ConfirmButton, ConfirmButtonText } from '../../../styles';
import colours from '../../../styles/colours';

export default class When extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: <ButtonHeader
      onPress={() => navigation.goBack(null)}
    >
      <BackIcon />
    </ButtonHeader>,
    headerRight: <CloseButton stack="ScreenCreate" nav={navigation} />,
    headerStyle: { borderTopWidth: 4, borderTopColor: colours.when, backgroundColor: colours.headerBackgroundColor, elevation: 0 },
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colours.headerTitleColor },
    headerTintColor: colours.headerButtonColor,
    headerTitle: <View style={{ alignItems: 'center', flex: 1 }}>
      <HeaderText>{navigation.state.params.name}</HeaderText>
    </View>
  });

  nextPage = (name) => {
    this.props.navigation.navigate('Note', { name });
  };

  render () {
    const { name, data, addInput, handleDate, handleTime, removeInput } = this.props;

    const hideNext = data[0].date === '';

    return (
      <View
        style={{ flex: 1, backgroundColor: colours.white }}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor={colours.when}
        />
        <HeaderBack />
        <ScrollView>
          <View style={{ flexDirection: 'column', alignItems: 'center', marginHorizontal: 15 }}>

            <Text style={[styles.msg4, { backgroundColor: colours.transparent, paddingTop: 10, paddingBottom: 10 }]}>
              Enter a date and a time for your event.  Dates are required, but you can leave the time as TBC.
            </Text>
            <Text style={[styles.msg4, { backgroundColor: colours.transparent, paddingTop: 10, paddingBottom: 10 }]}>
              You can add more than one option to create a poll.
            </Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            {
              data.map((datum, i) => {
                return (
                  <DateTime
                    data={datum}
                    handleDate={handleDate}
                    handleTime={handleTime}
                    removeInput={removeInput}
                    index={i}
                    key={Math.random()}
                  />
                );
              })
            }
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
                paddingLeft: 5,
                paddingRight: 5 }}
            >
              <AddInput colour={colours.when} data={ data } handler={ addInput } />
            </View>
          </View>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 0,
                marginBottom: 10,
                paddingLeft: 5,
                paddingRight: 5 }}
            >
              { (hideNext) &&
                <View />
              }
              { (!hideNext) &&
                <ConfirmButton
                  testDescription="Confirm When"
                  onPress={ () => this.nextPage(name) }
                  style={{ backgroundColor: colours.green }}
                >
                  <ConfirmButtonText>
                    NEXT
                  </ConfirmButtonText>

                </ConfirmButton>
              }
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
