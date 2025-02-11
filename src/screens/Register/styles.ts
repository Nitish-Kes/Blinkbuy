import {makeStyles} from '@rneui/themed';
import {
  moderateScale,
  screenHorizontalPadding,
  verticalScale,
} from '../../utils/AppDimensions';
import {FontSizes} from '../../utils/Fonts';
import {Colors} from '../../utils/Colors';
import {Fonts} from '../../assets/fonts';

const useStyles = makeStyles(() => ({
  scrollViewContentContainerStyle: {
    paddingBottom: verticalScale(50),
  },
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: screenHorizontalPadding,
  },
  form: {
    flex: 1,
    paddingVertical: verticalScale(20),
  },
  buttonStyle: {
    marginTop: verticalScale(15),
    marginHorizontal: moderateScale(5),
  },
  alreadyHaveAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: verticalScale(20),
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  alreadyHaveAccountText: {
    fontFamily: Fonts.Regular,
    fontSize: FontSizes.S16,
    fontWeight: '400',
    color: Colors.semiBlack,
  },
  loginText: {
    fontFamily: Fonts.Bold,
    marginStart: moderateScale(5),
  },
  inputContainerStyle: {
    backgroundColor: Colors.white,
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(2),
    borderWidth: moderateScale(1),
    borderColor: Colors.suvaGrey,
    borderRadius: moderateScale(16),
  },
}));

export default useStyles;
