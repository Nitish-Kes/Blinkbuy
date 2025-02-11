import * as React from 'react';
import Svg, { SvgProps, Path, Line } from 'react-native-svg';

const EyeClosedIcon = (props: SvgProps) => (
  <Svg width={22} height={16} fill="none" {...props}>
    <Path
      fill="#8e8e8e"
      d="M21.174 7.272C20.394 5.565 17.334 0 10.667 0S.939 5.565.159 7.272a1.75 1.75 0 0 0 0 1.458C.939 10.435 3.999 16 10.667 16c6.666 0 9.727-5.565 10.507-7.272a1.749 1.749 0 0 0 0-1.456Zm-10.507 6.95c-5.607 0-8.223-4.77-8.89-6.212.667-1.462 3.283-6.232 8.89-6.232 5.592 0 8.21 4.75 8.888 6.222-.679 1.473-3.296 6.222-8.888 6.222Z"
    />
    <Path
      fill="#8e8e8e"
      d="M10.667 3.556a4.444 4.444 0 1 0 0 8.889 4.444 4.444 0 0 0 0-8.89Zm0 7.11a2.667 2.667 0 1 1 0-5.333 2.667 2.667 0 0 1 0 5.334Z"
    />
    <Path
      stroke="#8e8e8e"
      strokeWidth={2}
      strokeLinecap="round"
      d="M2 14L19 2"
    />
  </Svg>
);

export default EyeClosedIcon;
