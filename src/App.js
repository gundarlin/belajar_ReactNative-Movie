import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Cari, Detail, HomeMovie} from './screen';

const MainApp = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeMovie} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Cari" component={Cari} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainApp;

const styles = StyleSheet.create({});
