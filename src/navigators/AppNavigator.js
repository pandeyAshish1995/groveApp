import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeNavigator from './HomeNavigator';
import NavigationService from './NavigationService';

const {Navigator, Screen} = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer
      ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
      <Navigator headerMode="none" initialRouteName="HomeNavigator">
        <Screen name="HomeNavigator" component={HomeNavigator} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
