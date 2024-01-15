import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyButton({
  text,
  textColor,
  onPress,
  navigateTo,
}: {
  text: string;
  textColor: string;
  onPress?: () => void;
  navigateTo?: string | undefined;
}) {
  const navigation = useNavigation();

  const handlePress = async () => {
    if (onPress) {
      await onPress();
    }

    if (navigateTo) {
      navigation.navigate(navigateTo as never);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        // paddingVertical: 15,
        // marginTop: 20,
        alignItems: "center",
        // alignSelf: "auto",
        elevation: 5,
        // backgroundColor: "white",
        width: "100%",
        height: "100%",
      }}
    >
      <Image
        style={{ width: 35, height: 35, borderRadius: 100, objectFit: "cover" }}
        source={require("../image/switch.jpg")}
      />
      <Text style={{ color: textColor, fontWeight: "bold", fontSize: 15 }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
