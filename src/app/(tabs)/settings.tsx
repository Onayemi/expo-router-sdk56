import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Settings() {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-1 px-5"
      style={{
        paddingTop: insets.top,
      }}
    >
      <Text>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
