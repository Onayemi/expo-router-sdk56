import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Dynamic() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // 📥 GRAB PARAMETERS: This automatically pulls the "id" value from the route url link
  const { id } = useLocalSearchParams<{ id: string }>(); // Access dynamic route params if needed
  return (
    <View style={{ paddingTop: insets.top }} className="flex-1 bg-white px-6">
      {/* BACK BUTTON CUSTOM ACTION NAVBAR */}
      <View className="flex-row items-center mt-4">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl items-center justify-center"
        >
          <ArrowLeft size={18} color="#002244" />
        </TouchableOpacity>
        <Text className="text-lg font-black text-[#002244] ml-4">
          Node Inspection Matrix
        </Text>
      </View>

      {/* RENDER DYNAMIC CARD DETAILS */}
      <View className="mt-8 p-6 bg-slate-50 border border-slate-100 rounded-3xl">
        <Text className="text-xs text-sky-600 font-bold uppercase tracking-widest">
          Active Verified Parameter
        </Text>
        <Text className="text-3xl font-black text-[#002244] mt-1">
          Product ID: #{id}
        </Text>

        <Text className="text-slate-500 text-sm mt-4 leading-relaxed">
          This layout represents your dynamic workspace route view layer. You
          can pass this ID string variable directly into an API query like{" "}
          <Text className="font-mono text-xs bg-slate-200 p-0.5">
            api.get(`/products/${id}`)
          </Text>{" "}
          to load deep database entries straight from your server repository.
        </Text>
      </View>
    </View>
  );
}
