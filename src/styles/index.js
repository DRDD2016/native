import { Dimensions } from 'react-native';
import colours from './colours';

const styles = {

  // app Wide

  title1: {
    color: colours.white,
    fontSize: 24
  },
  title2: {
    flex: 1
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
    color: colours.gray,
    fontWeight: '600'
  },
  msg4: {
    fontSize: 12,
    color: colours.gray,
    fontWeight: '600'
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
    paddingTop: 10
  },
  optionSelectedWhat: {
    flex: 1,
    backgroundColor: colours.what,
    borderColor: colours.what,
    borderWidth: 1,
    borderRadius: 100,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 2
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
  optionTextDeselectedWhen: {
    flex: 1,
    fontSize: 12,
    color: colours.when
  },
  confirmButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colours.confirm,
    borderColor: colours.confirm,
    borderWidth: 1,
    borderRadius: 100,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 30,
    paddingRight: 30
  },
  confirmButtonText: {
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

  profilePage: {
    marginTop: 20
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 5
  },
  whenContainer: {
    flexDirection: 'column',
    margin: 15
  },
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
    width: 50
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
    fontSize: 36,
    fontWeight: '200',
    color: colours.gray
  },
  uiProfilePagePhotoCircularImage: {
    height: 100,
    width: 100,
    borderRadius: 15
  },
  editNameTitle: {
    fontWeight: '200',
    color: colours.gray,
    flex: 1
  },
  inputStyle: {
    color: colours.black,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colours.lightgray,
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 12,
    height: 40,
    flexDirection: 'row',
    flex: 1
  },
  smallButtonStyle: {
    flex: 0.1,
    margin: 10
  },
  buttonStyle: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colours.lightgray,
    paddingRight: 15,
    paddingLeft: 15,
    height: 32,
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTextStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
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

  smallMessageText: {
    fontSize: 12,
    fontWeight: '300',
    paddingTop: 10,
    paddingBottom: 10
  },

  // filter-panel
  filterPanelContainer: {
    height: 50
  },
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
  // notification

  cardStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  cardSectionCalendar: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderColor: '#ddd',
    position: 'relative'
  },
  cardSectionInvite: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    borderColor: '#ddd',
    position: 'relative'
  },
  cardSectionNotification: {

  },
  cardButtonStyle: {
    flex: 1,
    backgroundColor: '#fff',
    marginLeft: 5,
    marginRight: 5,
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  viewedNotificationStyle: {
    backgroundColor: 'red'
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
    fontSize: 10,
    fontWeight: '300',
    color: 'lightgray'
  },
  middleColumn: {
    flex: 3.5,
    paddingBottom: 5
  },
  timestamp: {
    fontSize: 10,
    fontWeight: '300',
    color: 'lightgray'
  },
  subjectName: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  subjectAction: {
    fontSize: 10,
    color: 'gray'
  },
  eventName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'gray'
  },
  rightColumnFeed: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  date: {
    fontSize: 12,
    fontWeight: '100'
  },
  placeName: {
    fontSize: 12,
    fontWeight: '100'
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
    backgroundColor: 'transparent',
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
  barContainer: {
    flexDirection: 'column',
    marginTop: 1,
    marginBottom: 1
  },
  // Item
  barItem: {
    flexDirection: 'column',
    flex: 1
  },
  barData: {
    flex: 2,
    flexDirection: 'row'
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
