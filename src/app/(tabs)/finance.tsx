import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Finance() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-white px-5">
      <View style={{ paddingTop: insets.top }}>
        <Text>Finance</Text>
      </View>
    </View>
  );
}
