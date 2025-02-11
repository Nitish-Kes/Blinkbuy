import React from 'react';
import {View, Text} from 'react-native';
import useStyles from './styles';
import { TruckIcon } from '../../assets/svg';
import Strings from '../../utils/StringConstants';
import { IHeader } from './types';

const Header = (props: IHeader) => {
    const styles = useStyles()
    const {title} = props;
  return (
    <View style={styles.headerView}>
      <TruckIcon />
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};
export default Header;
