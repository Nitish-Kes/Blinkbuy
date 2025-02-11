import { createTheme } from "@rneui/themed";
import { Colors } from "../../utils/Colors";

const theme = createTheme({
    lightColors: Colors,
    darkColors: Colors,
    mode: 'light',
  });

  export default theme