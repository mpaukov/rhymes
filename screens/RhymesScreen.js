import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, FlatList, View, Text } from "react-native";
import { instanceAxios, config } from "../utils/instanceAxios";

const response = async () => {
  return await instanceAxios({
    ...config,
    data: {
      ...config.data,
      collection: "rhymes",
      filter: { author: "Агния Барто" },
    },
  }).then((res) => res.data.documents);
};

export default function RhymesScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () =>
      await response().then((data) =>
        setData(data.sort((a, b) => a.text.length - b.text.length))
      ))();
  }, []);

  const Item = ({ title, text }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Стихи</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item title={item.title} text={item.text} />}
        keyExtractor={(_, idx) => idx}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 30,
  },
  item: {
    backgroundColor: "#6495ed",
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
