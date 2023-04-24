import { useState, useEffect, useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { View, StyleSheet } from "react-native";
import Player from "../../components/Player";
import { instanceAxios, config } from "../../utils/instanceAxios";
import LoadingScreen from "../LoadingScreen";
import MelodiesScreen from "./MelodiesScreen";
import SongsScreen from "./SongsScreen";

const AudioTab = createBottomTabNavigator();
let songs = [];

const response = async () => {
  return await instanceAxios({
    ...config,
    data: {
      ...config.data,
      collection: "audio_v1",
    },
  }).then((res) => res.data.documents);
};

(async () => {
  await Audio.setAudioModeAsync({
    shouldDuckAndroid: true,
    staysActiveInBackground: true,
  });
})();

export default function AudioScreen() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [playlistPlayer, setPlaylistPlayer] = useState([]);
  const [playlistMelodies, setPlaylistMelodies] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);

  const refreshPlaylist = (songs) => {
    setPlaylistPlayer(data.filter((item) => songs.includes(item._id)));
  };

  const clearPlaylist = () => {
    refreshPlaylist([]);
    songs = new Array();
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await response().then((data) => {
        setData(data);
        const slowdown = data.filter(
          ({ subCategory }) => subCategory === "minus"
        );
        setPlaylistMelodies(slowdown);
        const exercises = data.filter(
          ({ subCategory }) => subCategory === "full"
        );
        setPlaylistSongs(exercises);
      });
      setIsLoading(false);
    })();
  }, []);

  const Songs = useCallback(
    (props) => {
      return (
        <SongsScreen
          data={playlistSongs}
          refresh={refreshPlaylist}
          songs={songs}
          {...props}
        />
      );
    },
    [playlistSongs, songs]
  );
  const Melodies = useCallback(
    (props) => {
      return (
        <MelodiesScreen
          data={playlistMelodies}
          refresh={refreshPlaylist}
          songs={songs}
          {...props}
        />
      );
    },
    [playlistMelodies, songs]
  );

  if (!isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Player playlist={playlistPlayer} clear={clearPlaylist} />
        </View>
        <View style={styles.navigator}>
          <AudioTab.Navigator
            screenOptions={{ tabBarShowLabel: false, headerShown: false }}
          >
            <AudioTab.Screen
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name="speedometer-slow"
                    size={size}
                    color={color}
                  />
                ),
              }}
              name="Melodies"
              component={Melodies}
            />
            <AudioTab.Screen
              options={{
                tabBarIcon: ({ focused, color, size }) => (
                  <Entypo name="battery" size={size} color={color} />
                ),
              }}
              name="Songs"
              component={Songs}
            />
          </AudioTab.Navigator>
        </View>
      </View>
    );
  } else return <LoadingScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  wrapper: {
    position: "absolute",
    bottom: 60,
    zIndex: 1,
    width: "100%",
  },
  navigator: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  mainTitle: {
    color: "#000000",
    fontSize: 32,
    textAlign: "center",
  },
});
