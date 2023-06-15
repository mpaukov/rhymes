import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView, StyleSheet } from "react-native";
import NurseryRhymesExercisesScreen from "./NurseryRhymesExercisesScreen";
import NurseryRhymesScreen from "./NurseryRhymesScreen";

const ScreenTab = createBottomTabNavigator();

export default function MainNurseryRhymesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScreenTab.Navigator
        screenOptions={{ tabBarShowLabel: false, headerShown: false }}
      >
        <ScreenTab.Screen
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Entypo name="open-book" size={size} color={color} />
            ),
          }}
          name="NurseryRhymes"
          component={NurseryRhymesScreen}
        />
        <ScreenTab.Screen
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
      </ScreenTab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
