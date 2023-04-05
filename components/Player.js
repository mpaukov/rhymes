import { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Audio } from "expo-av";

export default function Player({ playlist }) {
  const [sound, setSound] = useState();
  const [isPaused, setIsPaused] = useState(false);
  const [position, setPosition] = useState(0);
  const [index, setIndex] = useState(0);

  const onPress = () => console.log("playlist", playlist);

  async function playSound() {
    if (playlist.length == 0) return;
    if (!isPaused && !sound) {
      console.log("new sound");
      const { sound } = await Audio.Sound.createAsync({
        uri: playlist[index],
      });
      setSound(sound);
      await sound.playAsync();
    } else {
      await sound.playFromPositionAsync(position);
      setIsPaused(false);
    }
  }

  async function pauseSound() {
    if (playlist.length == 0) return;
    if (sound) {
      setPosition(await sound.getStatusAsync().positionMillis);
      await sound.pauseAsync();
      setIsPaused(true);
    } else setIsPaused(false);
  }

  async function toNext() {
    if (playlist.length == 0) return;
    if (index < playlist.length - 1) setIndex((ind) => ind + 1);
    else setIndex(0);
    console.log("index", index);
    console.log("playlist", playlist);
    console.log("playlist", playlist[index]);
    setIsPaused(false);
    if (sound) sound.unloadAsync();
    setSound(undefined);
    playSound();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Entypo name="controller-stop" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Entypo name="controller-jump-to-start" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={toNext}>
        <Entypo name="controller-next" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={pauseSound}>
        <Entypo name="controller-paus" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={playSound}>
        <Entypo name="controller-play" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 60,
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },
});
