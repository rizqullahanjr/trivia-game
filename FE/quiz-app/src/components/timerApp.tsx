import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const timerApp = ({ second, minute }: any) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // Setiap detik, tambahkan 1 detik ke timer
      setSeconds((prevSeconds) => (prevSeconds + 1) % 60);

      // Jika detik mencapai 60, tambahkan 1 menit dan reset detik ke 0
      if (seconds === 59) {
        setMinutes((prevMinutes) => prevMinutes + 1);
        setSeconds(0);
      }
    }, 1000);

    // Membersihkan timer ketika komponen di-unmount
    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <View>
      <Text>{`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 24,
  },
});

export default timerApp;
