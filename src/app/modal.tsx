import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function modal() {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-1 px-5 gap-2"
      style={{
        // Dynamically apply exact status bar padding height across iOS & Android
        paddingTop: insets.top,
      }}
    >
      <Text>modal</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
