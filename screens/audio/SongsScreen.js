import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";

export default function SongsScreen({ data }) {
  const [filter, setFilter] = useState("exercises");
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    setPlaylist(() => data.filter(({ category }) => category === filter));
  }, [data, filter]);

  const Item = ({ title, id }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{title}</Text>
    </View>
  );

  const List = () =>
    playlist.map((item) => (
      <Item
        style={styles.items}
        title={item.title}
        id={item._id}
        key={item._id}
      />
    ));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Песенки</Text>
      <View style={styles.mainWrapper}>
        <List />
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setFilter("slowdown");
            }}
          >
            <MaterialCommunityIcons
              name="speedometer-slow"
              size={24}
              color={filter === "slowdown" ? "#007aff" : "#000000"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setFilter("exercises");
            }}
          >
            <MaterialCommunityIcons
              name="speedometer"
              size={24}
              color={filter === "exercises" ? "#007aff" : "#000000"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 10,
  },
  mainTitle: {
    color: "#000000",
    fontSize: 32,
    textAlign: "center",
  },
  mainWrapper: {
    flexDirection: "column",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 10,
  },
  buttonWrapper: {
    position: "absolute",
    right: 10,
    top: 250,
  },
  items: {
    paddingHorizontal: 20,
  },
  item: {
    marginVertical: 5,
    marginHorizontal: 16,
    backgroundColor: "#007aff",
    borderRadius: 20,
  },
  itemText: {
    color: "#fffafa",
    fontSize: 16,
    fontWeight: 700,
    padding: 16,
  },
});
