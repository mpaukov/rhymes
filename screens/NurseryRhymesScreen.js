import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, FlatList, View, Text } from "react-native";
import axios from "axios";
import { API_KEY, DB_URL } from "@env";

axios.defaults.headers.common["api-key"] = API_KEY;

const response = async () => {
  return await axios({
    method: "post",
    url: `${DB_URL}/action/find`,

    data: {
      collection: "nursery",
      database: "books",
      dataSource: "Cluster0",
    },
  }).then((res) => res.data.documents);
};

export default function NurseryRhymesScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () =>
      await response().then((data) =>
        setData(data.sort((a, b) => a.text.length - b.text.length))
      ))();
  }, []);

  const Item = ({ title, text }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Просыпаемся</Text>
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
    marginTop: StatusBar.currentHeight || 0,
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
