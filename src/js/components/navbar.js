import React from 'react';
import { Text } from 'react-native';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem as TabItem
} from '@exponent/ex-navigation';
// import Icon from 'react-native-vector-icons/FontAwesome';
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
        renderIcon={ isSelected => <Text style={isSelected ? colours.blue : colours.gray}>A</Text> }
      >
        <StackNavigation
          id="albums"
          navigatorUID="albums"
          initialRoute={ Router.getRoute('albums') }
        />
      </TabItem>

      <TabItem
        id="calendar"
        title="Calendar"
        selectedStyle={ tabBarSelectedItemStyle }
        renderIcon={ isSelected => <Text style={isSelected ? colours.blue : colours.gray}>C</Text> }
      >
        <StackNavigation
          id="calendar"
          navigatorUID="calendar"
          initialRoute={ Router.getRoute('calendar') }
        />
      </TabItem>

      <TabItem
        id="feed"
        title="Feed"
        selectedStyle={ tabBarSelectedItemStyle }
        renderIcon={ isSelected => <Text style={isSelected ? colours.blue : colours.gray}>F</Text>}
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
        renderIcon={ isSelected => <Text style={isSelected ? colours.blue : colours.gray}>P</Text> }
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
        renderIcon={ isSelected => <Text style={isSelected ? colours.blue : colours.gray}>C</Text> }
      >
        <StackNavigation
          id="create"
          navigatorUID="create"
          initialRoute={ Router.getRoute('confirm') }
        />
      </TabItem>
    </TabNavigation>
  );
}
