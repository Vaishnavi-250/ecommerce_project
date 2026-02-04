import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import QuizScreen from './screens/QuizScreen';
import MissionsScreen from './screens/MissionsScreen';
import LogActionScreen from './screens/LogActionScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const HomeStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ headerTitle: 'Dashboard' }}
    />
  </Stack.Navigator>
);

const QuizStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="QuizzesScreen"
      component={QuizScreen}
      options={{ headerTitle: 'Quizzes' }}
    />
  </Stack.Navigator>
);

const MissionsStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MissionsScreen"
      component={MissionsScreen}
      options={{ headerTitle: 'Missions' }}
    />
  </Stack.Navigator>
);

const LogActionStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="LogActionScreen"
      component={LogActionScreen}
      options={{ headerTitle: 'Log Action' }}
    />
  </Stack.Navigator>
);

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#667eea',
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStackNavigator}
      options={{
        tabBarLabel: 'Dashboard',
        tabBarIcon: () => '🏠',
      }}
    />
    <Tab.Screen
      name="Quizzes"
      component={QuizStackNavigator}
      options={{
        tabBarLabel: 'Quizzes',
        tabBarIcon: () => '📚',
      }}
    />
    <Tab.Screen
      name="Missions"
      component={MissionsStackNavigator}
      options={{
        tabBarLabel: 'Missions',
        tabBarIcon: () => '🎯',
      }}
    />
    <Tab.Screen
      name="LogAction"
      component={LogActionStackNavigator}
      options={{
        tabBarLabel: 'Log Action',
        tabBarIcon: () => '🌱',
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('token');
    setIsLoggedIn(!!token);
    setIsLoading(false);
  };

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
