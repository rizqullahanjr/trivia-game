import React from "react";
import { View } from "react-native";
import { Image, Text, TouchableOpacity } from "react-native";

export default function Score({ onPress, score }: any) {
  return (
    <View>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 8,
          right: 15,
          zIndex: 1,
          backgroundColor: "rgba(0,0,0,0.9)",
          borderRadius: 5,
          flexDirection: "row",
          alignItems: "center",
          padding: 5,
        }}
      >
        <Image
          source={require("../image/score.jpg")}
          style={{ width: 25, height: 25, marginRight: 5 }}
        />
        <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
          {score}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
