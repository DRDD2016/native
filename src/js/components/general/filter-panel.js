/* eslint-disable no-use-before-define */
import React from 'react';
import { View } from 'react-native';
import Button from '../common/Button';
import colours from '../../../styles/colours';
import { scale, moderateScale } from '../../../styles/scaling';

const FilterPanel = ({ displaySome, displayAll, filterActive, selectedFilter }) => {

  const allButtonButton = (!filterActive ? styles.filterButtonSelected : styles.filterButton);
  const allButtonText = (!filterActive ? styles.buttonTextSelected : styles.buttonText);

  const receivedButtonButton = (filterActive && selectedFilter === 'received' ? styles.filterButtonSelected : styles.filterButton);
  const receivedButtonText = (filterActive && selectedFilter === 'received' ? styles.buttonTextSelected : styles.buttonText);

  const hostingButtonButton = (filterActive && selectedFilter === 'hosting' ? styles.filterButtonSelected : styles.filterButton);
  const hostingButtonText = (filterActive && selectedFilter === 'hosting' ? styles.buttonTextSelected : styles.buttonText);

  return (
    <View style={styles.rowFilterPanel}>

      <Button
        buttonStyle={ [allButtonButton, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
        textStyle={allButtonText} onPress={ displayAll }
      >
        All
      </Button>
      <Button
        buttonStyle={ [receivedButtonButton, { borderRadius: 0 }] }
        textStyle={receivedButtonText} onPress={ () => displaySome('received') }
      >
        Received
      </Button>
      <Button
        buttonStyle={ [hostingButtonButton, { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }] }
        textStyle={hostingButtonText} onPress={ () => displaySome('hosting') }
      >
        Hosting
      </Button>

    </View>
  );
};

const styles = {
  rowFilterPanel: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(50)
  },
  filterButton: {
    backgroundColor: 'white',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: colours.main,
    paddingRight: 10,
    paddingLeft: 10,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: scale(40)
  },
  buttonText: {
    fontSize: moderateScale(14, 0.3),
    color: colours.main,
    fontWeight: '700',
    paddingTop: 5,
    paddingBottom: 5
  },
  buttonTextSelected: {
    fontSize: moderateScale(14, 0.3),
    color: 'white',
    fontWeight: '700',
    paddingTop: 5,
    paddingBottom: 5
  },
  filterButtonSelected: {
    backgroundColor: colours.main,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: colours.gray,
    paddingRight: 10,
    paddingLeft: 10,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: scale(40)
  }
};

export default FilterPanel;
