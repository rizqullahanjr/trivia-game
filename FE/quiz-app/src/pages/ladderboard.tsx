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

const Board = () => {
  const navigation = useNavigation();

  return (
    <>
      <ImageBackground
        resizeMode="stretch"
        style={styles.container}
        source={require("../image/bgImage.jpg")}
      >
        <View style={styles.titlePostBox}>
          <Text style={styles.tittleText}>
            Congrats,{"\n"}you got
            <Text style={{ color: "lightblue" }}> 1 Diamond</Text>
          </Text>
        </View>
        <View style={styles.boxBoard}>
          <Image
            style={styles.podium}
            source={require("../image/podium.jpg")}
          />
        </View>
      </ImageBackground>
    </>
  );
};

export default Board;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
  },
  Image: {
    height: 150,
    width: 150,
    // margin: "auto",
    borderRadius: 100,
  },
  titlePostBox: {
    marginHorizontal: "auto",
    backgroundColor: "rgba(25, 22, 22, 0.8)",
    padding: 15,
    borderRadius: 15,
    marginBottom: 40,
    marginTop: 50,
  },
  tittleText: {
    fontSize: 30,
    fontWeight: "500",
    color: "white",
    fontFamily: "georgia",
    textAlign: "center",
  },
  podium: {
    width: 350,
    height: 350,
  },
  boxBoard: {
    marginHorizontal: "auto",
    backgroundColor: "black",
  },
});

// const styles2 = StyleSheet.create({
//   image: {
//     height:
//   },
// });
