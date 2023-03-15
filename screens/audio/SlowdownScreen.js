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
import { instanceAxios, config } from "../../utils/instanceAxios";

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
  const [sound, setSound] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () =>
      await response().then((data) => {
        setData(data);
      }))();

    return () => {
      if (sound)
        () => {
          sound.unloadAsync();
        };
    };
  }, []);

  async function playSound(url) {
    setIsLoading(true);
    const { sound } = await Audio.Sound.createAsync({
      uri: url,
    });
    setSound(sound);
    await sound.playAsync();
    setIsLoading(false);
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

  if (!isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.mainTitle}>Для замедления</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Item title={item.title} source={item.source} />
          )}
          keyExtractor={(_, idx) => idx}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <View style={styles.loading}>
        <Text style={styles.mainTitle}>Загрузка мелодии</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 20,
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
  loading: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
