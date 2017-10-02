/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Input from '../general/input';
// import Router from '../../router';
import AddInput from '../general/add-input';
import Button from '../common/Button';
import ButtonHeader from '../common/ButtonHeader';
import ImageHeader from '../common/ImageHeader';
import HeaderBack from '../common/CreateHeaderBackground';
import styles from '../../../styles';
import colours from '../../../styles/colours';
// import discardEvent from '../../lib/discard-event';
import BackIcon from '../common/back-icon';
import CloseButton from '../common/CloseButton';

export default class What extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.name,
    headerLeft: <ButtonHeader
      onPress={() => navigation.goBack(null)}
    >
      <BackIcon />
    </ButtonHeader>,
    headerRight: <CloseButton stack="ScreenCreate" nav={navigation} />,
    headerTitleStyle: { color: colours.headerTitleColor, alignSelf: 'center' },
    headerTintColor: colours.headerButtonColor,
    header: props => <ImageHeader {...props} />
  });

  nextPage = (name) => {
    this.props.navigation.navigate('Where', { name });
  }

  render () {
    const { data, name, addInput, removeInput, handleChange } = this.props;
    const inputCount = data.length;

    const inputs = data.map((value, i) => {
      return (
        <Input
          testDescription={`What option ${i + 1}`}
          style={styles.inputStyle}
          handleChange={ handleChange }
          key={ i }
          inputCount={ inputCount }
          value={ value }
          inputKey={ i }
          removeInput={ removeInput }
          placeholder="What would you like to do?"
        />
      );
    });

    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: colours.white }}
        enableOnAndroid
        extraHeight={80}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{ }}
      >
        <HeaderBack />
        <View
          style={{ backgroundColor: colours.transparent }}
        >

          <View style={{ flexDirection: 'column', alignItems: 'center', marginHorizontal: 15 }}>
            <Text style={ [styles.msg4, { paddingTop: 10, paddingBottom: 10 }] }>
              Enter what your event will be (or leave blank to decide it later).
            </Text>
            <Text style={ [styles.msg4, { paddingTop: 10, paddingBottom: 10 }] }>
              You can add more than one option to create a poll.
            </Text>

            { inputs }

            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
                paddingLeft: 5,
                paddingRight: 5 }}
            >
              <AddInput testDescription="Add What option" colour={colours.what} data={ data } handler={ addInput } />
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 0,
                marginBottom: 10,
                paddingLeft: 5,
                paddingRight: 5 }}
            >
              <Button
                testDescription="Confirm What"
                onPress={ () => this.nextPage(name) }
                buttonStyle={ [styles.buttonStyle, { flex: 1 }] }
                textStyle={ styles.buttonTextStyle }
              >
                Next
              </Button>
            </View>
            <View style={{ height: 80 }} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
