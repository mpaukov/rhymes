import { StyleSheet, View, Text } from "react-native";

export default function RhymesScreen() {
  return (
    <View style={styles.loading}>
      <Text style={styles.mainTitle}>Загрузка...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainTitle: {
    color: "#000000",
    fontSize: 32,
    textAlign: "center",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
