import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { routesAuth } from "./routes.auth";
import { routesBottomTabs } from "./routes.bottom.tab";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useLogin } from "../zustand/services/auth";

//
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes() {
  //
  const { token, isLoad, setLogin } = useLogin();

  const checkToken = async () => {
    await setLogin();
  };

  React.useEffect(() => {
    checkToken();
  }, []);

  return (
    <NavigationContainer>
      {!token ? (
        <Stack.Navigator>
          {routesAuth.map((v) => (
            <Stack.Screen
              key={v?.id}
              name={v?.name}
              component={v?.component}
              options={{ headerShown: false }}
            />
          ))}
        </Stack.Navigator>
      ) : (
        <Tab.Navigator initialRouteName="Home">
          {routesBottomTabs.map((e) => (
            <Tab.Screen
              key={e.id}
              name={e.name}
              component={e.component}
              options={{
                tabBarLabel: e.tabBarLabel,
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name={e.iconName}
                    color="#40C0E7"
                    size={26}
                  />
                ),
              }}
            />
          ))}
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
