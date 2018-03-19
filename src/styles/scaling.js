import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => Number((width / guidelineBaseWidth) * size);
const verticalScale = size => Number((height / guidelineBaseHeight) * size);
const moderateScale = (size, factor = 0.5) => Number(size + ((scale(size) - size) * factor));

export { scale, verticalScale, moderateScale };
