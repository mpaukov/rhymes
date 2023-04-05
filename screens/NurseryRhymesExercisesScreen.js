import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, FlatList, View, Text } from "react-native";
import { instanceAxios, config } from "../utils/instanceAxios";

const response = async () => {
  return await instanceAxios({
    ...config,
    data: {
      ...config.data,
      collection: "exercises",
    },
  }).then((res) => res.data.documents);
};

export default function NurseryRhymesExercisesScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await response().then((data) =>
        setData(data.sort((a, b) => a.text.length - b.text.length))
      );
      setIsLoading(false);
    })();
  }, []);

  const Item = ({ title, text }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
  if (!isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.mainTitle}>Играем и делаем упражнения</Text>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Item title={item.title} text={item.text} />
          )}
          keyExtractor={(_, idx) => idx}
        />
      </SafeAreaView>
    );
  } else
    return (
      <View style={styles.loading}>
        <Text style={styles.mainTitle}>Загрузка...</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 20,
  },
  item: {
    backgroundColor: "#f0f8ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  mainTitle: {
    color: "#000000",
    fontSize: 32,
    textAlign: "center",
  },
  title: {
    color: "#000000",
    fontSize: 32,
  },
  text: {
    color: "#000000",
    fontSize: 24,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
