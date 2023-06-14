import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default function MelodiesScreen({ data, refresh, songs }) {
  const [filter, setFilter] = useState("slowdown");
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    setPlaylist(() => data.filter(({ category }) => category === filter));
  }, [data, filter]);

  const chooseSong = (song) => {
    if (!songs.includes(song._id)) {
      songs.push(song._id);
    } else {
      songs = songs.filter((item) => item !== song._id);
    }
    refresh(songs);
  };

  const List = () => {
    return (
      <ScrollView style={styles.items}>
        {playlist.map((item) => {
          const [isAdded, setIsAdded] = useState(false);
          const [changing, setChanging] = useState(false);

          useEffect(() => {
            if (songs.includes(item._id)) {
              setIsAdded(true);
            } else {
              setIsAdded(false);
            }
          }, [playlist, changing]);

          return (
            <View
              key={item._id}
              style={[
                styles.item,
                {
                  backgroundColor: isAdded ? "#8a2be2" : "#007aff",
                },
              ]}
            >
              <Text
                style={styles.itemText}
                onPress={() => {
                  chooseSong(item);
                  setChanging((prev) => !prev);
                }}
              >
                {item.title}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Мелодии</Text>
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
  },
  mainTitle: {
    color: "#000000",
    fontSize: 24,
    textAlign: "center",
  },
  mainWrapper: {
    flexDirection: "column",
    flex: 0.79,
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
    borderRadius: 20,
  },
  itemText: {
    color: "#fffafa",
    fontSize: 16,
    fontWeight: 700,
    padding: 16,
  },
});
