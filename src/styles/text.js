import { Dimensions } from 'react-native';
import styled from 'styled-components';
import colours from './colours';

const { width } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
// const guidelineBaseHeight = 680;

const scale = size => Number((width / guidelineBaseWidth) * size);
// const horizontalScale2 = (size, factor = 0.7) => Number(((width / guidelineBaseWidth) * size) * factor);
// const verticalScale = size => Number((height / guidelineBaseHeight) * size);
// const verticalScale2 = (size, factor = 0.8) => Number(((height / guidelineBaseHeight) * size) * factor);
const moderateScale = (size, factor = 0.3) => Number(size + ((scale(size) - size) * factor));

export const ms10 = moderateScale(10);
export const ms12 = moderateScale(12);
export const ms14 = moderateScale(14);
export const ms16 = moderateScale(16);
export const ms18 = moderateScale(18);


// TabBar
export const TabBarText = styled.Text.attrs({
  color: props => props.color || colours.gray
})`
  fontSize: ${moderateScale(12)};
  color: ${props => props.color};
  textAlign: center;

`;

// Feed

export const TimeText = styled.Text.attrs({
  opacity: props => props.opacity || 1
})`
  color: ${colours.gray};
  fontWeight: 500;
  fontSize: ${ms12};
  opacity: ${props => props.opacity};

`;

export const SubjectNameText = styled.Text.attrs({
  opacity: props => props.opacity || 1
})`
  color: ${colours.black};
  fontWeight: 600;
  fontSize: ${ms14};
  opacity: ${props => props.opacity};

`;

export const SubjectActionText = styled.Text.attrs({
  opacity: props => props.opacity || 1
})`
  color: ${colours.gray};
  fontWeight: 500;
  fontSize: ${ms12};
  opacity: ${props => props.opacity};

`;

export const EventNameText = styled.Text.attrs({
  opacity: props => props.opacity || 1
})`
  color: ${colours.main};
  fontWeight: 600;
  fontSize: ${ms14};
  opacity: ${props => props.opacity};

`;

export const FeedItemWhenText = styled.Text.attrs({
  opacity: props => props.opacity || 1,
  unConfirmedItem: (props) => { return (props.unConfirmedItem ? ms14 : ms16); },
  viewed: (props) => { return (props.viewed ? colours.darkgray : colours.darkgray); },
  color: (props) => { return (props.unConfirmedItem ? colours.darkgray : colours.darkgray); }
})`
  color: ${props => props.color};
  fontWeight: 500;
  fontSize: ${props => props.unConfirmedItem};
  opacity: ${props => props.opacity};
  marginLeft: 4;
  marginRight: 4;

`;

export const FeedItemWhereText = styled.Text.attrs({
  opacity: props => props.opacity || 1,
  unConfirmedItem: (props) => { return (props.unConfirmedItem ? ms14 : ms12); },
  viewed: (props) => { return (props.viewed ? colours.darkgray : colours.darkgray); },
  color: (props) => { return (props.unConfirmedItem ? colours.darkgray : colours.darkgray); }
})`
  color: ${props => props.color};
  fontWeight: 500;
  fontSize: ${props => props.unConfirmedItem};
  opacity: ${props => props.opacity};
  textAlign: center;
  marginLeft: 4;
  marginRight: 4;

`;

export const StatusFlagText = styled.Text.attrs({
  opacity: props => props.opacity || 1,
  color: props => props.color || colours.gray
})`
  color: ${props => props.color};
  fontWeight: 500;
  fontSize: ${ms12};
  opacity: ${props => props.opacity};
  textAlign: center;
  marginLeft: 4;
  marginRight: 4;

`;


// Calendar

export const CalendarFromText = styled.Text.attrs({
  color: props => props.color || colours.darkgray
})`
  fontSize: ${moderateScale(10)};
  color: ${props => props.color};
  textAlign: center;
  fontWeight: 500;

`;

export const CalendarDateText = styled.Text.attrs({
  color: props => props.color || colours.darkgray
})`
  fontSize: ${moderateScale(14)};
  color: ${props => props.color};
  textAlign: center;
  fontWeight: 500;

`;

export const HostNameText = styled.Text.attrs({
  opacity: props => props.opacity || 1
})`
  color: ${colours.main};
  fontWeight: 600;
  fontSize: ${ms12};
  opacity: ${props => props.opacity};

`;

export const MonthText = styled.Text.attrs({
  opacity: props => props.opacity || 1
})`
  color: ${colours.white};
  textAlign: left;
  fontWeight: 600;
  fontSize: ${ms14};
  opacity: ${props => props.opacity};

`;

export const GeneralText = styled.Text.attrs({
  opacity: props => props.opacity || 1
})`
  color: ${colours.main};
  fontWeight: 600;
  fontSize: ${ms16};
  opacity: ${props => props.opacity};

`;

export const FormLabelText = styled.Text.attrs({
  opacity: props => props.opacity || 1
})`
  color: ${colours.main};
  fontWeight: 600;
  fontSize: ${ms14};
  opacity: ${props => props.opacity};

`;

export const MessageText = styled.Text.attrs({
  opacity: props => props.opacity || 1
})`
  color: ${colours.gray};
  fontWeight: 600;
  fontSize: ${ms14};
  opacity: ${props => props.opacity};

`;

export const ConfirmButtonText = styled.Text.attrs({
  opacity: props => props.opacity || 1
})`
  color: ${colours.offWhite};
  fontWeight: 600;
  fontSize: ${ms18};
  textAlign: center;
  opacity: ${props => props.opacity};

`;

// Event poll

export const VoteText = styled.Text.attrs({
  opacity: props => props.opacity || 1
})`
  color: ${colours.gray};
  fontWeight: 500;
  fontSize: ${ms12};
  opacity: ${props => props.opacity};

`;

export const CategoryTitleText = styled.Text.attrs({
  opacity: props => props.opacity || 1
})`
  color: ${colours.main};
  fontWeight: 600;
  fontSize: ${ms14};
  opacity: ${props => props.opacity};

`;

export const OptionText = styled.Text.attrs({
  opacity: props => props.opacity || 1,
  viewed: (props) => { return (props.viewed ? colours.darkgray : colours.darkgray); },
  color: (props) => { return (props.unConfirmedItem ? colours.darkgray : colours.darkgray); }
})`
  color: ${props => props.color};
  fontWeight: 500;
  fontSize: ${ms14};
  opacity: ${props => props.opacity};
  marginLeft: 4;
  marginRight: 4;

`;

export const ForgotPasswordText = styled.Text.attrs({

})`
  color: ${colours.main};
  fontWeight: 500;
  fontSize: ${ms14};
  textAlign: center;

`;

// Modals
export const ModalGeneralText = styled.Text.attrs({
  opacity: props => props.opacity || 1
})`
  color: ${colours.white};
  fontWeight: 600;
  fontSize: ${ms16};
  opacity: ${props => props.opacity};

`;

export const ModalMessageText = styled.Text.attrs({
  opacity: props => props.opacity || 1
})`
  color: ${colours.gray};
  fontWeight: 600;
  fontSize: ${ms14};
  opacity: ${props => props.opacity};

`;


// Drawer Menu

export const DrawerItemText = styled.Text.attrs({
  opacity: props => props.opacity || 1
})`
  color: ${colours.main};
  fontWeight: 600;
  fontSize: ${ms14};
  paddingHorizontal: 4;
  opacity: ${props => props.opacity};

`;


export const DrawerMessageText = styled.Text.attrs({
  opacity: props => props.opacity || 1
})`
  color: ${colours.gray};
  fontWeight: 600;
  fontSize: ${ms14};
  opacity: ${props => props.opacity};

`;

export const DrawerLinkText = styled.Text.attrs({
  opacity: props => props.opacity || 1
})`
  color: ${colours.gray};
  fontWeight: 600;
  fontSize: ${ms12};
  opacity: ${props => props.opacity};

`;
