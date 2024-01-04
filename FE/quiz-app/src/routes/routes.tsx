import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../pages/splash";

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="MainApp">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        /> */}
    </Stack.Navigator>
  );
};

export default Routes;
