import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface AppHeaderProps {
  title?: string; // Optional: Shows title text instead of "Welcome back" (e.g., for Finance or Cards tab)
  showUserLevel?: boolean; // Toggle level badge visibility
  onSupportPress?: () => void;
  onScanPress?: () => void;
  onAlertPress?: () => void;
}

export default function AppHeader({
  title,
  showUserLevel = true,
  onSupportPress,
  onScanPress,
  onAlertPress,
}: AppHeaderProps) {
  const router = useRouter();

  return (
    <View className="flex-row justify-between items-center px-4 py-3 bg-white border-b border-slate-100">
      {/* LEFT: User Profile / Identity Context Area */}
      <TouchableOpacity
        className="flex-row items-center space-x-2"
        onPress={() => router.push("/profile")}
        activeOpacity={0.7}
      >
        <View className="relative pr-2">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
            }}
            className="w-10 h-10 rounded-full border-2 border-[#00B875]"
          />
          {showUserLevel && (
            <View className="absolute -bottom-1 -right-1 bg-[#EAB308] px-1 rounded-full items-center justify-center border border-white">
              <Text className="text-[8px] text-white font-bold">Lvl 3</Text>
            </View>
          )}
        </View>

        <View>
          {title ? (
            <Text className="text-base font-bold text-slate-800">{title}</Text>
          ) : (
            <>
              <Text className="text-[11px] text-slate-400 font-medium">
                Welcome back,
              </Text>
              <Text className="text-sm font-bold text-slate-800">Samuel</Text>
            </>
          )}
        </View>
      </TouchableOpacity>

      {/* RIGHT: Quick-Action Utility Controls */}
      <View className="flex-row items-center space-x-3">
        <TouchableOpacity
          onPress={onSupportPress || (() => router.push("/modal"))}
          className="w-9 h-9 bg-slate-50 rounded-full items-center justify-center active:bg-slate-100"
        >
          <MaterialCommunityIcons name="headset" size={18} color="#334155" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onScanPress}
          className="w-9 h-9 bg-slate-50 rounded-full items-center justify-center active:bg-slate-100"
        >
          <Ionicons name="scan-outline" size={18} color="#334155" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onAlertPress || (() => router.push("/modal"))}
          className="w-9 h-9 bg-slate-50 rounded-full items-center justify-center relative active:bg-slate-100"
        >
          <Ionicons name="notifications-outline" size={18} color="#334155" />
          <View className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
