import React, { Component } from 'react';
import { Animated, View } from 'react-native';

// shows thumbnail placeholder and then fades in image from url once downloaded


class progressiveImage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      thumbnailOpacity: new Animated.Value(0)
    };
  }
  onLoad () {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 0,
      duration: 250
    }).start();
  }
  onThumbnailLoad () {
    Animated.timing(this.state.thumbnailOpacity, {
      toValue: 1,
      duration: 250
    }).start();
  }

  render () {
    return (
      <View
        width={this.props.style.width}
        height={this.props.style.height}
        backgroundColor={'#ffffff'}
      >
        <Animated.Image

          style={[
            {
              position: 'absolute'
            },
            this.props.style
          ]}
          source={this.props.source}
          defaultSource={this.props.thumbnail}
          onLoad={event => this.onLoad(event)}
        />
        <Animated.Image

          style={[
            {
              opacity: this.state.thumbnailOpacity
            },
            this.props.style
          ]}
          source={this.props.thumbnail}
          defaultSource={this.props.thumbnail}
          onLoad={event => this.onThumbnailLoad(event)}
        />
      </View>
    );
  }
}

export default progressiveImage;
