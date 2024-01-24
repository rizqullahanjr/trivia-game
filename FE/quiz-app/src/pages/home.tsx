import {
  Button,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonDiamond from "../components/button_diamond";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../stores/types/store";
import Shop from "../components/shop";
import Topup from "../components/topup";
import MyButton from "../components/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import socket from "../libs/socket";
import Score from "../components/score";
// AuthSession.AuthSessionManager.setOptions({
//   authenticationCallback: {
//     url: AuthSession.makeRedirectUri({ useProxy: true }),
//     loadAsync: async (req) => {
//       return { status: 200, headers: {}, body: 'OK' };
//     },
//   },
// });

const Home = () => {
  const navigate = useNavigation();
  const player = useSelector((state: RootState) => state.player);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDiamond, setModalDiamond] = useState(false);

  // const imgSplash = [
  //   require("../image/splash.jpg"),
  //   require("../image/bgImage.jpg"),
  //   require("../image/diamond.png"),
  // ];

  async function handleStart() {
    await socket.emit("room", {
      id: player.id,
      name: player.name,
      avatar: player.active_avatar,
    });
    navigate.navigate("Match" as never);
  }
  return (
    <>
      <ImageBackground
        resizeMode="stretch"
        style={styles.container}
        source={{
          uri: "https://res.cloudinary.com/diwvvx24j/image/upload/v1706004082/image%20trivia-game/bg-game.avif",
        }}
      >
        {/* modal avatar */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalAvatarView}>
              <Pressable
                style={styles.buttonClose}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textModal}>Close</Text>
              </Pressable>
              <ScrollView>
                <Shop />
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* modal diamond */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalDiamond}
          onRequestClose={() => {
            setModalDiamond(!modalDiamond);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalAvatarView}>
              <Pressable
                style={styles.buttonClose}
                onPress={() => setModalDiamond(!modalDiamond)}
              >
                <Text style={styles.textModal}>Close</Text>
              </Pressable>
              <ScrollView>
                <Topup />
              </ScrollView>
            </View>
          </View>
        </Modal>
        {/* top bar */}
        <View
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "row",
            gap: 90,
          }}
        >
          <View style={{ paddingVertical: 10, marginLeft: 10 }}>
            <Image
              source={{
                uri: "https://res.cloudinary.com/diwvvx24j/image/upload/v1706004083/image%20trivia-game/logo.jpg",
              }}
              style={[styles.Image]}
            />
          </View>
          <View style={styles.score}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                fontWeight: "300",
                color: "white",
                fontFamily: "georgia",
                left: 20,
                backgroundColor: "rgba(227, 22, 7, 0.9)",
                padding: 5,
                borderRadius: 10,
                top: 5,
              }}
            >
              Your Total Score :
            </Text>
            <Score score={player.total_score} />
          </View>

          <View style={{ marginTop: 15 }}>
            <ButtonDiamond
              diamond={player.diamond}
              onPress={() => setModalDiamond(true)}
            />
          </View>
        </View>
        {/* top end */}
        <View
          style={{
            backgroundColor: "rgba(25, 22, 22, 0.39)",
            // width: 250,
            minWidth: 150,
            maxWidth: 250,
            // height: 80,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: "auto",
            marginTop: 45,
          }}
        >
          <Text
            style={{
              color: "white",
              textShadowColor: "black",
              textShadowRadius: 10,
              fontWeight: "bold",
              fontSize: 24,
            }}
          >
            Hi,{player.name}
          </Text>
        </View>

        <View style={styles.avatar}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              style={styles.avatarHome}
              source={{
                uri: player.active_avatar,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.exchange}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              style={{ width: 20, height: 20 }}
              source={{
                uri: "https://res.cloudinary.com/diwvvx24j/image/upload/v1706004084/image%20trivia-game/change-btn.png",
              }}
            />
          </TouchableOpacity>
        </View>
        {/* start page */}
        <View
          style={{
            alignItems: "center",
            margin: "auto",
            justifyContent: "center",
            top: 20,
          }}
        >
          <Image
            style={styles.startImage}
            source={{
              uri: "https://res.cloudinary.com/diwvvx24j/image/upload/v1706004084/image%20trivia-game/start-game.png",
            }}
          />
          <View style={styles.buttonStart}>
            <Button onPress={handleStart} color={"green"} title="START GAME" />
          </View>

          {/* button logout */}
          <View
            style={{
              width: 50,
              height: 60,
              alignItems: "center",
              position: "relative",
              // right: -100,
              left: 130,
              top: 20,
            }}
          >
            <MyButton
              text={"Logout"}
              textColor="red"
              onPress={() => {
                AsyncStorage.clear(), navigate.navigate("Splash" as never);
              }}
            />
          </View>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    borderRadius: 20,
  },
  exchange: {
    width: 35,
    height: 35,
    position: "absolute",
    top: 233,
    right: 135,
    backgroundColor: "#94969c",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  Image: {
    height: 60,
    width: 60,
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
    height: 80,
    width: 80,
    // backgroundColor: "black",
    objectFit: "cover",
    borderRadius: 100,
  },
  score: {
    // width: 130,
    // backgroundColor: "rgba(227, 22, 7, 0.8)",
    borderRadius: 5,
    right: 55,
    top: 35,
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
    top: 165,
    borderWidth: 2,
    borderColor: "black",
    objectFit: "cover",
  },
  startImage: {
    width: 300,
    height: 200,
    position: "relative",
    margin: "auto",
  },
  buttonStart: {
    width: 200,
    // position: "relative",
    // top: 25,
  },
  modalAvatarView: {
    width: "85%",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: 500,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonClose: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3",
  },
  textModal: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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

{
  /* <View
style={{
  // marginLeft: 100,
  // backgroundColor: "black",
  width: 50,
  height: 60,
  alignItems: "center",
  // justifyContent: "center",
  // position: "relative",
  // right: -100,
  // left: 300,
  // top: 20,
}}
>
<MyButton
  text={"Logout"}
  textColor="red"
  onPress={() => {
    AsyncStorage.clear(), navigate.navigate("Splash" as never);
  }}
/>
</View> */
}
