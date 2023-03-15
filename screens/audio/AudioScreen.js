import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { Audio } from "expo-av";
import SlowdownScreen from "./SlowdownScreen";
import ExercisesScreen from "./ExercisesScreen";

const AudioTab = createBottomTabNavigator();

(async () => {
  await Audio.setAudioModeAsync({
    shouldDuckAndroid: true,
    staysActiveInBackground: true,
  });
})();

export default function AudioScreen() {
  return (
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
        name="Slowdown"
        component={SlowdownScreen}
      />
      <AudioTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Entypo name="battery" size={size} color={color} />
          ),
        }}
        name="Exercises"
        component={ExercisesScreen}
      />
    </AudioTab.Navigator>
  );
}
