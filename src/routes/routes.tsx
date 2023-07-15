import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SignInScreen } from "../screens/sign_in/sign_in_screen";
import { routesAuth } from "./routes.auth";
import { HomeScreen } from "../screens/home/home_screen";
import { InfoScreen } from "../screens/info/info_screen";
import { ProfileScreen } from "../screens/profile/profile_screen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Text, View } from "react-native";
import { routesBottomTabs } from "./routes.bottom.tab";

//
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        {routesAuth.map((v) => (
          <Stack.Screen
            key={v?.id}
            name={v?.name}
            component={v?.component}
            options={{ headerShown: false }}
          />
        ))}
      </Stack.Navigator> */}

      {/* After Sign In */}
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
    </NavigationContainer>
  );
}
