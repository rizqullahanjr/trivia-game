import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import socket from "../libs/socket";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/types/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ROOM_ID } from "../stores/slices/authSlices";
import TimerApp from "../components/timerApp";

interface AllPlayer {
  id: number;
  name: string;
  avatar: string;
}

const Match = () => {
  const dispatch = useDispatch();
  const [room, setRoom] = useState("");
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
  // const [isReady, setIsReady] = useState(false);

  // async function getQuestion() {
  //   await socket.on("questions", (msg: any) => {
  //     setAllquestion(msg);
  //     console.log(msg);

  //   });
  // }

  useEffect(() => {
    socket.on("questions", (msg: any) => {
      AsyncStorage.setItem("quest", JSON.stringify(msg));
      console.log(msg);
    });

    socket.on("rooms", (msg: any) => {
      console.log(msg);
      if (msg.message == "room is full") {
        setRoom(msg.roomId);
        console.log(room);

        dispatch(
          ROOM_ID({
            roomId: msg.roomId,
          })
        );
        AsyncStorage.setItem("room", msg.roomId);
        setTimeout(() => {
          navigation.navigate("Quiz" as never);
        }, 3000);
      } else {
        setallPlayer(msg);
        // console.log(allPlayer);
      }
    });
  }, []);

  function isCancel() {
    socket.emit("leave", user.id);
    socket.disconnect();
    socket.connect();
    // setIsReady(false);
    navigation.navigate("Home" as never);
  }
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
        </View>

        {/* count */}
        <View style={styles.center}>
          <Text style={styles.timer}>
            {/* {timer} */}
            {/* <CountdownTimer durationInSeconds={20} /> */}
            <TimerApp />
          </Text>
          <Text style={[styles.finding]}>Finding Opponent</Text>
          <Text style={[styles.finding, { color: "#29c910", marginTop: 7 }]}>
            {allPlayer.length}
            <Text style={{ color: "white" }}>/3</Text>
          </Text>
        </View>

        <View style={{ height: 430 }}>
          {allPlayer.map((player, index) => (
            <>
              <View key={index} style={[styles.playerGame]}>
                <Image
                  style={styles.avatarPlayer}
                  source={{ uri: player.avatar }}
                />
                <Text style={styles.name}>{player.name}</Text>
                {/* {isReady && (
                  <Image
                    style={{
                      width: 45,
                      height: 45,
                      borderRadius: 100,
                      bottom: 25,
                    }}
                    source={require("../image/tick-mark.jpg")}
                  />
                )} */}
              </View>
            </>
          ))}
          <View style={styles.btnGroup}>
            <TouchableOpacity onPress={isCancel} style={styles.btnCancel}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require("../image/cancel.jpg")}
              />
              <Text style={styles.textCancel}>Cancel</Text>
            </TouchableOpacity>
            {/* btn ready */}
            {/* <TouchableOpacity
              onPress={() => setIsReady(true)}
              style={[styles.btnReady]}
            >
              <Image
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 100,
                  marginTop: -8,
                  marginLeft: -10,
                  marginRight: -7,
                }}
                source={require("../image/tick-mark.jpg")}
              />
              <Text style={[styles.textCancel]}>Ready</Text>
            </TouchableOpacity> */}
          </View>
        </View>
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
    marginTop: -20,
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
    marginTop: 30,
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
  btnGroup: {
    display: "flex",
    flexDirection: "row",
    marginTop: 25,
    position: "absolute",
    bottom: 0,
    right: 110,
  },
  btnCancel: {
    backgroundColor: "red",
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: 130,
    height: 40,
    paddingTop: 5,
    marginRight: 5,
  },
  btnReady: {
    backgroundColor: "green",
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: 140,
    height: 40,
    paddingTop: 5,
    marginLeft: 5,
  },
  textCancel: {
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "500",
    fontSize: 25,
    fontFamily: "georgia",
    color: "white",
    marginLeft: 7,
  },
});
