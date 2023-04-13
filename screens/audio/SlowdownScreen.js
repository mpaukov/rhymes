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

export default function SlowdownScreen({ data, playlist, setPlaylist }) {
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainTitle}>Мелодии</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item title={item.title} id={item._id} />}
        keyExtractor={(_, idx) => idx}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
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
