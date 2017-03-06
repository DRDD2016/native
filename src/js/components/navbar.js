import React, { Component } from 'react';
import { StackNavigation, TabNavigation, TabNavigationItem as TabItem } from '@exponent/ex-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Router from '../router';
import { tabBarSelectedItemStyle } from '../../styles';
import colours from '../../styles/colours';
import { popToTop } from '../lib/navigate';

export default class Navbar extends Component {

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
          <StackNavigation
            id="code"
            navigatorUID="code"
            initialRoute={ Router.getRoute('code', { title: 'Code' }) }
          />
        </TabItem>

        <TabItem
          id="calendar"
          title="Calendar"
          navigatorUID="calendar"
          selectedStyle={ tabBarSelectedItemStyle }
          renderIcon={ isSelected => <Icon name="calendar" size={ 28 } color={ isSelected ? colours.blue : colours.gray} /> }
          onPress={ this.onPress }
        >
          <StackNavigation
            id="calendar"
            navigatorUID="calendar"
            initialRoute={ Router.getRoute('calendar', { title: 'Calendar' }) }
          />
        </TabItem>

        <TabItem
          id="feed"
          title="Feed"
          selectedStyle={ tabBarSelectedItemStyle }
          renderIcon={ isSelected => <Icon name="globe" size={ 28 } color={ isSelected ? colours.blue : colours.gray } /> }
          onPress={ this.onPress }
        >
          <StackNavigation
            id="feed"
            navigatorUID="feed"
            initialRoute={ Router.getRoute('feed') }
          />
        </TabItem>

        <TabItem
          id="profile"
          title="Profile"
          selectedStyle={ tabBarSelectedItemStyle }
          renderIcon={ isSelected => <Icon name="user" size={ 28 } color={ isSelected ? colours.blue : colours.gray} /> }
          onPress={ this.onPress }
        >
          <StackNavigation
            id="profile"
            navigatorUID="profile"
            initialRoute={ Router.getRoute('profile') }
          />
        </TabItem>

        <TabItem
          id="create"
          title="Create"
          selectedStyle={ tabBarSelectedItemStyle }
          renderIcon={ isSelected => <Icon name="pencil" size={ 28 } color={ isSelected ? colours.blue : colours.gray } /> }
          onPress={ this.onPress }
        >
          <StackNavigation
            id="create"
            navigatorUID="create"
            initialRoute={ Router.getRoute('details') }
          />
        </TabItem>
      </TabNavigation>
    );
  }
}
