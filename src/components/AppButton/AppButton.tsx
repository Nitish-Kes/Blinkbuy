import React from 'react';
import { Button } from '@rneui/themed';

import { IAppButton } from './types';
import useStyles from './styles';

const AppButton = (props: IAppButton) => {
  const { title = '', titleStyle, buttonStyle, onPress, icon, } = props;
  const { button, textStyle } = useStyles();

  return (
    <Button
      {...props}
      icon={icon}
      titleStyle={[textStyle, titleStyle]}
      buttonStyle={[button, buttonStyle]}
      title={title}
      onPress={onPress}
    />
  );
};

export default AppButton