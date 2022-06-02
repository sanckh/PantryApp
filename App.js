import * as React from 'react'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { theme } from './core/theme'
import Ionicons from 'react-native-vector-icons/Ionicons'
import 'react-native-gesture-handler'
import { PortalProvider } from '@gorhom/portal'
import { Provider as ReduxProvider } from 'react-redux'

//screens
import GroceryList from './navigation/screens/GroceryList'
import Inventory from './navigation/screens/Inventory'
import Settings from './navigation/screens/Settings'
import StartScreen from './navigation/screens/StartScreen'
import LoginScreen from './navigation/screens/LoginScreen'
import RegisterScreen from './navigation/screens/RegisterScreen'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { store } from './redux/configureStore'
import Toast from 'react-native-toast-notifications'

const settingsName = 'Settings'
const inventoryName = 'Inventory'
const groceryName = 'Grocery'

const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()

function Home() {
  return (
    <Provider theme={theme}>
    <Tab.Navigator
      initialRouteName='Inventory'
      activeColor='#fff'
      shifting = 'true'
      barStyle= {{

    }}
     
    >
      <Tab.Screen 
      name={'Grocery'} 
      component={GroceryList}
      options={{
        tabBarLabel: 'Grocery List',
        tabBarColor: '#009387',
        tabBarIcon: ({ color }) => (
          <Ionicons name = 'list' color = {color} size = {26} /> 
        ),
      }}
      />
      <Tab.Screen 
      name={'Inventory'} 
      component={Inventory} 
      options={{
        tabBarLabel: 'Inventory',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({ color }) => (
          <Ionicons name = 'fast-food' color = {color} size = {26} /> 
        ),
      }}
      />
      <Tab.Screen 
      name={'Settings'} 
      component={Settings} 
      options={{
        tabBarLabel: 'Settings',
        tabBarColor: '#d02860',
        tabBarIcon: ({ color }) => (
          <Ionicons name = 'settings' color = {color} size = {26} /> 
        ),
      }}
      />
    </Tab.Navigator>
    </Provider>
  )
}


const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <ReduxProvider store={store}>
            <Provider theme={theme}>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName="Home"
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <Stack.Screen name="StartScreen" component={StartScreen} />
                  <Stack.Screen name="LoginScreen" component={LoginScreen} />
                  <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                  />
                  <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>
              </NavigationContainer>
            </Provider>
        </ReduxProvider>
      </PortalProvider>
      <Toast ref={r => global['toast'] = r} offset={100} />
    </GestureHandlerRootView>
  )
}

export default App;
