import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import diamondsData from "../mocks/topup.json";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "../stores/types/store";
import { useSelector } from "react-redux";
import * as WebBrowser from "expo-web-browser";

const diamonds = diamondsData.map((diamond) => {
  return {
    ...diamond,
    diamondimg: diamond.diamondimg,
    selected: false, // Initialize selected property for each diamond
  };
});

const Topup: React.FC = () => {
  const [diamondsList, setDiamondsList] = useState(diamonds);
  const player = useSelector((state: RootState) => state.player);
  console.log(diamondsList);

  const handleDiamondPress = (index: number) => {
    const updatedDiamonds = diamondsList.map((diamond, i) => ({
      ...diamond,
      selected: i === index,
    }));
    setDiamondsList(updatedDiamonds);
  };

  const handleBuy = async () => {
    const token = await AsyncStorage.getItem("token");
    const selectedDiamond = diamondsList.find((diamond) => diamond.selected);

    if (selectedDiamond) {
      const updatedDiamonds = diamondsList.map((diamond) => ({
        ...diamond,
        selected: false,
      }));
      setDiamondsList(updatedDiamonds);
      console.log(`Bought diamond: ${selectedDiamond.diamondname}`);

      const res = await axios.post(
        "https://kz4nkvqd-5000.asse.devtunnels.ms/api/v1/topup",
        {
          total_diamond: selectedDiamond.diamondname,
          id_user: player.id,
          price: selectedDiamond.diamondprice,
        }
      );
      WebBrowser.openBrowserAsync(res.data.message.snap_url);
      console.log("res.data", res.data);
      console.log("res.data.snap", res.data.message.snap_url);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Diamond topup</Text>
        <View style={styles.diamondGrid}>
          {diamondsList.map((diamond, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleDiamondPress(index)}
              activeOpacity={0.8}
            >
              <View style={styles.diamondContainer}>
                <View style={styles.boxdiamond}>
                  <Image
                    source={{ uri: diamond.diamondimg }}
                    style={[
                      styles.diamondImage,
                      diamond.selected && styles.selectedDiamond,
                    ]}
                  />
                  <Text style={styles.diamondInfo}>
                    {diamond.diamondname} Diamonds{"\n"}
                    {`${diamond.diamondprice} IDR`}
                  </Text>
                  {diamond.selected && <View style={styles.radioSelected} />}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={handleBuy}
          style={styles.buyButton}
          disabled={!diamondsList.some((diamond) => diamond.selected)}
        >
          <Text style={styles.buyButtonText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    overflow: "scroll",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  diamondGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  diamondContainer: {
    alignItems: "center",
    margin: 5,
  },
  boxdiamond: {
    position: "relative",
    width: 120,
    height: 120,
    borderRadius: 15,
    overflow: "hidden",
    borderColor: "black",
    borderWidth: 1,
  },
  diamondImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  selectedDiamond: {
    opacity: 0.5,
  },
  diamondInfo: {
    textAlign: "center",
    marginTop: 5,
  },
  radioSelected: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "blue",
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
});

export default Topup;
