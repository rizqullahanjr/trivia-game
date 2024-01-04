import { Image, View, ImageStyle, StyleSheet, Text } from "react-native";
// import { spalshImg } from "../image/spalsh.jpg";

const Splash = () => {
  return (
    <>
      <View style={styles.container}>
        <Text> splash</Text>
      </View>
    </>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
  },
  Image: {
    height: 100,
    width: 100,
  },
});

// const styles2 = StyleSheet.create({
//   image: {
//     height:
//   },
// });
