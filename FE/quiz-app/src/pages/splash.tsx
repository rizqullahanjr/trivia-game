import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import {
  Image,
  View,
  ImageStyle,
  StyleSheet,
  Text,
  ImageBackground,
} from "react-native";
// import * as splashImg from "../../image/splash.png";

///////////animation

const imgSplash = [
  require("../image/splash.jpg"),
  require("../image/bgImage.jpg"),
];

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Auth" as never);
    }, 3000);
  }, [navigation]);

  return (
    <>
      <ImageBackground
        resizeMode="stretch"
        style={styles.container}
        source={{
          uri: "https://res.cloudinary.com/diwvvx24j/image/upload/v1706004082/image%20trivia-game/bg-game.avif",
        }}
      >
        <Image
          source={{
            uri: "https://res.cloudinary.com/diwvvx24j/image/upload/v1706004083/image%20trivia-game/logo.jpg",
          }}
          style={styles.Image}
        />
      </ImageBackground>
    </>
  );
};

export default Splash;

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
    borderRadius: 100,
  },
});

// const styles2 = StyleSheet.create({
//   image: {
//     height:
//   },
// });
