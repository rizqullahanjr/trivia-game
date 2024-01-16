import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import socket from "../libs/socket";
import { useSelector } from "react-redux";
import { RootState } from "../stores/types/store";

interface AllPlayer {
  id: number;
  name: string;
  avatar: string;
}

const Match = () => {
  const user = useSelector((state: RootState) => state.player);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [timer, setTimer] = useState(20);
  const navigation = useNavigation();
  const [allPlayer, setallPlayer] = useState<AllPlayer[]>([
    {
      id: user.id,
      name: user.name,
      avatar: user.active_avatar,
    },
  ]);

  useEffect(() => {
    socket.on("rooms", (msg: any) => {
      if (msg == "room is full") {
        navigation.navigate("Quiz" as never);
      } else {
        setallPlayer(msg);
        console.log(allPlayer);
        console.log(msg);
      }
    });
  }, [allPlayer]);

  // useEffect(()=>{
  //   allPlayer.forEach((player, index)=>{
  //     setallPlayer(index)
  //     allPlayer.push(allPlayer)
  //   })
  // })

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
            {timer}
            {/* <CountdownTimer durationInSeconds={20} /> */}
          </Text>
          <Text style={[styles.finding]}>Finding Opponent</Text>
          <Text style={[styles.finding, { color: "#29c910", marginTop: 7 }]}>
            {allPlayer.length}
            <Text style={{ color: "white" }}>/3</Text>
          </Text>
        </View>

        {allPlayer.map((player, index) => (
          <View key={index} style={[styles.playerGame]}>
            <Image
              style={styles.avatarPlayer}
              source={{ uri: player.avatar }}
            />

            <Text style={styles.name}>{player.name}</Text>
          </View>
        ))}
      </ImageBackground>
    </>
  );
};

export default Match;

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
