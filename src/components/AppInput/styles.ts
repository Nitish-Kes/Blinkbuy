import { makeStyles } from "@rneui/themed";
import { moderateScale, verticalScale } from "../../utils/AppDimensions";
import { Fonts } from "../../assets/fonts";
import { FontSizes, LineHeights } from "../../utils/Fonts";
import { Colors } from "../../utils/Colors";

type Props = {
    isError?: boolean,
    isFocused?: boolean
}

const useStyles = makeStyles((theme,props: Props) => ({
    text: {
        paddingBottom: verticalScale(2),
        fontFamily: Fonts.Semibold,
        fontSize: FontSizes.S20,
        lineHeight: LineHeights.L20,
        fontWeight: '700',
        color: Colors.semiBlack,
    },
    container:{
        paddingHorizontal: moderateScale(5),
        paddingVertical: verticalScale(0),
        marginTop: verticalScale(6),
        marginBottom: props.isError ? verticalScale(0) : verticalScale(6),
    },
    inputStyle:{
        fontFamily: Fonts.Regular,
        color: Colors.black,
        fontSize: FontSizes.S16,
    },
    textInputContainer: {
        backgroundColor: Colors.white,
        paddingHorizontal: moderateScale(10),
        paddingVertical: verticalScale(2),
        borderWidth: moderateScale(1),
        borderColor: props.isError ? Colors.error : props.isFocused ? Colors.blue : Colors.suvaGrey,
        borderRadius: moderateScale(16),
    },
    eyeIconStyle: {
        backgroundColor: Colors.white
    },
    errorTextColor: {
        fontFamily: Fonts.Regular,
        fontSize: FontSizes.S14,
        fontWeight: '400',
        color: Colors.error,
        paddingHorizontal: moderateScale(5),
        marginTop: verticalScale(1),
      },
}))

export default useStyles