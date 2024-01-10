import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import avatarsData from "../mocks/avatars.json";

const avatars = avatarsData.map((avatar) => {
  const formattedImg = avatar.avatarimg.replace(/\s/g, ""); // Remove spaces
  return {
    ...avatar,
    avatarimg: require(`../../src/image/avatar/${formattedImg}`),
  };
});

const Shop: React.FC = () => {
  const [avatarsList, setAvatarsList] = useState(avatars);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [points, setPoints] = useState(5000);

  const handleAvatarPress = (index: number) => {
    if (!avatarsList[index].bought) {
      setSelectedAvatar(index);
    }
  };

  const handleBuy = () => {
    if (selectedAvatar !== null) {
      const selected = avatarsList[selectedAvatar];
      if (!selected.bought && points >= selected.avatarprice) {
        setPoints(points - selected.avatarprice);

        const updatedAvatars = [...avatarsList];
        updatedAvatars[selectedAvatar] = {
          ...selected,
          bought: true,
          avatarname: `${selected.avatarname} SOLD OUT`,
        };
        setAvatarsList(updatedAvatars);
        console.log(`Bought Avatar: ${selected.avatarname}`);
      }
    }
  };

  useEffect(() => {
    console.log(`Initial Points: ${points} P`);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avatar Shop</Text>
      <Text style={styles.points}>{points} P</Text>
      <View style={styles.avatarGrid}>
        {avatarsList.map((avatar, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleAvatarPress(index)}
            activeOpacity={0.8}
          >
            <View style={styles.avatarContainer}>
              <View style={styles.boxAvatar}>
                <Image
                  source={avatar.avatarimg}
                  style={[
                    styles.avatarImage,
                    selectedAvatar !== index && styles.fadedAvatar,
                  ]}
                />
                <Text style={styles.avatarInfo}>
                  {avatar.avatarname}{" "}
                  {avatar.bought ? "SOLD OUT" : `${avatar.avatarprice} P`}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={handleBuy}
        style={[
          styles.buyButton,
          selectedAvatar === null ||
            (avatarsList[selectedAvatar].bought && styles.fadedButton),
        ]}
      >
        <Text style={styles.buyButtonText}>Buy</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  avatarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  avatarContainer: {
    alignItems: "center",
    margin: 5,
  },
  boxAvatar: {
    width: 120,
    height: 120,
    borderRadius: 15,
    overflow: "hidden",
    borderColor: "black",
    borderWidth: 1,
  },
  avatarImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  fadedAvatar: {
    opacity: 0.5,
  },
  avatarInfo: {
    textAlign: "center",
    marginTop: 5,
  },
  buyButton: {
    width: 100,
    backgroundColor: "blue",
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buyButtonText: {
    color: "white",
    fontWeight: "bold",
    paddingVertical: 5,
  },
  fadedButton: {
    opacity: 0.5,
  },
  points: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Shop;
