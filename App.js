import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import NurseryRhymesScreen from "./screens/NurseryRhymesScreen";
import RhymesScreen from "./screens/RhymesScreen";
import AudioScreen from "./screens/AudioScreen";
import NurseryRhymesExercisesScreen from "./screens/NurseryRhymesExercisesScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ tabBarShowLabel: false, headerShown: false }}
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
