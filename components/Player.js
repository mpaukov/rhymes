import { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Audio } from "expo-av";
import { useKeepAwake } from "expo-keep-awake";

export default function Player({ playlist, clear }) {
  const [sound, setSound] = useState();
  const [isPaused, setIsPaused] = useState(false);
  const [position, setPosition] = useState(0);
  const [index, setIndex] = useState(0);

  useKeepAwake();

  let intervalId;
  async function playSound() {
    if (playlist.length == 0) return;
    if (!isPaused && !sound) {
      const { sound } = await Audio.Sound.createAsync({
        uri: playlist[index].source,
      });
      setSound(sound);
      await sound.playAsync();
      intervalId = setInterval(() => {
        (async () => {
          const status = await sound.getStatusAsync();
          if (status.positionMillis >= status.playableDurationMillis) {
            await toNext();
          }
        })();
      }, 1000);
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
    clearInterval(intervalId);
  }

  async function toNext() {
    if (playlist.length == 0) return;
    setIsPaused(false);
    if (index < playlist.length - 1) setIndex((ind) => ind + 1);
    else setIndex(0);
    if (sound) {
      await sound.unloadAsync();
    }
    setSound(undefined);
  }

  async function toPrev() {
    if (playlist.length == 0) return;
    setIsPaused(false);
    if (index > 0) setIndex((ind) => ind - 1);
    else setIndex(playlist.length - 1);
    if (sound) {
      await sound.unloadAsync();
    }
    setSound(undefined);
  }

  async function clearPlaylist() {
    if (playlist.length == 0) return;
    if (sound) {
      await sound.unloadAsync();
    }
    clear([]);
    setSound(undefined);
  }

  useEffect(() => {
    if (!sound) playSound();
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Предыдущая:
          {playlist.length >= 0 && index - 1 >= 0
            ? playlist[index - 1]?.title
            : playlist[playlist.length - 1]?.title}
        </Text>
        <Text style={styles.text}>
          Играет: {playlist.length >= 0 && playlist[index]?.title}
        </Text>
        <Text style={styles.text}>
          Следующая:
          {playlist.length >= 0 && index + 1 <= playlist.length - 1
            ? playlist[index + 1]?.title
            : playlist[0]?.title}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={clearPlaylist}>
          <Entypo name="controller-stop" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toPrev}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingHorizontal: 15,
    marginBottom: 1,
  },
  text: {
    marginBottom: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    justifyContent: "center",
    width: 60,
    height: 40,
  },
});
