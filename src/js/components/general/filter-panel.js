/* eslint-disable no-use-before-define */
import React from 'react';
import { View } from 'react-native';
import Button from '../common/Button';

const FilterPanel = ({ displaySome, displayAll, dataIsFiltered, isShowHosting }) => {

  const allButtonButton = (!dataIsFiltered ? styles.filterButtonSelected : styles.filterButton);
  const allButtonText = (!dataIsFiltered ? styles.buttonTextSelected : styles.buttonText);

  const receivedButtonButton = (dataIsFiltered && !isShowHosting ? styles.filterButtonSelected : styles.filterButton);
  const receivedButtonText = (dataIsFiltered && !isShowHosting ? styles.buttonTextSelected : styles.buttonText);

  const hostingButtonButton = (dataIsFiltered && isShowHosting ? styles.filterButtonSelected : styles.filterButton);
  const hostingButtonText = (dataIsFiltered && isShowHosting ? styles.buttonTextSelected : styles.buttonText);

  return (
    <View style={styles.rowFilterPanel}>

      <Button buttonStyle={allButtonButton} textStyle={allButtonText} onPress={ displayAll }>
        All
      </Button>
      <Button buttonStyle={ receivedButtonButton } textStyle={receivedButtonText} onPress={ () => displaySome(false) } >
        Received
      </Button>
      <Button buttonStyle={ hostingButtonButton } textStyle={hostingButtonText} onPress={ () => displaySome(true) } >
        Hosting
      </Button>

    </View>
  );
};

const styles = {
  rowFilterPanel: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    maxHeight: 30
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
    color: 'blue',
    fontWeight: '300',
    paddingTop: 5,
    paddingBottom: 5
  },
  buttonTextSelected: {
    fontSize: 12,
    color: 'white',
    fontWeight: '300',
    paddingTop: 5,
    paddingBottom: 5
  },
  filterButtonSelected: {
    backgroundColor: 'blue',
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
