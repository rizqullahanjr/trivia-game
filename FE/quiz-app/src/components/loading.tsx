import { HStack, Heading, Spinner } from "native-base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const loading = () => {
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <HStack space={6}>
          <Spinner
            size="lg"
            color="indigo.900"
            accessibilityLabel="Loading posts"
          />
          <Heading color="indigo.900" fontSize="xl">
            Please wait...
          </Heading>
        </HStack>
      </View>
    </View>
  );
};

export default loading;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 3,
    shadowRadius: 10,
    elevation: 10,
  },
});
