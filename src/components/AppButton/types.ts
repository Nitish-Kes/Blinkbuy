import { ButtonProps } from '@rneui/base';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface IAppButton extends ButtonProps {
  title?: string;
  icon?: JSX.Element;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}