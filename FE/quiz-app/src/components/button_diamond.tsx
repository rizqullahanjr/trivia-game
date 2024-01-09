import React from "react";
import { View } from "react-native";
import { Image, Text, TouchableOpacity } from "react-native";

export default function ButtonDiamond({ onPress }: any) {
  return (
    <View>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 15,
          right: 15,
          zIndex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../image/diamond.jpg")}
          style={{ width: 25, height: 25, marginRight: 5 }}
        />
        <Text style={{ color: "white", fontSize: 14, fontWeight: "bold" }}>
          55
        </Text>
        <TouchableOpacity
          onPress={onPress}
          style={{
            marginLeft: 10,
            backgroundColor: "#16FF00",
            paddingHorizontal: 7,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              textShadowColor: "black",
              textShadowRadius: 10,
              marginTop: -5,
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}
