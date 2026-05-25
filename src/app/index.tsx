import { Redirect } from "expo-router";
import { StyleSheet } from "react-native";

export default function Index() {
  return (
    // <View style={styles.container}>
    //   <Text>Edit src/app/index.tsx to edit this screen.</Text>
    // </View>
    <Redirect href="/splash" />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
