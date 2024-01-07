import React, { useState } from "react";
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
import { Avatar, Icon } from "@rneui/themed";
import myAvatar from "../components/avatarSingle";

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
  const [selectedAvatar, setSelectedAvatar] = useState<boolean>(false);
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
            <TouchableOpacity style={styles.touchAvatar} onPress={() => {}}>
              <View style={styles.touchAvatar}>
                <Image style={styles.avatarProfile} source={imgSplash[3]} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchAvatar} onPress={() => {}}>
              <View style={styles.touchAvatar}>
                <Image style={styles.avatarProfile} source={imgSplash[3]} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchAvatar} onPress={() => {}}>
              <View style={styles.touchAvatar}>
                <Image style={styles.avatarProfile} source={imgSplash[3]} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchAvatar} onPress={() => {}}>
              <View style={styles.touchAvatar}>
                <Image style={styles.avatarProfile} source={imgSplash[3]} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchAvatar} onPress={() => {}}>
              <View style={styles.touchAvatar}>
                <Image style={styles.avatarProfile} source={imgSplash[3]} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchAvatar} onPress={() => {}}>
              <View style={styles.touchAvatar}>
                <Image style={styles.avatarProfile} source={imgSplash[3]} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchAvatar} onPress={() => {}}>
              <View style={styles.touchAvatar}>
                <Image style={styles.avatarProfile} source={imgSplash[3]} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchAvatar} onPress={() => {}}>
              <View style={styles.touchAvatar}>
                <Image style={styles.avatarProfile} source={imgSplash[3]} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchAvatar} onPress={() => {}}>
              <View style={styles.touchAvatar}>
                <Image style={styles.avatarProfile} source={imgSplash[3]} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchAvatar} onPress={() => {}}>
              <View style={styles.touchAvatar}>
                <Image style={styles.avatarProfile} source={imgSplash[3]} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchAvatar} onPress={() => {}}>
              <View style={styles.touchAvatar}>
                <Image style={styles.avatarProfile} source={imgSplash[3]} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchAvatar} onPress={() => {}}>
              <View style={styles.touchAvatar}>
                <Image style={styles.avatarProfile} source={imgSplash[3]} />
              </View>
            </TouchableOpacity>
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
            <TextInput id="yourname" style={styles.input} />
          </View>
          {/* </label> */}

          <View style={{ width: 300, margin: "auto", marginTop: 20 }}>
            <Button color="green" title="Continue" />
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
    height: 340,
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
