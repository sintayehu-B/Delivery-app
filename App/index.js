import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from 'react-native';
import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./Screens/HomeScreen";
import RestaurantScreen from "./Screens/RestaurantScreen";
import { Provider } from "react-redux";
import { store } from "./data/store";
import BasketScreen from "./Screens/BasketScreen";
import PreparingOderScreen from "./Screens/PreparingOderScreen";
import DeliveryScreen from "./Screens/DeliveryScreen";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaProvider>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Restaurant" component={RestaurantScreen} />

            <Stack.Screen
              name="Basket"
              component={BasketScreen}
              options={{ presentation: "modal", headerShown: false }}
            />
            <Stack.Screen
              name="PreparingOrder"
              component={PreparingOderScreen}
              options={{ presentation: "fullScreenModal", headerShown: false }}
            />
            <Stack.Screen
              name="Delivery"
              component={DeliveryScreen}
              options={{ presentation: "fullScreenModal", headerShown: false }}
            />
          </Stack.Navigator>
        </SafeAreaProvider>
      </Provider>
    </NavigationContainer>
  );
}
