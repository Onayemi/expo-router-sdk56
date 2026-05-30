import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-1 px-5"
      style={{
        // Dynamically apply exact status bar padding height across iOS & Android
        paddingTop: insets.top,
      }}
    >
      <StatusBar style="dark" />
      <Text>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
