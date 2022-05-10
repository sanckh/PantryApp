import * as React from 'react';
import {View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 

//screens
import LoginScreen from './navigation/screens/LoginScreen';
import GroceryList from './navigation/screens/GroceryList';
import Inventory from './navigation/screens/Inventory';
import Settings from './navigation/screens/Settings';

//screen names 
const GroceryName = 'Grocery';
const InventoryName = 'Inventory';
const SettingsName = 'Settings';
const LoginName = 'Login';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator
            initialRouteName={Inventory}
            >
            <Tab.Screen name={GroceryName} component={GroceryList} />
            <Tab.Screen name={InventoryName} component={Inventory} />
            <Tab.Screen name={SettingsName} component={Settings} />
            <Tab.Screen name ={LoginName} component = {LoginScreen} />
        </Tab.Navigator>
      </NavigationContainer>

  );
}
