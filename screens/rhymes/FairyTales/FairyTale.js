import { StyleSheet, SafeAreaView, Text, ScrollView } from "react-native";

export default function FairyTale(props) {
  const { title, text } = props.route.params;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.item}>
        <Text style={styles.mainTitle}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#f0f8ff",
    padding: 20,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  mainTitle: {
    color: "#000000",
    fontSize: 24,
    textAlign: "center",
  },
  title: {
    color: "#000000",
    fontSize: 32,
  },
  text: {
    color: "#000000",
    fontSize: 24,
    padding: 20,
  },
});
