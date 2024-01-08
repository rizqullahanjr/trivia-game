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
import ButtonDiamond from "../components/button_diamond";
// AuthSession.AuthSessionManager.setOptions({
//   authenticationCallback: {
//     url: AuthSession.makeRedirectUri({ useProxy: true }),
//     loadAsync: async (req) => {
//       return { status: 200, headers: {}, body: 'OK' };
//     },
//   },
// });

const Home = () => {
  const imgSplash = [
    require("../image/splash.jpg"),
    require("../image/bgImage.jpg"),
    require("../image/diamond.png"),
  ];
  return (
    <>
      <ImageBackground
        resizeMode="stretch"
        style={styles.container}
        source={imgSplash[1]}
      >
        {/* top bar */}
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View style={{ padding: 20 }}>
            <Image source={imgSplash[0]} style={[styles.Image]} />
          </View>
        </View>
        {/* top end */}
        <View style={styles.avatar}>
          <ButtonDiamond />
          <TouchableOpacity>
            <Image
              style={[styles.avatarHome]}
              source={require("../image/diamond.jpg")}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    // alignItems: "center",
    // justifyContent: "center",
  },

  Image: {
    height: 80,
    width: 80,
    // margin: "auto",
    // marginTop: -10,
    borderRadius: 100,
    // marginBottom: 80,
  },
  diamond: {
    height: 60,
    width: 60,
    marginTop: -7,
    // backgroundColor: "white",
    // borderRadius: 100,
  },
  avatarHome: {
    height: 100,
    width: 100,
  },
  avatar: {
    backgroundColor: "white",
    position: "absolute",
    right: 140,
    width: 100,
    height: 100,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    top: 140,
    borderWidth: 2,
    borderColor: "black",
  },
});

{
  /* <TouchableOpacity
            style={{
              width: 50,
              height: 40,
              display: "flex",
              flexDirection: "row",
              marginRight: 100,
              marginTop: 35,
              // backgroundColor: "white",
            }}
          >
            <Image source={imgSplash[2]} style={styles.diamond} />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                height: 30,
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  backgroundColor: "white",
                  fontWeight: "bold",
                  fontSize: 20,
                  marginLeft: -14,
                  width: 50,
                  textAlign: "center",
                  borderRadius: 2,
                }}
              >
                200
              </Text>
              <View
                style={{
                  backgroundColor: "green",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    textAlign: "center",
                    padding: 2,
                  }}
                >
                  ➕
                </Text>
              </View>
            </View>
          </TouchableOpacity> */
}
