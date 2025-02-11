import { Button } from '@rneui/themed';
import { View } from 'react-native';

import { ILoader } from './types';
import useStyles from './styles';

const AppLoader = (props: ILoader) => {
  const { mainContainer, layerStyle, buttonStyle } = useStyles();
  const { bgStyle, containerStyle } = props;
  return (
    <View style={[mainContainer, containerStyle]} pointerEvents="none">
      <View style={[layerStyle, bgStyle]} />
      <Button
        loadingProps={{ size: 'large' }}
        loading={true}
        buttonStyle={buttonStyle}
      />
    </View>
  );
};

export default AppLoader