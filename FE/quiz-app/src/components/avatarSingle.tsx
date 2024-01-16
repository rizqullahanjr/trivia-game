import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const imgSplash = [
  require("../image/splash.jpg"),
  require("../image/bgImage.jpg"),
  require("../image/input.jpg"),
  require("../image/boy.png"),
  require("../image/avatar.png"),
  ,
];

export default function myAvatar({
  background,
  onPress,
}: {
  background: string;
  onPress?: () => void;
}) {
  const handlePress = async () => {
    if (onPress) {
      await onPress();
    }
  };
  return (
    <TouchableOpacity style={styles.touchAvatar} onPress={handlePress}>
      <View style={[styles.touchAvatar, { backgroundColor: background }]}>
        <Image style={styles.avatarProfile} source={imgSplash[3]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatarProfile: {
    width: 60,
    height: 70,
    display: "flex",
    borderRadius: 100,
    margin: "auto",
  },

  touchAvatar: {
    marginRight: 20,
    backgroundColor: "black",
    width: 75,
    height: 85,
    borderRadius: 100,
  },
});
