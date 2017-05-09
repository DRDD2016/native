import React, { Component } from 'react';
import { TabNavigation, TabNavigationItem as TabItem } from '@exponent/ex-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackFeed, StackCalendar, StackCode, StackProfile, StackCreate } from '../routes';
import { tabBarSelectedItemStyle } from '../../styles';
import colours from '../../styles/colours';
import { popToTop } from '../lib/navigate';

export default class TabBar extends Component {

  onPress = (tabItemOnPress) => {
    tabItemOnPress();
    popToTop(this.props.navigation);
  }

  render () {
    return (
      <TabNavigation
        id="main"
        navigatorUID="main"
        initialTab="feed"
      >
        <TabItem
          id="code"
          title="Code"
          selectedStyle={ tabBarSelectedItemStyle }
          renderIcon={ isSelected => <Icon name="barcode" size={ 28 } color={ isSelected ? colours.blue : colours.gray } /> }
          onPress={ this.onPress }
        >
          <StackCode />
        </TabItem>

        <TabItem
          id="calendar"
          title="Calendar"
          navigatorUID="calendar"
          selectedStyle={ tabBarSelectedItemStyle }
          renderIcon={ isSelected => <Icon name="calendar" size={ 28 } color={ isSelected ? colours.blue : colours.gray} /> }
          onPress={ this.onPress }
        >
          <StackCalendar />
        </TabItem>

        <TabItem
          id="feed"
          title="Feed"
          selectedStyle={ tabBarSelectedItemStyle }
          renderIcon={ isSelected => <Icon name="globe" size={ 28 } color={ isSelected ? colours.blue : colours.gray } /> }
          onPress={ this.onPress }
        >
          <StackFeed />
        </TabItem>

        <TabItem
          id="profile"
          title="Profile"
          selectedStyle={ tabBarSelectedItemStyle }
          renderIcon={ isSelected => <Icon name="user" size={ 28 } color={ isSelected ? colours.blue : colours.gray} /> }
          onPress={ this.onPress }
        >
          <StackProfile />
        </TabItem>

        <TabItem
          id="create"
          title="Create"
          selectedStyle={ tabBarSelectedItemStyle }
          renderIcon={ isSelected => <Icon name="pencil" size={ 28 } color={ isSelected ? colours.blue : colours.gray } /> }
          onPress={ this.onPress }
        >
          <StackCreate />
        </TabItem>
      </TabNavigation>
    );
  }
}
