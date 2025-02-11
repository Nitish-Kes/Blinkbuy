import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath, Rect } from 'react-native-svg';

const MicrosoftIcon = (props: SvgProps) => (
  <Svg width={25} height={25} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Rect x={1} y={1} width={10.5} height={10.5} fill="#F25022" />
      <Rect x={1} y={12.5} width={10.5} height={10.5} fill="#7FBA00" />
      <Rect x={12.5} y={1} width={10.5} height={10.5} fill="#00A4EF" />
      <Rect x={12.5} y={12.5} width={10.5} height={10.5} fill="#FFB900" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Rect width={25} height={25} fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default MicrosoftIcon;
