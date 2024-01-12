import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";

import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/types/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DATA_PLAYER } from "../stores/slices/authSlices";

interface avatars {
  id: number;
  cost: number;
  image: string;
  avatar_id?: number;
  created_at?: Date;
  updated_at?: Date;
  bought?: boolean;
  avatarname?: string;
}

const Shop: React.FC = () => {
  const [avatarsList, setAvatarsList] = useState<avatars[]>();
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [points, setPoints] = useState(Number);
  const [cannotBuy, setCannotBuy] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const player = useSelector((state: RootState) => state.player);

  const handleAvatarPress = (avatarId: number) => {
    setCannotBuy(false);

    setSelectedAvatar(avatarId);
  };

  async function getAvatarShop() {
    const res = await axios.get(
      `http://192.168.18.174:5000/api/v1/avatar-user-update/${player.id}`
    );
    console.log(res.data);
    setAvatarsList(res.data);
  }

  async function handleSelect() {
    const token = await AsyncStorage.getItem("token");
    await axios.put(
      "http://192.168.18.174:8000/api/player/update-avatar",
      {
        avatar_id: selectedAvatar,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const getPlayer = await axios.get("http://192.168.18.174:8000/api/player", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const player = getPlayer.data;
    dispatch(DATA_PLAYER(player));
  }

  const handleBuy = async () => {
    const token = await AsyncStorage.getItem("token");
    if (selectedAvatar !== null) {
      const selected = avatarsList?.find(
        (avatar) => avatar.id === selectedAvatar
      );

      if (selected) {
        try {
          if (selected.cost === 0) {
            setAvatarsList((prevAvatars) => {
              return prevAvatars?.map((avatar) =>
                avatar.id === selectedAvatar
                  ? { ...avatar, bought: true }
                  : avatar
              );
            });
          } else if (points >= selected.cost) {
            const res = await axios.post(
              "http://192.168.18.174:8000/api/player/buy-avatar",
              {
                avatar_id: selectedAvatar,
                cost: selected.cost,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              } as { headers: { Authorization: string } }
            );
            dispatch(
              DATA_PLAYER({
                diamond: player.diamond - selected.cost,
                name: player.name,
                active_avatar: player.active_avatar,
                id: player.id,
                total_score: player.total_score,
                highest_score: player.highest_score,
              })
            );
            // Update local state with the response data
            setAvatarsList((prevAvatars) => {
              return prevAvatars?.map((avatar) =>
                avatar.id === selectedAvatar
                  ? { ...avatar, bought: true }
                  : avatar
              );
            });

            setPoints(points - selected.cost);

            // console.log(`Bought Avatar: ${selected.avatarname}`);
          } else {
            setCannotBuy(true);
          }
        } catch (error) {
          console.error("Error buying avatar:", error);
        }
      }
    }
  };

  useEffect(() => {
    // console.log(`Initial Points: ${points} P`);
    getAvatarShop();
    setPoints(player.diamond);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Avatar Shop</Text>
        <Text style={styles.points}>{points} P</Text>
        <View style={styles.avatarGrid}>
          {avatarsList?.map((avatar) => (
            <TouchableOpacity
              key={avatar.id}
              onPress={() => handleAvatarPress(avatar.id)}
              activeOpacity={2}
            >
              <View style={styles.avatarContainer}>
                <View style={styles.boxAvatar}>
                  <Image
                    source={{ uri: avatar.image }}
                    style={[
                      styles.avatarImage,
                      selectedAvatar !== avatar.id && styles.fadedAvatar,
                    ]}
                  />
                  <Text style={styles.avatarInfo}>
                    {avatar.cost === 0
                      ? "OWNED"
                      : avatar.bought
                      ? "OWNED"
                      : `${avatar.cost}`}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Text>{cannotBuy ? "Not enough diamond,Top up more diamond" : ""}</Text>
        <TouchableOpacity
          onPress={() => {
            if (selectedAvatar !== null) {
              const selected = avatarsList?.find(
                (avatar) => avatar.id === selectedAvatar
              );

              if (selected) {
                if (selected.bought) {
                  handleSelect();
                } else if (selected.cost === 0) {
                  handleSelect();
                } else {
                  handleBuy();
                }
              }
            }
          }}
          style={[
            styles.buyButton,
            (selectedAvatar === null ||
              avatarsList?.find((avatar) => avatar.id === selectedAvatar)
                ?.bought) &&
              styles.fadedButton,
          ]}
        >
          <Text style={styles.buyButtonText}>
            {selectedAvatar !== null &&
              ((avatarsList?.find((avatar) => avatar.id === selectedAvatar)
                ?.bought &&
                "Select") ||
              avatarsList?.find((avatar) => avatar.id === selectedAvatar)
                ?.cost === 0
                ? "Select"
                : "Buy")}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    opacity: 2,
  },
  points: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Shop;

// const handleBuy = () => {
//   if (selectedAvatar !== null) {
//     const selected = avatarsList[selectedAvatar];
//     if (!selected.bought && points >= selected.avatarprice) {
//       setPoints(points - selected.avatarprice);

//       const updatedAvatars = [...avatarsList];
//       updatedAvatars[selectedAvatar] = {
//         ...selected,
//         bought: true,
//         avatarname: `${selected.avatarname} SOLD OUT`,
//       };
//       setAvatarsList(updatedAvatars);
//       console.log(`Bought Avatar: ${selected.avatarname}`);
//     }
//   }
// };
