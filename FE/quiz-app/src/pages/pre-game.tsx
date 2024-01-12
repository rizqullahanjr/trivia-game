import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import CountdownTimer from "../components/timer";

const match = () => {
  return (
    <>
      <ImageBackground
        resizeMode="stretch"
        source={require("../image/bgImage.jpg")}
        style={styles.container}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View style={{ padding: 20 }}>
            <Image
              style={styles.logo}
              source={require("../image/splash.jpg")}
            />
          </View>
          <View style={{ marginTop: 15 }}></View>
        </View>

        {/* count */}
        <View style={styles.center}>
          <Text style={styles.timer}>
            <CountdownTimer durationInSeconds={20} />
          </Text>
          <Text style={[styles.finding]}>Finding Opponent</Text>
          <Text style={[styles.finding, { color: "#29c910", marginTop: 7 }]}>
            1<Text style={{ color: "white" }}>/3</Text>
          </Text>
        </View>

        <View style={styles.playerGame}>
          <Image
            style={styles.avatarPlayer}
            source={require("../image/boy.jpg")}
          />

          <Text style={styles.name}>Melina_Mendung</Text>
        </View>
      </ImageBackground>
    </>
  );
};

export default match;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    // alignItems: "center",
    // justifyContent: "center",
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  timer: {
    fontSize: 30,
    color: "#fc7f03",
    fontFamily: "georgia",
    textAlign: "center",
    marginBottom: 5,
  },
  center: {
    width: 200,
    height: 100,
    backgroundColor: "rgba(198, 101, 224, 0.5)",
    textAlign: "center",
    marginHorizontal: "auto",
    borderRadius: 15,
  },
  finding: {
    fontSize: 20,
    fontFamily: "georgia",
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  playerGame: {
    width: 270,
    // height: 60,
    backgroundColor: "rgba(25, 22, 22, 0.8)",
    marginHorizontal: "auto",
    marginTop: 40,
    borderWidth: 4,
    borderColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    paddingVertical: 7,
    display: "flex",
    flexDirection: "row",
  },
  avatarPlayerBox: {
    width: 55,
    height: 55,
    backgroundColor: "rgba(196, 143, 143,1)",
    borderRadius: 100,
    objectFit: "cover",
    // padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarPlayer: {
    width: 50,
    height: 50,
    // backgroundColor: "black",
    objectFit: "cover",
    borderRadius: 100,
    // padding: 20,
    backgroundColor: "rgba(196, 143, 143,1)",
  },
  name: {
    color: "white",
    fontWeight: "500",
    fontSize: 20,
    fontFamily: "courier",
    marginVertical: "auto",
    marginLeft: 15,
  },
});
