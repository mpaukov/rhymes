import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>
        Добро пожаловать в наше приложение для деток
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: StatusBar.currentHeight || 30,
    marginHorizontal: 40,
  },
  mainTitle: {
    fontSize: 32,
    textAlign: "center",
  },
});
