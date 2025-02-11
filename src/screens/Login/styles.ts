import { makeStyles } from "@rneui/base";
import { moderateScale, screenHorizontalPadding, verticalScale } from "../../utils/AppDimensions";
import { Fonts } from "../../assets/fonts";
import { FontSizes, LineHeights } from "../../utils/Fonts";
import { Colors } from "../../utils/Colors";

const useStyles = makeStyles(() =>({
    scrollViewContentContainerStyle: {
        paddingBottom: verticalScale(50),
    },
    mainContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        padding: screenHorizontalPadding,
    },
    buttonStyle:{
        marginTop: verticalScale(15),
        marginHorizontal: moderateScale(5)
    },
    newUserContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: verticalScale(20)
    },
    newUserText: {
        fontFamily: Fonts.Regular,
        fontSize: FontSizes.S16,
        fontWeight: '400',
        color: Colors.semiBlack,
    },
    registerText: {
        fontFamily: Fonts.Bold,
        marginStart: moderateScale(5)
    },
    socialSignInButton: {
        backgroundColor: Colors.white,
        marginBottom: verticalScale(10),
        borderWidth: 1,
        borderColor: Colors.black
    },
    socialSignInButtonTitle: {
        marginStart: moderateScale(10),
        color: Colors.blue
    },
    lineContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
        width: '100%',
        marginVertical: verticalScale(10),
        paddingHorizontal: moderateScale(10),
    },
    line: {
        flex: 1, 
        height: 1.2, 
        backgroundColor: Colors.gray80,
    },
    orTextStyle: {
        alignSelf: 'center',
        color: Colors.black,
        marginTop: verticalScale(10),
        marginBottom: verticalScale(20),
        marginHorizontal: moderateScale(10),
        fontSize: FontSizes.S16,
        lineHeight: LineHeights.L18,
    },
  })
)

export default useStyles