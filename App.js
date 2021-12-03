import { StatusBar } from 'expo-status-bar';
// import for error timer long period
import { LogBox } from 'react-native';

// be sure everything is setup
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

// import our Stack
// NOTE version of navigation/stack here is v5
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/RegisterScreen';
import AddChatSreen from './screens/AddChatSreen';
import ChatScreen from './screens/ChatScreen';

// Create our first stack
const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: {backgroundColor: "#2C6BED"},
  // background color
  headerTitleStyle: { color: "white" },
  // title color
  headerTintColor: "white",
  // Icon color
}

import { Platform, InteractionManager } from 'react-native';

export default function App() {
  // To avoid the timer for a long period of time
  LogBox.ignoreLogs(['Setting a timer']);

  // const _setTimeout = global.setTimeout;
  // const _clearTimeout = global.clearTimeout;
  // const MAX_TIMER_DURATION_MS = 60 * 1000;
  // if (Platform.OS === 'android') {
  //   const timerFix = {};
  //   const runTask = (id, fn, ttl, args) => {
  //     const waitingTime = ttl - Date.now();
  //     if (waitingTime <= 1) {
  //       InteractionManager.runAfterInteractions(() => {
  //         if (!timerFix[id]) {
  //           return;
  //         }
  //         delete timerFix[id];
  //         fn(...args);
  //       });
  //       return;
  //     }
  //     const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
  //     timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  //   };
  //   global.setTimeout = (fn, time, ...args) => {
  //     if (MAX_TIMER_DURATION_MS < time) {
  //       const ttl = Date.now() + time;
  //       const id = '_lt_' + Object.keys(timerFix).length;
  //       runTask(id, fn, ttl, args);
  //       return id;
  //     }
  //     return _setTimeout(fn, time, ...args);
  //   };
  //   global.clearTimeout = id => {
  //     if (typeof id === 'string' && id.startsWith('_lt_')) {
  //       _clearTimeout(timerFix[id]);
  //       delete timerFix[id];
  //       return;
  //     }
  //     _clearTimeout(id);
  //   };
  // }

  return (
    // Div > is View : because its for web, IOS, and Android

    // Surround the entire app with NavigationContainer

    // in Stack.Screnn 
    // To change Tille
    // add options={{title: 'Lets Sign Up',}}

    // in Stack.Navigator
    // Global style
    // add screenOptions
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={globalScreenOptions}>
          {/* Becarfull the first page here is open like "/" : warning : "order" 
          or use the initialRouteName='' on Stack.navigator
          */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddChat" component={AddChatSreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    // CSS is in camelCase no "-" : in raect-native
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
