import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { instanceAxios, config } from "../../utils/instanceAxios";
import LoadingScreen from "../LoadingScreen";

const response = async () => {
  return await instanceAxios({
    ...config,
    data: {
      ...config.data,
      collection: "rhymes",
    },
  }).then((res) => res.data.documents);
};

export default function MainRhymesScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log("data", data);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await response().then((data) =>
        setData(data.sort((a, b) => a.text.length - b.text.length))
      );
      setIsLoading(false);
    })();
  }, []);

  if (!isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.mainTitle}>Стихи</Text>
      </SafeAreaView>
    );
  } else return <LoadingScreen />;
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
});
