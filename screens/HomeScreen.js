import { StyleSheet, SafeAreaView, View, Text } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.item}>
        <Text
          style={styles.itemText}
          onPress={() => navigation.navigate("Nursery")}
        >
          Потешки
        </Text>
      </View>
      <View style={styles.item}>
        <Text
          style={styles.itemText}
          onPress={() => navigation.navigate("Rhymes")}
        >
          Стихи
        </Text>
      </View>
      <View style={styles.item}>
        <Text
          style={styles.itemText}
          onPress={() => navigation.navigate("FairyTales")}
        >
          Сказки
        </Text>
      </View>
      <View style={styles.item}>
        <Text
          style={styles.itemText}
          onPress={() => navigation.navigate("Audio")}
        >
          Музыка
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  mainTitle: {
    color: "#000000",
    fontSize: 32,
    textAlign: "center",
  },
  item: {
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#007aff",
  },
  itemText: {
    color: "#fffafa",
    fontSize: 16,
    fontWeight: 700,
    padding: 16,
  },
});
