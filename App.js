import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

//Q0MvyX1PMWVSzIpnF2ijiOszTcQgtUx8tHjHAiCk05RuYCiluzEy9450I1bO1exV

axios.defaults.headers.common["api-key"] =
  "Q0MvyX1PMWVSzIpnF2ijiOszTcQgtUx8tHjHAiCk05RuYCiluzEy9450I1bO1exV";

export default function App() {
  const response = async () => {
    return await axios({
      method: "post",
      url: "https://eu-central-1.aws.data.mongodb-api.com/app/data-bmyij/endpoint/data/v1/action/findOne",
      data: {
        collection: "rhymes",
        database: "books",
        dataSource: "Cluster0",
      },
    }).then((res) => res.data.document.text);
  };

  return (
    <View style={styles.container}>
      <Text>test</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
