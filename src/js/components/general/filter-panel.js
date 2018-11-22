/* eslint-disable no-use-before-define */
import React from 'react';
import { StatusBar, View, Platform } from 'react-native';
import { Header } from 'react-navigation';
import Button from '../common/Button';
import colours from '../../../styles/colours';
import { moderateScale } from '../../../styles/scaling';

console.log('STATUSBAR_HEIGHT', StatusBar.currentHeight);
console.log('NAVBAR_HEIGHT', Header.HEIGHT);

const NAVBAR_HEIGHT = Header.HEIGHT;
const STATUS_BAR_HEIGHT = Platform.select({ ios: 5, android: StatusBar.currentHeight });
const FILTER_PANEL_HEIGHT = Platform.select({ ios: NAVBAR_HEIGHT - STATUS_BAR_HEIGHT, android: NAVBAR_HEIGHT });

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

      <Button
        buttonStyle={ [allButtonButton, { borderTopRightRadius: 3, borderBottomRightRadius: 3 }]}
        textStyle={allButtonText}
        onPress={ displayAll }
      >
        All
      </Button>
      <Button
        buttonStyle={ [receivedButtonButton, { borderRadius: 3 }] }
        textStyle={receivedButtonText}
        onPress={ () => displaySome('received') }
      >
        Received
      </Button>
      <Button
        buttonStyle={ [hostingButtonButton, { borderTopLeftRadius: 3, borderBottomLeftRadius: 3 }] }
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

    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
    height: FILTER_PANEL_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colours.filterPanelBackgroundColor
  },
  filterButton: {
    backgroundColor: colours.offWhite,
    borderWidth: 0,
    borderRadius: 3,
    borderColor: colours.offWhite,
    paddingRight: 10,
    paddingLeft: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 1,
    marginBottom: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // height: FILTER_PANEL_HEIGHT * 0.7,
    // minHeight: NAVBAR_HEIGHT,
    paddingTop: 4,
    paddingBottom: 4,
    elevation: 1,
    shadowOpacity: 0.8,
    shadowRadius: 1,
    shadowColor: 'gray',
    shadowOffset: { height: 1, width: 0 }
  },
  buttonText: {
    fontSize: moderateScale(14, 0.3),
    color: colours.gray,
    fontWeight: '400',
    paddingTop: 5,
    paddingBottom: 5
  },
  buttonTextSelected: {
    fontSize: moderateScale(14, 0.3),
    color: colours.main,
    fontWeight: '400',
    paddingTop: 5,
    paddingBottom: 5
  },
  filterButtonSelected: {
    backgroundColor: colours.white,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colours.main,
    paddingRight: 10,
    paddingLeft: 10,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // height: FILTER_PANEL_HEIGHT * 0.7,
    // minHeight: NAVBAR_HEIGHT,
    paddingTop: 4,
    paddingBottom: 4
    // elevation: 1,
    // shadowOpacity: 0.8,
    // shadowRadius: 1,
    // shadowColor: colours.main,
    // shadowOffset: { height: 1, width: 0 }
  }
};

export default FilterPanel;
