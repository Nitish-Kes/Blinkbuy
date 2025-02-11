import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../../navigation/types";
import { SCREEN_NAMES } from "../../utils/NavigationUtils";

export interface Ilogin {
    navigation: NativeStackScreenProps<
      RootStackParamsList,
      SCREEN_NAMES.Login
    >['navigation'];
  }