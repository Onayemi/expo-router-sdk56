import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Analytics() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Transform standard slug parameters to readable titles
  const formattedTitle =
    typeof id === "string"
      ? id.charAt(0).toUpperCase() + id.slice(1).replace("-", " ")
      : "Detail View";

  return (
    <ScrollView
      style={{ paddingTop: insets.top }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row items-center mb-4 px-4">
        <TouchableOpacity
          onPress={() => router.replace("/finance")}
          className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl items-center justify-center"
        >
          <ArrowLeft size={18} color="#002244" />
        </TouchableOpacity>
        <Text className="text-lg font-black text-[#002244] ml-4">
          Back to Analytics
        </Text>
      </View>

      {/* Dynamic Inner Body Content */}
      <View className="flex-1 items-center justify-center p-6">
        <Text className="text-xl font-semibold text-gray-700 mb-2">
          Welcome to the screen for:
        </Text>
        <View className="bg-indigo-50 px-4 py-2 rounded-xl">
          <Text className="text-indigo-600 font-mono font-bold text-lg">
            Analytics ID:/menu/{id}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
