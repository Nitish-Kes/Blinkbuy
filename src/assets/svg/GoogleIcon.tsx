import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

const GoogleIcon = (props: SvgProps) => (
  <Svg width={25} height={25} fill="none" {...props}>
    <G clipPath="url(#a)">
      <G clipPath="url(#b)">
        <Path
          fill="#4285F4"
          d="M24.266 12.276c0-.816-.066-1.636-.207-2.438H12.74v4.62h6.482a5.554 5.554 0 0 1-2.399 3.647v2.999h3.867c2.27-2.09 3.576-5.177 3.576-8.828Z"
        />
        <Path
          fill="#34A853"
          d="M12.74 24.001c3.237 0 5.966-1.062 7.955-2.897l-3.867-2.998c-1.076.732-2.465 1.146-4.083 1.146-3.131 0-5.786-2.112-6.738-4.951h-3.99v3.09a12.002 12.002 0 0 0 10.723 6.61Z"
        />
        <Path
          fill="#FBBC04"
          d="M6.003 14.3a7.188 7.188 0 0 1 0-4.594v-3.09H2.016a12.01 12.01 0 0 0 0 10.776L6.003 14.3Z"
        />
        <Path
          fill="#EA4335"
          d="M12.74 4.75a6.52 6.52 0 0 1 4.603 1.799l3.427-3.426A11.533 11.533 0 0 0 12.74 0 11.998 11.998 0 0 0 2.017 6.615l3.986 3.09C6.95 6.863 9.609 4.75 12.74 4.75Z"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h24v24H.5z" />
      </ClipPath>
      <ClipPath id="b">
        <Path fill="#fff" d="M.5 0h24v24H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default GoogleIcon;