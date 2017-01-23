/* eslint-disable no-use-before-define */
import React from 'react';
import { View } from 'react-native';
import Button from '../common/Button';
import colours from '../../../styles/colours';

const FilterPanel = ({ displaySome, displayAll, dataIsFiltered, isShowHosting }) => {

  const allButtonButton = (!dataIsFiltered ? styles.filterButtonSelected : styles.filterButton);
  const allButtonText = (!dataIsFiltered ? styles.buttonTextSelected : styles.buttonText);

  const receivedButtonButton = (dataIsFiltered && !isShowHosting ? styles.filterButtonSelected : styles.filterButton);
  const receivedButtonText = (dataIsFiltered && !isShowHosting ? styles.buttonTextSelected : styles.buttonText);

  const hostingButtonButton = (dataIsFiltered && isShowHosting ? styles.filterButtonSelected : styles.filterButton);
  const hostingButtonText = (dataIsFiltered && isShowHosting ? styles.buttonTextSelected : styles.buttonText);

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
        textStyle={receivedButtonText} onPress={ () => displaySome(false) }
      >
        Received
      </Button>
      <Button
        buttonStyle={ [hostingButtonButton, { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }] }
        textStyle={hostingButtonText} onPress={ () => displaySome(true) }
      >
        Hosting
      </Button>

    </View>
  );
};

const styles = {
  rowFilterPanel: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    height: 30
  },
  filterButton: {
    backgroundColor: 'white',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingRight: 10,
    paddingLeft: 10,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  buttonText: {
    fontSize: 12,
    color: colours.blue,
    fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 5
  },
  buttonTextSelected: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 5
  },
  filterButtonSelected: {
    backgroundColor: colours.blue,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'lightgray',
    paddingRight: 10,
    paddingLeft: 10,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
};

export default FilterPanel;
