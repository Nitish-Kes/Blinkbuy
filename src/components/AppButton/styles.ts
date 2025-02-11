import { makeStyles } from '@rneui/themed';

import { Fonts } from '../../assets/fonts';
import { moderateScale, verticalScale } from '../../utils/AppDimensions';
import { Colors } from '../../utils/Colors';
import { FontSizes, LineHeights } from '../../utils/Fonts';

const useStyles = makeStyles(theme => ({
  button: {
    alignItems: 'center',
    backgroundColor: Colors.blue,
    borderRadius: moderateScale(16),
  },
  textStyle: {
    paddingVertical: verticalScale(8),
    fontSize: FontSizes.S18,
    lineHeight: LineHeights.L22,
    color: Colors.white,
    fontFamily: Fonts.Bold,
  },
}));

export default useStyles;