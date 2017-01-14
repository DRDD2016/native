import React from 'react';
import { StackNavigation, TabNavigation, TabNavigationItem as TabItem } from '@exponent/ex-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Router from '../router';
import { tabBarSelectedItemStyle } from '../../styles';
import colours from '../../styles/colours';

export default function Navbar () {
  return (
    <TabNavigation
      id="main"
      navigatorUID="main"
      initialTab="feed"
    >
      <TabItem
        id="albums"
        title="Albums"
        selectedStyle={ tabBarSelectedItemStyle }
        renderIcon={ isSelected => <Icon name="camera" size={ 28 } color={ isSelected ? colours.blue : colours.gray } /> }
      >
        <StackNavigation
          id="albums"
          navigatorUID="albums"
          initialRoute={ Router.getRoute('albums', { title: 'Albums' }) }
        />
      </TabItem>

      <TabItem
        id="calendar"
        title="Calendar"
        selectedStyle={ tabBarSelectedItemStyle }
        renderIcon={ isSelected => <Icon name="calendar" size={ 28 } color={ isSelected ? colours.blue : colours.gray} /> }
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
