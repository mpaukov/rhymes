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
import { instanceAxios, config } from "../../utils/instanceAxios";
import LoadingScreen from "../LoadingScreen";
import Player from "../../components/Player";

const response = async () => {
  return await instanceAxios({
    ...config,
    data: {
      ...config.data,
      collection: "audio",
      filter: { category: "slowdown" },
    },
  }).then((res) => res.data.documents);
};

export default function SlowdownScreen() {
  const [data, setData] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await response().then((data) => {
        setData(data);
      });
      setIsLoading(false);
    })();
  }, []);

  async function chooseSound(id) {
    const index = data.findIndex((item) => item._id === id);
    setPlaylist((prev) => {
      if (playlist.includes(data[index].source)) return prev;
      else return [...prev, data[index].source];
    });
  }

  const Item = ({ title, id }) => (
    <View style={styles.item}>
      <Button
        title={title}
        onPress={() => {
          chooseSound(id);
        }}
      />
    </View>
  );

  if (!isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.mainTitle}>Мелодии</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => <Item title={item.title} id={item._id} />}
          keyExtractor={(_, idx) => idx}
        />
        <Player playlist={playlist} clear={setPlaylist} />
      </SafeAreaView>
    );
  } else return <LoadingScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 10,
  },
  item: {
    marginVertical: 5,
    marginHorizontal: 16,
  },
  mainTitle: {
    color: "#000000",
    fontSize: 32,
    textAlign: "center",
  },
});
