import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, FlatList, View, Text } from "react-native";
import { instanceAxios, config } from "../../../utils/instanceAxios";
import LoadingScreen from "../../LoadingScreen";

const response = async () => {
  return await instanceAxios({
    ...config,
    data: {
      ...config.data,
      collection: "fairytales",
    },
  }).then((res) => res.data.documents);
};

export default function MainFairyTales({ navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await response().then((data) =>
        setData(data.sort((a, b) => a.title - b.title))
      );
      setIsLoading(false);
    })();
  }, []);

  const Item = ({ title, text }) => (
    <View style={styles.item}>
      <Text
        style={styles.itemText}
        onPress={() =>
          navigation.navigate("FairyTale", { title: title, text: text })
        }
      >
        {title}
      </Text>
    </View>
  );

  if (!isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Item title={item.title} text={item.text} />
          )}
          keyExtractor={(_, idx) => idx}
        />
      </SafeAreaView>
    );
  } else return <LoadingScreen />;
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
