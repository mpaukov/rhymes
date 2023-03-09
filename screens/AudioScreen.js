import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Audio } from "expo-av";
import axios from "axios";
import { API_KEY, DB_URL } from "@env";

axios.defaults.headers.common["api-key"] = API_KEY;

const response = async () => {
  return await axios({
    method: "post",
    url: `${DB_URL}/action/find`,

    data: {
      collection: "audio",
      database: "books",
      dataSource: "Cluster0",
    },
  }).then((res) => res.data.documents);
};

export default function AudioScreen() {
  const [data, setData] = useState([]);
  const [sound, setSound] = useState();

  useEffect(() => {
    (async () => await response().then((data) => setData(data)))();
  }, []);

  async function playSound(url) {
    const { sound } = await Audio.Sound.createAsync({
      uri: url,
    });
    setSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const Item = ({ title, source }) => (
    <View style={styles.item}>
      <Button
        title={title}
        onPress={() => {
          playSound(source);
        }}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Плейлист для замедления</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item title={item.title} source={item.source} />
        )}
        keyExtractor={(_, idx) => idx}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 40,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  mainTitle: {
    fontSize: 32,
    textAlign: "center",
  },
  title: {
    fontSize: 32,
  },
  text: {
    fontSize: 24,
  },
});
