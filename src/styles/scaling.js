import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => Number((width / guidelineBaseWidth) * size);
const horizontalScale2 = (size, factor = 0.7) => Number(((width / guidelineBaseWidth) * size) * factor);
const verticalScale = size => Number((height / guidelineBaseHeight) * size);
const verticalScale2 = (size, factor = 0.8) => Number(((height / guidelineBaseHeight) * size) * factor);
const moderateScale = (size, factor = 0.3) => Number(size + ((scale(size) - size) * factor));

export { scale, verticalScale, moderateScale, verticalScale2, horizontalScale2 };
