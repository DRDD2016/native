/* eslint-disable no-use-before-define */
import React from 'react';
import { StatusBar, View, Platform } from 'react-native';
import { Header } from 'react-navigation';
import Button from '../common/Button';
import colours from '../../../styles/colours';
import { moderateScale } from '../../../styles/scaling';
import { TabBarText } from '../../../styles/text';

console.log('STATUSBAR_HEIGHT', StatusBar.currentHeight);
console.log('NAVBAR_HEIGHT', Header.HEIGHT);

const NAVBAR_HEIGHT = Header.HEIGHT;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 5, android: StatusBar.currentHeight });
const FILTER_PANEL_HEIGHT = Platform.select({ ios: (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) - 18, android: NAVBAR_HEIGHT });

const FilterPanel = ({ displaySome, displayAll, filterActive, selectedFilter }) => {

  const allButtonButton = (!filterActive ? styles.filterButtonSelected : styles.filterButton);
  const allButtonText = (!filterActive ? styles.buttonTextSelected : styles.buttonText);

  const receivedButtonButton = (filterActive && selectedFilter === 'received' ? styles.filterButtonSelected : styles.filterButton);
  const receivedButtonText = (filterActive && selectedFilter === 'received' ? styles.buttonTextSelected : styles.buttonText);

  const hostingButtonButton = (filterActive && selectedFilter === 'hosting' ? styles.filterButtonSelected : styles.filterButton);
  const hostingButtonText = (filterActive && selectedFilter === 'hosting' ? styles.buttonTextSelected : styles.buttonText);

  return (
    <View style={styles.filterPanel}
    >
      <TabBarText style={{ paddingLeft: moderateScale(5), paddingRight: moderateScale(5) }}>Filter by:</TabBarText>

      <Button
        buttonStyle={ [allButtonButton, { }]}
        textStyle={allButtonText}
        onPress={ displayAll }
      >
        All
      </Button>
      <Button
        buttonStyle={ [receivedButtonButton, { }] }
        textStyle={receivedButtonText}
        onPress={ () => displaySome('received') }
      >
        Received
      </Button>
      <Button
        buttonStyle={ [hostingButtonButton, { }] }
        textStyle={hostingButtonText}
        onPress={ () => displaySome('hosting') }
      >
        Hosting
      </Button>

    </View>
  );
};

const styles = {

  filterPanel: {

    flex: 1,
    height: FILTER_PANEL_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colours.filterPanelBackgroundColor,
    borderColor: colours.lightgray,
    paddingBottom: 1,
    borderBottomWidth: 1
  },
  filterButton: {
    backgroundColor: colours.white,
    borderBottomWidth: 0,
    // borderRadius: 3,
    borderColor: colours.offWhite,
    paddingRight: 10,
    paddingLeft: 10,
    marginLeft: 2,
    marginRight: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: FILTER_PANEL_HEIGHT
    // minHeight: NAVBAR_HEIGHT,
    // elevation: 1,
    // shadowOpacity: 0.8,
    // shadowRadius: 1,
    // shadowColor: 'gray',
    // shadowOffset: { height: 1, width: 0 }
  },
  buttonText: {
    fontSize: moderateScale(14),
    color: colours.gray,
    fontWeight: '400',
    paddingTop: 4,
    paddingBottom: 4

  },
  buttonTextSelected: {
    fontSize: moderateScale(14),
    color: colours.main,
    fontWeight: '400',
    paddingTop: 4,
    paddingBottom: 4,
    textAlignVertical: 'center'
  },
  filterButtonSelected: {
    backgroundColor: colours.white,
    // borderRadius: 0,
    borderBottomWidth: moderateScale(3, 0.2),
    borderColor: colours.main,
    paddingRight: 10,
    paddingLeft: 10,
    marginLeft: 2,
    marginRight: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: FILTER_PANEL_HEIGHT
    // minHeight: NAVBAR_HEIGHT,
    // elevation: 1,
    // shadowOpacity: 0.8,
    // shadowRadius: 1,
    // shadowColor: colours.main,
    // shadowOffset: { height: 1, width: 0 }
  }
};

export default FilterPanel;
