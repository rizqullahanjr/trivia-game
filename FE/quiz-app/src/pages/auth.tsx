import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import GoogleButton from "react-google-button";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { API, setAuthToken } from "../libs/api";

interface UserInfo {
  picture?: string;
  email: string;
  verified_email: boolean;
  name: string;
}

WebBrowser.maybeCompleteAuthSession();

// AuthSession.AuthSessionManager.setOptions({
//   authenticationCallback: {
//     url: AuthSession.makeRedirectUri({ useProxy: true }),
//     loadAsync: async (req) => {
//       return { status: 200, headers: {}, body: 'OK' };
//     },
//   },
// });

const Auth = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({});
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "310772316967-ammvoc874ri16n0c7clcg6fjaj23mtrn.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleSignInGoogle();
  }, [response]);

  async function handleSignInGoogle() {
    const user = await AsyncStorage.getItem("@user");

    if (!user) {
      if (response?.type === "success")
        await getUserInfo(response.authentication?.accessToken || "");
      const res = await API.post("/auth/login", userInfo);
      console.log(res);

      // Add the following line to send user information to your endpoint
      // await postUserInfoToDatabase(userInfo);
      // const user = await JSON.stringify(userInfo)
      // const response = await API.post("/auth/login",JSON.stringify(userInfo))
    } else {
      setUserInfo(JSON.parse(user));
      // navigation.navigate("Avatars");
    }
  }

  const getUserInfo = async (token: string) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();

      const { email, name } = user;

      await AsyncStorage.setItem("@user", JSON.stringify({ email, name }));
      setUserInfo({ email, name });

      // await API.post

      // navigation.navigate("Avatars");
    } catch (error) {}
  };

  const postUserInfoToDatabase = async (userInfo: any) => {
    try {
      const response = await API.post("/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      console.log(response.status);

      const data = response.data;

      // console.log(data);

      // setAuthToken(localStorage.token);
      console.log("User information posted to database:", data);
    } catch (error) {
      console.error("Error posting user information to database:", error);
    }
  };

  // console.log(userInfo);

  const imgSplash = [
    require("../image/splash.jpg"),
    require("../image/bgImage.jpg"),
  ];
  return (
    <>
      <ImageBackground
        resizeMode="stretch"
        style={styles.container}
        source={imgSplash[1]}
      >
        <Image source={imgSplash[0]} style={styles.Image} />

        <View style={{ marginBottom: 20 }}>
          <TouchableOpacity onPress={promptAsync}>
            <GoogleButton />
          </TouchableOpacity>
          {/* <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleSignIn}
          /> */}
        </View>
        <Text>{JSON.stringify(userInfo, null, 2)}</Text>
        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            By continue, you agree to Terms and Privacy
          </Text>
        </View>
      </ImageBackground>
    </>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
  },

  Image: {
    height: 150,
    width: 150,
    // margin: "auto",
    marginTop: -10,
    borderRadius: 100,
    marginBottom: 80,
  },
});

// useEffect(() => {
//   configureGoogleSignIn();
// }, []);

// const configureGoogleSignIn = async () => {
//   try {
//     await GoogleSignin.hasPlayServices();
//     await GoogleSignin.configure({
//       webClientId:
//         "283225227768-50r9i7jv2bjtp49opecukpkvafqp9adc.apps.googleusercontent.com", // Ganti dengan web client ID Anda dari Google Cloud Console
//     });
//   } catch (error) {
//     console.log("Google Sign-In configuration error:", error);
//   }
// };

// const handleSignIn = async () => {
//   try {
//     await GoogleSignin.hasPlayServices();
//     const userInfo = await GoogleSignin.signIn();
//     Alert.alert("Success", `Welcome ${userInfo.user.name}!`);
//   } catch (error: any) {
//     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//       Alert.alert("Canceled", "Google Sign-In was canceled");
//     } else if (error.code === statusCodes.IN_PROGRESS) {
//       Alert.alert("In Progress", "Google Sign-In is already in progress");
//     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//       Alert.alert(
//         "Play Services Not Available",
//         "Please install Google Play Services"
//       );
//     } else {
//       console.error("Google Sign-In error:", error);
//     }
//   }
// };

// onPress={()=>{
//   AsyncStorage.removeItem("@user")
// }}
