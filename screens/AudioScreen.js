import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";

export default function AudioScreen() {
  const [sound, setSound] = React.useState();

  async function playSound() {
    return;
    console.log("Loading Sound");
    // const { sound } = await Audio.Sound.createAsync({});
    console.log("sound", sound);
    // setSound(sound);

    console.log("Playing Sound");
    // await sound.playAsync();
  }

  // React.useEffect(() => {
  //   return sound
  //   // ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 20,
  },
  mainTitle: {
    fontSize: 32,
    textAlign: "center",
  },
});
