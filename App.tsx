import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from './src/screens/Dashboard';
import { DeviceManager } from './src/screens/DeviceManager';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            padding: 15,
            height: 90,
          },
        }}
      >
        <Tab.Screen
          name='Scale'
          component={Dashboard}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='home' color={color} size={size}></Ionicons>
            ),
          }}
        />
        <Tab.Screen
          name='Settings'
          component={DeviceManager}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='md-settings' color={color} size={size}></Ionicons>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
