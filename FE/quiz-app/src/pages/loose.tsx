import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  Image,
  View,
  ImageStyle,
  StyleSheet,
  Text,
  ImageBackground,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/types/store";
import { RESET_SCORE, SCORE_PLAY } from "../stores/slices/sliceScore";
import socket from "../libs/socket";

interface score {
  rank: number;
  id: number;
  score: number;
  name: string;
  avatar: string;
}

const Loose = () => {
  const navigation = useNavigation();
  const [allScore, setallScore] = useState<score[]>([]);
  const score1 = useSelector((state: RootState) => state.score1);
  const navigate = useNavigation();
  const dispath = useDispatch();
  const player = useSelector((state: RootState) => state.player);

  function backHome() {
    // dispath(SCORE_PLAY([]));
    navigate.navigate("Home" as never);
  }

  async function playAgain() {
    // dispath(SCORE_PLAY([]));
    await socket.emit("room", {
      id: player.id,
      name: player.name,
      avatar: player.active_avatar,
    });
    navigate.navigate("Match" as never);
  }

  // const score =  AsyncStorage.getItem("score");
  // const allScoreP = JSON.parse(score ?? "[]");

  async function getScore() {
    const score = await AsyncStorage.getItem("score");
    setallScore(JSON.parse(score ?? "[]"));
  }

  useEffect(() => {
    getScore();
  }, []);
  // console.log(allScoreP);

  console.log("hasil dux", score1);

  return (
    <>
      <ImageBackground
        resizeMode="cover"
        style={styles.container}
        source={{
          uri: "https://res.cloudinary.com/diwvvx24j/image/upload/v1706004082/image%20trivia-game/bg-game.avif",
        }}
      >
        <View style={styles.titlePostBox}>
          <Text style={styles.tittleText}>Better luck next time</Text>
        </View>
        <View style={styles.boxBoard}>
          <View style={styles.boxAvatarAllPlayer}>
            <View style={styles.two}>
              <Image
                source={{ uri: score1[1].avatar }}
                style={[styles.avatarPlayer, { marginLeft: 15 }]}
              />
              <Text style={[styles.text, { maxWidth: 120, fontSize: 18 }]}>
                {score1[1].name}
              </Text>
              <Text style={[styles.text, { textAlign: "center", right: 12 }]}>
                {score1[1].score}
              </Text>
            </View>
            <View style={styles.one}>
              <Image
                source={{ uri: score1[0].avatar }}
                style={styles.avatarPlayer}
              />
              <Text style={styles.text}>{score1[0].name}</Text>
              <Text style={styles.text}>{score1[0].score}</Text>
            </View>
            <View style={styles.three}>
              <Image
                source={{ uri: score1[2].avatar }}
                style={[styles.avatarPlayer, { marginLeft: 18 }]}
              />
              <Text
                style={[
                  styles.text,
                  { maxWidth: 120, fontSize: 15, textAlign: "center" },
                ]}
              >
                {score1[2].name}
              </Text>
              <Text
                style={[styles.text, { textAlign: "center", fontSize: 18 }]}
              >
                {score1[2].score}
              </Text>
            </View>
          </View>
        </View>
        <Image
          style={styles.podium}
          source={{
            uri: "https://res.cloudinary.com/diwvvx24j/image/upload/v1706004084/image%20trivia-game/podium.png",
          }}
        />
        <View style={styles.boxButton}>
          <TouchableOpacity onPress={backHome} style={styles.buttonHome}>
            <Text style={styles.textHome}>Return to Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={playAgain} style={styles.buttonAgain}>
            <Text style={styles.textAgain}>Play again</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
};

export default Loose;

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
    // marginBottom: 40,
    marginTop: 30,
    marginBottom: 35,
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
    position: "relative",
    bottom: 20,
    objectFit: "cover",
    marginHorizontal: "auto",
    // backgroundColor: "yellow",
  },
  boxBoard: {
    marginHorizontal: "auto",
    // backgroundColor: "rgba(25, 22, 22, 0.8)",
    position: "relative",
    top: 7,
  },
  boxAvatarAllPlayer: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    gap: 40,
  },
  avatarPlayer: {
    width: 70,
    height: 70,
    borderRadius: 100,
    objectFit: "cover",
    backgroundColor: "white",
  },
  one: {
    top: 25,
    width: 130,
    alignItems: "center",
    right: 45,
  },
  two: {
    top: 90,
    marginLeft: 10,
    width: 120,
  },
  three: {
    top: 130,
    width: 110,
    right: 80,
  },
  text: {
    fontWeight: "400",
    color: "lightblue",
    fontFamily: "georgia",
    fontSize: 20,
    textShadowColor: "black",
    textShadowRadius: 10,
  },
  boxButton: {
    // width: "85%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: "auto",
    bottom: 50,
  },
  buttonHome: {
    backgroundColor: "red",
    width: 150,
    paddingHorizontal: 5,
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 4,
  },
  buttonAgain: {
    backgroundColor: "green",
    width: 150,
    paddingHorizontal: 5,
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 4,
    marginLeft: 20,
  },
  textHome: {
    textAlign: "center",
    fontSize: 15,
    color: "white",
    fontFamily: "georgia",
  },
  textAgain: {
    fontSize: 15,
    textAlign: "center",
    color: "white",
    fontFamily: "georgia",
    fontWeight: "600",
  },
});

// const styles2 = StyleSheet.create({
//   image: {
//     height:
//   },
// });
