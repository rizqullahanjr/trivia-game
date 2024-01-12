import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import diamondsData from "../mocks/topup.json";

const diamonds = diamondsData.map((diamond) => {
  const formattedImg = diamond.diamondimg.replace(/\s/g, ""); // Remove spaces
  return {
    ...diamond,
    diamondimg: require(`../../src/image/diamonds/${formattedImg}`),
    selected: false, // Initialize selected property for each diamond
  };
});

const Topup: React.FC = () => {
  const [diamondsList, setDiamondsList] = useState(diamonds);

  const handleDiamondPress = (index: number) => {
    const updatedDiamonds = diamondsList.map((diamond, i) => ({
      ...diamond,
      selected: i === index,
    }));
    setDiamondsList(updatedDiamonds);
  };

  const handleBuy = () => {
    const selectedDiamond = diamondsList.find((diamond) => diamond.selected);

    if (selectedDiamond) {
      const updatedDiamonds = diamondsList.map((diamond) => ({
        ...diamond,
        selected: false,
      }));
      setDiamondsList(updatedDiamonds);
      console.log(`Bought diamond: ${selectedDiamond.diamondname}`);
    }
  };

  return (
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
                  source={diamond.diamondimg}
                  style={[
                    styles.diamondImage,
                    diamond.selected && styles.selectedDiamond,
                  ]}
                />
                <Text style={styles.diamondInfo}>
                  {diamond.diamondname} {`${diamond.diamondprice} IDR`}
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
