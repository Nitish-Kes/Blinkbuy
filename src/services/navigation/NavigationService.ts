import { NavigationContainerRef } from '@react-navigation/native';
import React from 'react';
import { SCREEN_NAMES } from '../../utils/NavigationUtils';
import { RootStackParamsList } from '../../navigation/types';

export const navigationRef = React.createRef<NavigationContainerRef<RootStackParamsList>>();

export function getCurrentRoute() {
  return navigationRef?.current?.getCurrentRoute()?.name;
}

export function navigateToHome() {
  navigationRef?.current?.reset({
    index: 0,
    routes: [{ name: SCREEN_NAMES.Home }],
  });
}

export function navigateToLogin() {
  navigationRef?.current?.reset({
    index: 0,
    routes: [{ name: SCREEN_NAMES.Login }],
  });
}
