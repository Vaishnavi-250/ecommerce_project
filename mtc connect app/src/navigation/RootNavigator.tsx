import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@constants/theme';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

// Screens
import LoginScreen from '@screens/LoginScreen';
import HomeScreen from '@screens/HomeScreen';
import TrackingScreen from '@screens/TrackingScreen';
import TicketsScreen from '@screens/TicketsScreen';
import ConnectivityScreen from '@screens/ConnectivityScreen';
import ProfileScreen from '@screens/ProfileScreen';
import SettingsScreen from '@screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Navigator
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

// App Navigator
const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Tracking') {
            iconName = focused ? 'location-sharp' : 'location-outline';
          } else if (route.name === 'Tickets') {
            iconName = focused ? 'ticket' : 'ticket-outline';
          } else if (route.name === 'Connectivity') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: Colors.lightGray,
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: Colors.white,
            borderBottomWidth: 1,
            borderBottomColor: Colors.lightGray,
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors.black,
          },
          headerTintColor: Colors.primary,
        }}
      />
      <Tab.Screen
        name="Tracking"
        component={TrackingScreen}
        options={{
          title: 'Track Bus',
          headerStyle: {
            backgroundColor: Colors.white,
            borderBottomWidth: 1,
            borderBottomColor: Colors.lightGray,
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors.black,
          },
          headerTintColor: Colors.primary,
        }}
      />
      <Tab.Screen
        name="Tickets"
        component={TicketsScreen}
        options={{
          title: 'My Tickets',
          headerStyle: {
            backgroundColor: Colors.white,
            borderBottomWidth: 1,
            borderBottomColor: Colors.lightGray,
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors.black,
          },
          headerTintColor: Colors.primary,
        }}
      />
      <Tab.Screen
        name="Connectivity"
        component={ConnectivityScreen}
        options={{
          title: 'Connectivity',
          headerStyle: {
            backgroundColor: Colors.white,
            borderBottomWidth: 1,
            borderBottomColor: Colors.lightGray,
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors.black,
          },
          headerTintColor: Colors.primary,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: Colors.white,
            borderBottomWidth: 1,
            borderBottomColor: Colors.lightGray,
          },
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors.black,
          },
          headerTintColor: Colors.primary,
        }}
      />
    </Tab.Navigator>
  );
};

// Root Navigator
const RootNavigator = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const linking = {
    prefixes: ['http://localhost:19006'],
    config: {
      screens: {
        Login: 'login',
        HomeTab: '',
        Tracking: 'tracking',
        Tickets: 'tickets',
        Connectivity: 'connectivity',
        Profile: 'profile',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
