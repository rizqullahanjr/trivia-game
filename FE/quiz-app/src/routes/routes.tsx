import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../pages/splash";
import Auth from "../pages/auth";
import Avatars from "../pages/config_avatar";
import Home from "../pages/home";
import Match from "../pages/pre-game";
import Quiz from "../pages/quiz-time";
import Board from "../pages/ladderboard";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="Quiz">
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
      <Stack.Screen
        name="Match"
        component={Match}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Board"
        component={Board}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
