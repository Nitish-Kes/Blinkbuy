import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../../navigation/types";
import { SCREEN_NAMES } from "../../utils/NavigationUtils";
export interface IRegister {
    navigation: NativeStackScreenProps<
      RootStackParamsList,
      SCREEN_NAMES.Register
    >['navigation'];
  }