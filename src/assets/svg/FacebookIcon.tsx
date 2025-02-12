import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const FacebookIcon = (props: SvgProps) => (
  <Svg width={16} height={19} fill="none" {...props}>
    <Path
      fill="#1877F2"
      d="M9.6 18.5V10.4h2.7l.4-3.2H9.6V5.2c0-.9.2-1.5 1.5-1.5h1.6V.2C12.2.1 11.3 0 10.4 0 8.1 0 6.6 1.3 6.6 3.7v3.5H4V10.4h2.6v8.1h3Z"
    />
  </Svg>
);

export default FacebookIcon;
