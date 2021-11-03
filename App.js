import React from 'react';
import 'react-native'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';


const Stack = createStackNavigator()


export default function App() {

  const globalScreenOptions = {
    headerStyle:{backgroundColor:'#2C6BED'},
    headerTitleStyle:{color:'white'},
    headerTintColor:'white'
  }


  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={globalScreenOptions}
      >
      <Stack.Screen name="Login"
       component={LoginScreen}
       options={{
         title:'Lets Sign Up'
       }}
       />
      <Stack.Screen name="Register"
       component={RegisterScreen}
       options={{
         title:'Lets Register'
       }}
       />
      <Stack.Screen name="Home"
       component={HomeScreen}
       options={{
         title:'Home'
       }}
       />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
