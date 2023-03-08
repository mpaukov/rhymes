import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Main Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  mainTitle: {
    fontSize: 32,
    textAlign: "center",
  },
});
