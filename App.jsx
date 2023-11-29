import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import Home from "./Home";
import AlarmGroup from "./AlarmGroup";
import * as Notifications from "expo-notifications";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    (async () => {
      await Notifications.requestPermissionsAsync();
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AlarmGroup"
          component={AlarmGroup}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
