import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const CountdownTimer = ({ durationInSeconds }: any) => {
  const [countdown, setCountdown] = useState(durationInSeconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(intervalId);
        // You can add additional logic when the countdown reaches zero
        // For example, navigate to another screen or perform a specific action
      }
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [countdown]);

  const formatTime = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(countdown)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  timerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default CountdownTimer;
