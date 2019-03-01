import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
// console.log('width: ', width);
// console.log('height: ', height);
// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 620;

const tabletWidth = 600;
// const tabletHeight = 800;
const isTablet = width > tabletWidth;

const scale = size => Number((width / guidelineBaseWidth) * size);
const horizontalScale2 = (size, factor = 0.7) => Number(((width / guidelineBaseWidth) * size) * factor);
const verticalScale = size => Number((height / guidelineBaseHeight) * size);
const verticalScale2 = (size, factor = 0.8) => Number(((height / guidelineBaseHeight) * size) * factor);
const moderateScale = (size, factor = 0.3) => Number(size + ((scale(size) - size) * factor));
const buttonScale = (size, factor = 0.4) => Number(((width / guidelineBaseWidth) * size) * factor);
const feedHorizPaddingScale = (size, factor = (isTablet ? 4 : 1)) => Number(((width / guidelineBaseWidth) * size) * factor);
const feedVertPaddingScale = (size, factor = 1) => Number(((width / guidelineBaseWidth) * size) * factor);
const barScale = (size, factor = 0.4) => Number(((width / guidelineBaseWidth) * size) * factor);
const iconScale = (size, factor = 0.5) => Number(((width / guidelineBaseWidth) * size) * factor);


export {
  scale,
  verticalScale,
  moderateScale,
  verticalScale2,
  horizontalScale2,
  buttonScale,
  feedHorizPaddingScale,
  feedVertPaddingScale,
  barScale,
  iconScale };
