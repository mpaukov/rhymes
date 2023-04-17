import { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { View, StyleSheet } from "react-native";
import Player from "../../components/Player";
import { instanceAxios, config } from "../../utils/instanceAxios";
import LoadingScreen from "../LoadingScreen";
import SlowdownScreen from "./SlowdownScreen";
import SongsScreen from "./SongsScreen";

const AudioTab = createBottomTabNavigator();

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
  const [playlistSlowdown, setPlaylistSlowdown] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await response().then((data) => {
        setData(data);
        const slowdown = data.filter(
          ({ category, subCategory }) =>
            category === "slowdown" && subCategory === "minus"
        );
        setPlaylistSlowdown(slowdown);
        const exercises = data.filter(
          ({ subCategory }) => subCategory === "full"
        );
        setPlaylistSongs(exercises);
      });
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    console.log("second", songs);

    setPlaylistPlayer(
      data
        .filter((item) => songs.includes(item._id))
        .map(({ source }) => source)
    );
  }, [songs.length]);

  const Songs = (props) => (
    <SongsScreen data={playlistSongs} setSongs={setSongs} {...props} />
  );
  const Slowdown = (props) => (
    <SlowdownScreen
      data={playlistSlowdown}
      playlist={playlistPlayer}
      setPlaylist={setPlaylistPlayer}
      {...props}
    />
  );

  if (!isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Player playlist={playlistPlayer} clear={setPlaylistPlayer} />
        </View>
        <View style={styles.navigator}>
          <AudioTab.Navigator
            screenOptions={{ tabBarShowLabel: false, headerShown: false }}
          >
            {/* <AudioTab.Screen
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <MaterialCommunityIcons
                  name="speedometer-slow"
                  size={size}
                  color={color}
                />
              ),
            }}
            name="Slowdown"
            component={Slowdown}
          /> */}
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
