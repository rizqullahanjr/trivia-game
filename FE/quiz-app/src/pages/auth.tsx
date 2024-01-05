import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import GoogleButton from "react-google-button";

const Auth = () => {
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
          <Pressable onPress={() => {}}>
            <GoogleButton />
          </Pressable>
        </View>
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
