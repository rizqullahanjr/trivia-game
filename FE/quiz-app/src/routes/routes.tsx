import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../pages/splash";
import Auth from "../pages/auth";
import Avatars from "../pages/config_avatar";
import Home from "../pages/home";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Avatars"
        component={Avatars}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
