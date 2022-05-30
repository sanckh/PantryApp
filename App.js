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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          let rn = route.name

          if (rn === groceryName) {
            iconName = focused ? 'list' : 'list-outline'
          } else if (rn === inventoryName) {
            iconName = focused ? 'fast-food' : 'fast-food-outline'
          } else if (rn === settingsName) {
            iconName = focused ? 'settings' : 'settings-outline'
          }
          return <Ionicons name={iconName} size={30} color={color} />
        },
        tabBarStyle: {
          padding: 0,
          margin: 8,
          height: 60,
          borderRadius: 50,
          borderWidth: 0,
          borderColor: '#000000',
          position: 'absolute',
          shadowRadius: 1,
          shadowOpacity: 50,
        },
        tabBarLabel: false, //can add or remove the label
      })}
    >
      <Tab.Screen name={'Grocery'} component={GroceryList} />
      <Tab.Screen name={'Inventory'} component={Inventory} />
      <Tab.Screen name={'Settings'} component={Settings} />
    </Tab.Navigator>
  )
}

export default function App() {
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
