import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Me() {
  const insets = useSafeAreaInsets();
  return (
    <View
      className="flex-1 px-5"
      style={{
        // Dynamically apply exact status bar padding height across iOS & Android
        paddingTop: insets.top,
      }}
    >
      <Text>me</Text>
    </View>
  );
}
