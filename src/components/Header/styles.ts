import { makeStyles } from "@rneui/base";
import { Fonts } from "../../assets/fonts";
import { FontSizes, LineHeights } from "../../utils/Fonts";
import { verticalScale } from "../../utils/AppDimensions";
import { Colors } from "../../utils/Colors";

const useStyles = makeStyles({
    headerView: {
        alignItems: 'center',
   },
   headerText: {
       fontFamily: Fonts.Bold,
       fontSize: FontSizes.S28,
       lineHeight: LineHeights.L36,
       color: Colors.semiBlack,
       marginVertical: verticalScale(10)
   },
})

export default useStyles