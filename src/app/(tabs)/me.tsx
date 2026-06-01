import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Me() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  return (
    <View
      className="flex-1 px-5"
      style={{
        // Dynamically apply exact status bar padding height across iOS & Android
        paddingTop: insets.top,
      }}
    >
      <View className="mt-8 p-6 bg-slate-50 border border-slate-100 rounded-3xl">
        <Text className="text-2xl text-gray-700 text-center mb-8 font-bold">
          Welcome, {user?.name}!
        </Text>

        <Text className="text-xs text-sky-600 font-bold uppercase tracking-widest">
          Active Verified Parameter
        </Text>
        <Text className="text-3xl font-black text-[#002244] mt-1">
          Product ID: #12345
        </Text>

        <Text className="text-slate-500 text-sm mt-4 leading-relaxed">
          This layout represents your dynamic workspace route view layer. You
          can pass this ID string variable directly into an API query like{" "}
          <Text className="font-mono text-xs bg-slate-200 p-0.5">
            api.get(`/products/12345`)
          </Text>{" "}
          to load deep database entries straight from your server repository.
        </Text>
      </View>

      {/* Logout */}
      <View className="mt-5 p-4 bg-gray-100 rounded-lg">
        <View className="w-full">
          <Button title="Logout" onPress={logout} color="#ef4444" />
        </View>
      </View>
    </View>
  );
}
