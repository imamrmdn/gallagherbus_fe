/**
 * 2023
 * Gallagher Bus App
 * Universitas Persada Indonesia Y.A.I
 * NIM: 1644190068
 * NAMA: Adam Muhammad Galib
 */

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ color: "red" }}>testing app gallagher bus for thesis</Text>
      <Text style={{ color: "red" }}>testing app gallagher bus for thesis</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
