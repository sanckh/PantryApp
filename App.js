import * as React from 'react';
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import 'react-native-gesture-handler';


//components
import { theme } from './core/theme';


//screens
import GroceryList from './navigation/screens/GroceryList';
import Inventory from './navigation/screens/Inventory';
import Settings from './navigation/screens/Settings';
import StartScreen from './navigation/screens/StartScreen';
import LoginScreen from './navigation/screens/LoginScreen';
import RegisterScreen from './navigation/screens/RegisterScreen';


const settingsName = 'Settings';
const inventoryName = 'Inventory';
const groceryName = 'Grocery';


const Tab = createMaterialBottomTabNavigator();


  function Home() {
    return(
      <Provider theme = {theme}>
        <Tab.Navigator
            barStyle = {{
              backgroundColor: theme.colors.primary, 
              padding: 8,
              
            }}
            labeled = 'true'
            
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === groceryName)
                    {
                        iconName = focused ? 'list' : 'list-outline';
                    }
                    else if (rn === inventoryName)
                    {
                        iconName = focused ? 'fast-food' : 'fast-food'
                    }
                    else if (rn === settingsName)
                    {
                        iconName = focused ? 'settings' : 'settings'
                    }
                    return <Ionicons name={iconName} size={25} color={color}/>
                },
            })}>
              <Tab.Screen name={'Inventory'} component={Inventory} />
              <Tab.Screen name={'Grocery'} component={GroceryList} />
              <Tab.Screen name={'Settings'} component={Settings} />
          </Tab.Navigator>
        </Provider>
    )
  }

  const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider theme={theme}>
        <NavigationContainer>
        <Stack.Navigator
        initialRouteName = "Home"
        screenOptions = {{
          headerShown: false,
        }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider> 
  );
}

export default App;


