import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// type AvatarData = {
//   image: string;
//   id: string;
// };

const imgSplash = [
  require("../image/splash.jpg"),
  require("../image/bgImage.jpg"),
  require("../image/input.jpg"),
  require("../image/boy.png"),
  require("../image/avatar.png"),
  ,
];

const avatarList = [
  {
    id: 1,
    image: imgSplash[0],
  },
  {
    id: 2,
    image: imgSplash[1],
  },
  {
    id: 3,
    image: imgSplash[2],
  },
];

const Avatars: React.FunctionComponent = () => {
  const [playerName, setPlayerName] = useState<string>("");
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [avatarList, setAvatarList] = useState();
  const navigate = useNavigation();

  async function getAvatar() {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      try {
        const res = await axios.get(
          "http://192.168.18.174:8000/api/avatar/get-all-free-avatar",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Assuming the data is an array of avatars
        const avatars = res.data;

        // Set the avatar list in the state
        setAvatarList(avatars);

        console.log(avatars);
      } catch (error) {
        console.error("Error fetching avatars:", error);
      }
    }
  }

  const handleContinue = async () => {
    if (playerName && selectedAvatar !== null) {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        try {
          const res = await axios.post(
            "http://192.168.18.174:8000/api/player/register",
            {
              name: playerName,
              avatar_id: selectedAvatar,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          console.log("Player created:", res.data);
          navigate.navigate("Home" as never);
        } catch (error) {
          console.error("Error creating player:", error);
        }
      }
    } else {
      console.warn("Name and avatar selection are required.");
    }
  };

  useEffect(() => {
    getAvatar();
  }, []);
  return (
    <>
      <ImageBackground
        resizeMode="stretch"
        style={styles.container}
        source={imgSplash[1]}
      >
        <ScrollView>
          <View style={{ margin: "auto" }}>
            <Image style={styles.Image} source={imgSplash[0]} />
          </View>

          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
              textAlign: "center",
              fontStyle: "italic",
              marginTop: 70,
              marginBottom: 10,
            }}
          >
            CHOSE YOUR AVATAR
          </Text>

          {/* avatar box */}

          <View style={styles.avatarBox}>
            <FlatList
              data={avatarList}
              numColumns={4} // Jumlah kolom yang diinginkan
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.touchAvatar}
                  onPress={() => setSelectedAvatar(item.id)}
                >
                  <View style={styles.touchAvatar}>
                    <Image style={styles.avatarProfile} source={item.image} />
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>

          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
              textAlign: "center",
            }}
          >
            Set Your Name
          </Text>
          {/* <label htmlFor="yourname"> */}
          <View style={styles.inpuxBox}>
            <Image
              source={imgSplash[2]}
              style={{ width: 40, height: 40, borderTopLeftRadius: 20 }}
            />
            <TextInput
              id="playername"
              style={styles.input}
              value={playerName}
              onChangeText={(text) => setPlayerName(text)}
            />
          </View>
          {/* </label> */}

          <View style={{ width: 300, margin: "auto", marginTop: 20 }}>
            <Button color="green" title="Continue" onPress={handleContinue} />
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    backgroundColor: "#2089dc",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    marginBottom: 10,
  },
  container: {
    flex: 1,
  },
  Image: {
    height: 100,
    width: 100,
    // margin: "auto",
    borderRadius: 100,
  },
  avatarBox: {
    width: 400,
    margin: "auto",
    height: 300,
    backgroundColor: "orange",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
  },
  input: {
    height: 40,
    width: 210,
    padding: 10,
    marginLeft: 60,
    marginTop: -35,
  },
  inpuxBox: {
    height: 50,
    width: 300,
    margin: "auto",
    backgroundColor: "white",
    display: "flex",
    borderRadius: 15,
  },
  title: {
    fontSize: 32,
  },
  avatarProfile: {
    width: 60,
    height: 70,
    display: "flex",
    borderRadius: 100,
    margin: "auto",
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
    height: 40,
  },
  touchAvatar: {
    marginRight: 20,
    backgroundColor: "black",
    width: 75,
    height: 80,
    borderRadius: 100,
    marginBottom: 15,
  },
});

export default Avatars;

// <Pressable>
// <View
//   style={{
//     marginRight: 20,
//     backgroundColor: "black",
//     width: 90,
//     height: 90,
//     borderRadius: 100,
//   }}
// >
//   <Image style={styles.avatarProfile} source={imgSplash[3]} />
// </View>
// </Pressable>
// <View
// style={{
//   marginRight: 20,
//   backgroundColor: "green",
//   width: 90,
//   height: 90,
//   borderRadius: 100,
// }}
// >
// <Pressable style={{ backgroundColor: "white" }}>
//   <Image style={styles.avatarProfile} source={imgSplash[4]} />
// </Pressable>
// </View>

// style={({ pressed }) => [
//   {
//     backgroundColor: pressed ? "red" : "white",
//   },
//   styles.wrapperCustom,
// ]}
// >
// {({ pressed }) => (
//   <Text style={{ color: "green" }}>
//     {pressed ? "Pressed!" : "Press Me"}
//   </Text>
// )}

{
  /* <myAvatar background="green" onPress={() => {}} /> */
}
