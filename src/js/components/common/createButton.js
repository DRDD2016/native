/* eslint-disable react/prefer-stateless-function */
/* eslint-disable */
import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Tips from 'react-native-tips';


export default class CreateButton extends Component {

  constructor (props) {
    super(props);

    // 1st step - Create your helper with keys that will represent your tips
    this.waterfallTips = new Tips.Waterfall([
      'myTipsA',
      'myTipsB'
    ]);

    this.state = {
      tipsVisible: null
    };

    // This method will trigger the changement of tips
    this.handleNextTips = this.handleNextTips.bind(this);

  }

  componentDidMount () {
    // the 'start' method will set the first Tips key into your state.
    this.setState({
      tipsVisible: this.waterfallTips.start()
    });
  }

  handleNextTips () {
    // the 'next' method will set the next tips key into your state until it has no more keys.
    this.setState({
      tipsVisible: this.waterfallTips.next()
    });
  }


  render () {
    const { tipsVisible } = this.state;
    const { children, onPress } = this.props;
    console.log('createButton render');
    // console.log('createButton props', this.props);

    return (

      <View>
        <Tips

          childrenStyle={{ justifyContent: 'center', alignItems: 'center' }}
          visible={tipsVisible === 'myTipsA'}
          onRequestClose={this.handleNextTips}
          delay={500}
          text={`You have no events ${'\n'}${'\n'}Tap this icon to get started`}
        >
          <TouchableWithoutFeedback onPress={() => onPress()}>
            <View>
              { children }
            </View>
          </TouchableWithoutFeedback>

        </Tips>

        <Tips

          childrenStyle={{ justifyContent: 'center', alignItems: 'center' }}
          visible={tipsVisible === 'myTipsB'}
          onRequestClose={this.handleNextTips}
          delay={500}
          text="Or tap here to join an event"
        >
          <TouchableWithoutFeedback onPress={() => onPress()}>
            <View>
              { children }
            </View>
          </TouchableWithoutFeedback>

        </Tips>
      </View>


    );
  }
}
