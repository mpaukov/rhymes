import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import NurseryRhymesScreen from "./screens/NurseryRhymesScreen";
import RhymesScreen from "./screens/RhymesScreen";
import NurseryRhymesExercisesScreen from "./screens/NurseryRhymesExercisesScreen";
import AudioScreen from "./screens/audio/AudioScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ tabBarShowLabel: false, headerShown: false }}
        initialRouteName={"Audio"}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Entypo name="open-book" size={size} color={color} />
            ),
          }}
          name="Nursery"
          component={NurseryRhymesScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialIcons
                name="sports-basketball"
                size={size}
                color={color}
              />
            ),
          }}
          name="Exercises"
          component={NurseryRhymesExercisesScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Entypo name="book" size={size} color={color} />
            ),
          }}
          name="Rhymes"
          component={RhymesScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialIcons name="audiotrack" size={size} color={color} />
            ),
          }}
          name="Audio"
          component={AudioScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
