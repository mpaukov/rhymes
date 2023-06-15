import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import MainRhymesScreen from "./screens/rhymes/Rhymes/MainRhymesScreen";
import AudioScreen from "./screens/audio/AudioScreen";
import MainNurseryRhymesScreen from "./screens/rhymes/Nursery/MainNurseryRhymesScreen";
import MainFairyTales from "./screens/rhymes/FairyTales/MainFairyTales";
import FairyTale from "./screens/rhymes/FairyTales/FairyTale.js";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Nursery"
          component={MainNurseryRhymesScreen}
          options={{
            title: "Потешки",
          }}
        />
        <Stack.Screen
          name="Rhymes"
          component={MainRhymesScreen}
          options={{
            title: "Стихи",
          }}
        />
        <Stack.Screen
          name="Audio"
          component={AudioScreen}
          options={{
            title: "Музыка",
          }}
        />
        <Stack.Screen
          name="FairyTales"
          component={MainFairyTales}
          options={{
            title: "Сказки",
          }}
        />
        <Stack.Screen
          name="FairyTale"
          options={{
            title: "Сказки",
          }}
        >
          {(props) => <FairyTale {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
