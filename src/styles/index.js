import { Dimensions, Platform } from 'react-native';
import styled from 'styled-components';
import colours from './colours';
import { scale } from './scaling';


// Buttons

export const Button = styled.TouchableOpacity`
  paddingTop: 4;
  paddingBottom: 4;
  paddingLeft: 15;
  paddingRight: 15;
  borderRadius: 3;
  elevation: 1;
`;

export const ConfirmButton = styled.TouchableOpacity`
  width: ${Dimensions.get('window').width * 0.5};
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${colours.confirm};
  borderColor: ${colours.confirm};
  borderWidth: 1;
  borderRadius: 5;
  paddingVertical: 8;
  paddingHorizontal: 10;
  marginHorizontal: 20;
  height: ${scale(50)};
  elevation: 1;
`; // confirmButton

export const ConfirmButtonText = styled.Text`
  fontSize: ${scale(18)};
  textAlign: center;
  color: ${colours.offWhite};
`; // confirmButtonText

export const ButText = styled.Text.attrs({
  color: props => props.color || colours.gray
})`
  fontSize: ${scale(12)};
  color: ${props => props.color};
`;

export const RSVPButton = styled.TouchableOpacity`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${colours.confirm};
  borderColor: ${colours.confirm};
  borderWidth: 1;
  paddingVertical: 5;
  paddingHorizontal: 0;
  marginHorizontal: 5;
  borderRadius: 3;
  elevation: 1;
`; // RSVPButton

export const RSVPButtonText = styled.Text`
  fontSize: ${scale(16)};
  color: ${colours.white};
`; // RSVPButtonText


// Text

export const HeaderText = styled.Text`
  color: ${colours.headerTitleColor};
  fontSize: ${scale(20)};
  fontWeight: 600;
`; // titleHeader1

export const Title1 = styled.Text`
  color: ${colours.white};
  fontSize: ${scale(24)};
`; // title1

export const Title2 = styled.Text`
  flex: 1;
`; // title2

export const Title3 = styled.Text.attrs({
  color: props => props.color || colours.gray
})`
  fontSize: ${scale(12)};
  fontWeight: 600;
  color: ${props => props.color};
`; // title3

export const Title4 = styled.Text`
  fontSize: ${scale(12)};
  fontWeight: 500;
`; // title4

export const Title5 = styled.Text`
  fontSize: ${scale(10)};
  fontWeight: 500;
`; // title5

export const Title6 = styled.Text`
  fontSize: ${scale(8)};
  fontWeight: 500;
`; // title6

export const TitleInvited = styled.Text`
  fontSize: ${scale(18)};
  fontWeight: 700;
  color: ${colours.gray};
`; // invitedTitle

export const Msg1 = styled.Text`
  fontSize: ${scale(18)};
  fontWeight: 600;
  color: ${colours.gray};
`; // msg1

export const Msg2 = styled.Text`
  fontSize: ${scale(16)};
  fontWeight: 400;
  color: ${colours.gray};
`; // msg2

export const Msg3 = styled.Text`
  fontSize: ${scale(14)};
  fontWeight: 700;
  color: ${colours.gray};
`; // msg3

export const Msg4 = styled.Text`
  fontSize: ${scale(12)};
  fontWeight: 600;
  color: ${colours.gray};
`; // msg4

export const SmMsg = styled.Text`
  fontSize: ${scale(12)};
  fontWeight: 300;
  color: ${colours.gray};
  paddingTop: 10;
  paddingBottom: 10;
`; // smallMessageText

export const BigThinText = styled.Text`
  fontSize: ${scale(16)};
  fontWeight: 300;
  color: ${colours.white};
`; // topBarButtonText

export const OpTextWhat = styled.Text`
  fontSize: ${scale(12)};
  fontWeight: 500;
  color: ${colours.what};
  flex: 1;
  justifyContent: 'space-around';
`; // optionTextInfoWhat

export const OptionTextDeselectedWhat = styled.Text`
  fontSize: ${scale(12)};
  color: ${colours.what};
  flex: 1;
`; // optionTextDeselectedWhat

export const OpTextSelected = styled.Text`
  fontSize: ${scale(12)};
  fontWeight: 500;
  color: ${colours.white};
  flex: 1;
  justifyContent: 'space-around';
`; // optionTextSelected

export const OpTitleWhere = styled.Text`
  fontSize: ${scale(12)};
  fontWeight: 'bold';
  color: ${colours.where};
  flex: 1;
  paddingTop: 10;
`; // optionTitleWhere

export const OpTextWhere = styled.Text`
  fontSize: ${scale(12)};
  fontWeight: 500;
  color: ${colours.where};
  flex: 1;
  justifyContent: 'space-around';
`; // optionTextInfoWhere

export const OptionTextDeselectedWhere = styled.Text`
  fontSize: ${scale(12)};
  color: ${colours.where};
  flex: 1;
`; // optionTextDeselectedWhere

export const OpTitleWhen = styled.Text`
  fontSize: ${scale(12)};
  fontWeight: 'bold';
  color: ${colours.when};
  flex: 1;
  paddingTop: 10;
`; // optionTitleWhen

export const OpTextWhen = styled.Text`
  fontSize: ${scale(12)};
  fontWeight: 500;
  color: ${colours.when};
  flex: 1;
  justifyContent: 'space-around';
`; // optionTextInfoWhen

export const OptionTextDeselectedWhen = styled.Text`
  fontSize: ${scale(12)};
  color: ${colours.when};
  flex: 1;
`; // optionTextDeselectedWhen

export const styles = {

  // app Wide
  modalWrapper: {
    height: Dimensions.get('window').height * 1,
    width: Dimensions.get('window').width * 1,
    backgroundColor: colours.modalBackground,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalConfirm: {
    height: Dimensions.get('window').height * 0.5,
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: colours.verylightgray,
    margin: 20,
    padding: 10,
    alignItems: 'center',
    borderRadius: 30
  },
  headerBuffer: {
    flex: Platform.OS === 'ios' ? 1 : null,
    height: Platform.OS === 'ios' ? null : Dimensions.get('window').height * 0.85, // put back to 0.85 if problems
    top: Platform.OS === 'ios' ? null : -70,
    marginBottom: Platform.OS === 'ios' ? null : -70
  },
  headerBuffer2: {
    flex: Platform.OS === 'ios' ? 1 : null,
    height: Platform.OS === 'ios' ? null : Dimensions.get('window').height * 1, // can remove if no problems on above
    top: Platform.OS === 'ios' ? null : -70
  },

  title4: {
    fontSize: 12,
    fontWeight: '500'
  },
  title5: {
    fontSize: 10,
    fontWeight: '500'
  },
  title6: {
    fontSize: 8,
    fontWeight: '500'
  },
  msg1: {
    fontSize: 18,
    color: colours.gray,
    fontWeight: '600'
  },
  msg2: {
    fontSize: 16,
    color: colours.gray,
    fontWeight: '400'
  },
  msg3: {
    fontSize: 14,
    fontWeight: '700',
    color: colours.gray
  },
  msg4: {
    fontSize: 12,
    color: colours.gray,
    fontWeight: '600'
  },
  smallMessageText: {
    fontSize: 12,
    color: colours.gray,
    fontWeight: '300',
    paddingTop: 10,
    paddingBottom: 10
  },
  invitedTitle: {
    fontSize: 18,
    color: colours.gray,
    fontWeight: '700'
  },
  invitedWrapped: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5
  },
  inviteeItem: {
    padding: 4,
    alignItems: 'center',
    flexDirection: 'column',
    flexWrap: 'nowrap'
  },
  uiAvatarImage: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    borderRadius: 15
  },
  eventNote: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
    flexWrap: 'wrap'
  },

  // topBar

  topBarContainer: {
    flexDirection: 'row',
    height: 75,
    backgroundColor: colours.blue,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 10,
    paddingLeft: 3,
    paddingRight: 3
  },
  topBarButton: {

  },
  topBarButtonText: {
    color: colours.white,
    fontSize: 16,
    fontWeight: '300'
  },
  rowEvent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    minHeight: 32
  },
  rowSpaced: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  pollSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    width: Dimensions.get('window').width * 1
  },
  rowCentered: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  columnCentered: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  columnFlexStart: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  columnLeft: {
    flex: 1.2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  columnMiddle: {
    flex: 2.8,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginRight: 5
  },
  columnMiddlePoll: {
    flex: 3.8,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginRight: 0
  },
  columnRight: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginRight: 15
  },
  rowFlexStart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  optionTitleWhat: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: colours.what,
    paddingTop: 0
  },
  optionSelectedWhat: {
    flex: 1,
    backgroundColor: colours.what,
    borderColor: colours.what,
    borderWidth: 1,
    borderRadius: 30,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 2
  },
  optionInfoWhat: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 2
  },
  optionTextInfoWhat: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: colours.what,
    justifyContent: 'space-around'
  },
  optionTextSelected: {
    flex: 1,
    fontSize: 12,
    color: colours.white,
    justifyContent: 'space-around'
  },
  optionDeselectedWhat: {
    flex: 1,
    backgroundColor: colours.white,
    borderColor: colours.what,
    borderWidth: 1,
    borderRadius: 100,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 2
  },
  optionTextDeselectedWhat: {
    flex: 1,
    fontSize: 12,
    color: colours.what
  },
  optionTitleWhere: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: colours.where,
    paddingTop: 10
  },
  optionSelectedWhere: {
    flex: 1,
    backgroundColor: colours.where,
    borderColor: colours.where,
    borderWidth: 1,
    borderRadius: 100,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 2
  },
  optionDeselectedWhere: {
    flex: 1,
    backgroundColor: colours.white,
    borderColor: colours.where,
    borderWidth: 1,
    borderRadius: 100,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 2
  },
  optionInfoWhere: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 2
  },
  optionTextInfoWhere: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: colours.where,
    justifyContent: 'space-around'
  },
  optionTextDeselectedWhere: {
    flex: 1,
    fontSize: 12,
    color: colours.where
  },
  optionTitleWhen: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: colours.when,
    paddingTop: 10
  },
  optionSelectedWhen: {
    flex: 1,
    backgroundColor: colours.when,
    borderColor: colours.when,
    borderWidth: 1,
    borderRadius: 100,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 2
  },
  optionDeselectedWhen: {
    flex: 1,
    backgroundColor: colours.white,
    borderColor: colours.when,
    borderWidth: 1,
    borderRadius: 100,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 2
  },
  optionInfoWhen: {
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 2
  },
  optionTextInfoWhen: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: colours.when,
    justifyContent: 'space-around'
  },
  optionTextDeselectedWhen: {
    flex: 1,
    fontSize: 12,
    color: colours.when
  },
  confirmButton: {
    width: Dimensions.get('window').width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colours.confirm,
    borderColor: colours.confirm,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    height: 50
  },
  confirmButtonText: {
    fontSize: 18,
    color: colours.white
  },
  inviteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colours.confirm,
    borderColor: colours.confirm,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 30
  },
  inviteButtonText: {
    fontSize: 18,
    color: colours.white
  },

  // login page

  textSnippet: {
    fontSize: 16,
    fontWeight: '300',
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  logo: {
    height: 100,
    width: 300
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  navigationBarStyle: {
    backgroundColor: colours.blue
  },
  navigationBarTextStyle: {
    color: colours.white
  },

  // profilePage

  container: {
    // flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 5
  },
  // whenContainer: {
  //   flexDirection: 'column',
  //   margin: 15
  // },
  containerFeed: {

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    minHeight: 32
  },
  rowFlex: {
    flexDirection: 'row',
    borderColor: 'blue',
    borderWidth: 3,
    borderRadius: 3,
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5
  },
  shortRow: {
    width: 50,
    alignItems: 'center'
  },
  leftJustified: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    padding: 10
  },
  chartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowWhen: {
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  column: {
    flexDirection: 'column',
    flex: 1
  },
  userName: {
    fontSize: 24,
    fontWeight: '200',
    color: colours.gray
  },
  uiProfilePagePhotoCircularImage: {
    height: 130,
    width: 130,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'center'
  },
  editNameTitle: {
    fontWeight: '200',
    color: colours.gray,
    flex: 1
  },
  inputStyle: {
    color: colours.darkgray,
    borderRadius: 0,
    borderWidth: 0.5,
    borderColor: colours.gray,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: '400',
    height: 45,
    flexDirection: 'row',
    flex: 1,
    elevation: 1, // replaces shadow on Android, shadow props IOS only
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'red',
    shadowOffset: { height: 4, width: 0 }
  },
  inputStyleAuth: {
    color: colours.darkgray,
    borderRadius: 0,
    borderWidth: 0.5,
    borderColor: colours.gray,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: '500',
    height: 45,
    flexDirection: 'row'
  },
  smallButtonStyle: {
    flex: 0.1
  },
  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colours.next,
    borderColor: colours.next,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 10,
    marginHorizontal: 20,
    maxHeight: 60
  },
  buttonTextStyle: {
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: colours.white
  },
  addButtonStyle: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 0,
    marginHorizontal: 10,
    maxHeight: 60
  },
  addButtonTextStyle: {
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: colours.white
  },
  hideEditButton: {
    height: 0,
    opacity: 0
  },
  navbarContainerStyle: {
    flex: 1
  },
  hideButton: {
    height: 0,
    opacity: 0
  },

  // feed

  // filter-panel - not sure if used
  filterPanelContainer: {
    height: 50,
    borderWidth: 2,
    borderColor: 'red'
  },
  rowFilterPanel: {
    flex: 1,
    borderColor: 'green',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  filterButton: {
    backgroundColor: colours.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colours.lightgray,
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
    fontWeight: '300',
    paddingTop: 5,
    paddingBottom: 5
  },
  buttonTextSelected: {
    fontSize: 12,
    color: colours.white,
    fontWeight: '300',
    paddingTop: 5,
    paddingBottom: 5
  },
  filterButtonSelected: {
    backgroundColor: colours.blue,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colours.lightgray,
    paddingRight: 10,
    paddingLeft: 10,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  // feedItem

  cardStyle: {
    backgroundColor: colours.white,
    borderBottomWidth: 0.5,
    borderRadius: 2,
    borderColor: colours.lightgray,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5
  },
  cardBottomBorder: {
    borderBottomWidth: 1,
    borderRadius: 2,
    borderColor: colours.lightgray
  },
  newCardStyle: {
    backgroundColor: colours.white,
    borderBottomWidth: 0.5,
    borderRadius: 2,
    borderColor: colours.lightgray,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5
  },
  cardSectionInvite: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderColor: colours.main, // '#ddd'
    position: 'relative'
  },
  cardSectionFeedItem: {

  },
  cardButtonStyle: {
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 2,
    marginRight: 2,
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  viewedFeedItemStyle: {
    backgroundColor: colours.blue
  },
  newViewedFeedItemStyle: {
    backgroundColor: colours.gray
  },
  viewedFeedItemName: {
    fontSize: 14,
    color: colours.black,
    fontWeight: '500'
  },
  viewedFeedItemAction: {
    color: colours.black
  },
  viewedFeedItemTimestamp: {
    color: colours.darkgray,
    fontWeight: '500'
  },
  viewedFeedItemDate: {
    color: colours.when,
    fontWeight: '500'
  },
  viewedFeedItemPlaceName: {
    color: colours.where,
    fontWeight: '500'
  },
  unConfirmedItemStyle: {
    backgroundColor: colours.verylightgray
  },
  unConfirmedItemText: {
    color: colours.gray,
    fontSize: 12
  },
  leftColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  uiProfilePhotoCircularImage: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    borderRadius: 15
  },
  numberOfInvites: {
    // fontSize: 10,
    // fontWeight: '300',
    color: 'lightgray'
  },
  middleColumn: {
    flex: 3.5,
    paddingBottom: 5
  },
  timestamp: {
    // fontSize: 10,
    // fontWeight: '300',
    color: 'lightgray'
  },
  subjectName: {
    fontSize: 14,
    color: colours.darkgray,
    fontWeight: '500'
  },
  subjectAction: {
    fontSize: 12,
    color: colours.gray
  },
  eventName: {
    // fontSize: 12,
    // fontWeight: 'bold',
    color: colours.darkgray
  },
  rightColumnFeed: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  date: {
    // fontSize: 12,
    // fontWeight: '100'
  },
  placeName: {
    // fontSize: 12,
    // fontWeight: '100'
  },

  // calendarItem

  rightColumnCalendar: {
    flexDirection: 'row'
  },
  cardTopRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardMiddleRow: {
    flex: 1,
    flexDirection: 'row'
  },
  profileImage: {

  },
  calendarItem: {

  },
  calendarTitle: {
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 3
  },
  coverImage: {
    height: 74,
    width: 100
  },

  // create Event

  rowEventDetailsHeader: {
    flexDirection: 'row',
    backgroundColor: 'blue',
    justifyContent: 'center',
    padding: 10
  },
  eventDetailTextTitle: {
    color: colours.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
  eventDetailText: {
    color: colours.white,
    fontSize: 14,
    fontWeight: '300',
    alignSelf: 'center'
  },
  uiEventDetailPhotoCircularImage: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    borderRadius: 15
  },
  label: {
    fontSize: 12,
    fontWeight: '300'
  },
  mediumLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colours.gray
  },
  dateInputStyle: {
    color: '#000',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
    fontSize: 12,
    minHeight: 40,
    minWidth: 120,
    paddingLeft: 10
  },
  timeInputStyle: {
    color: '#000',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgray',
    fontSize: 12,
    minHeight: 40,
    minWidth: 90,
    paddingLeft: 10
  },
  dateInputRow: {
    flexDirection: 'row',
    height: 70,
    borderColor: 'gray',
    borderRadius: 3,
    borderWidth: 3
  },
  dateInputColumn: {
    flexDirection: 'column',
    flex: 2.5
  },
  timeInputColumn: {
    flexDirection: 'column',
    paddingLeft: 10,
    flex: 2
  },
  timeInputRow: {
    flexDirection: 'row'
  },
  removeInputColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2
  },
  dateTimeLabel: {
    paddingBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: colours.grey
  },

  // invite friends

  rightFloatedContent: {

  },

  textfriendName: {
    fontSize: 16,
    fontWeight: '300',
    padding: 10
  },
  rightColumnInvite: {
    alignSelf: 'center'
  },
  invitedButton: {
    flexDirection: 'row',
    padding: 3,
    borderRadius: 5,
    borderWidth: 0,
    backgroundColor: colours.gray,
    alignItems: 'center',
    width: 180
  },
  inviteesContainer: {

  },
  uiMiddleAlignedViewidedList: {

  },

  // confirm event

  item: {

  },
  content: {

  },
  header: {

  },

  uiBigHorizontalList: {

  },
  confirmList: {

  },
  eventWherePlaceAddress: {

  },

  // router tabbar styling

  tabContainer: {
    flex: 1,
    backgroundColor: colours.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabBarStyle: {
    backgroundColor: colours.blue,
    flex: 1
  },
  tabBarSelectedItemStyle: {
    backgroundColor: colours.white,
    flex: 1
  },
  iconBar: {
    flex: 1,
    alignItems: 'center'
  },
  iconBarStyle: {
    backgroundColor: colours.blue
  },
  iconBarSelectedItemStyle: {
    backgroundColor: colours.white
  },

// Navbar styling

  backButtonTextStyle: {
    color: colours.white,
    fontSize: 14,
    fontWeight: '300'
  },

  // modalContainer

  modalContainer: {

  },

  // invitee-poll

  // poll sections
  tallyText: {

  },
  placeNameShort: {

  },
  placeNameLong: {

  },
  placeAddress: {

  },

  // confirmed-event
  headerRsvpListItems: {

  },
  // cancel confirmed-event
  basicModal: {

  },

  // photo stream
  rowPhoto: {

  },
  photo: {

  },
  uploadPanel: {

  },

  // RSVP area
  RSVPButtonGoing: {

  },
  RSVPButtonMaybe: {

  },
  RSVPButtonNotGoing: {

  },
  RSVPButtonNotResponded: {

  },
  bar: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    height: 12
  }

};

export default styles;
