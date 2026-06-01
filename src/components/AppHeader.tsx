import { useAuthStore } from "@/store/useAuthStore";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CustomTabHeaderProps {
  options: Record<string, any>;
  route: {
    name: string;
    key: string;
  };
}

export default function AppHeader({ options, route }: CustomTabHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuthStore();

  const currentTabTitle = options.title || route.name;
  const isHomeScreen = route.name === "index";

  return (
    <View
      className="flex-row items-center px-4 pb-3 bg-white border-b border-slate-100"
      style={{ paddingTop: insets.top + 8 }}
    >
      {/* LEFT SIDE: Identity Image Anchor */}
      <TouchableOpacity
        onPress={() => router.push("/profile")}
        activeOpacity={0.7}
        className="flex-row items-center"
      >
        <View className="relative">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
            }}
            className="w-10 h-10 rounded-full border-2 border-[#00B875]"
          />
          {isHomeScreen && (
            <View className="absolute -bottom-1 -right-1 bg-[#EAB308] px-1 rounded-full items-center justify-center border border-white">
              <Text className="text-[8px] text-white font-bold">Lvl 3</Text>
            </View>
          )}
        </View>

        {/* Home Specific Title Layout (Inline Left-Aligned) */}
        {isHomeScreen && (
          <View className="ml-3">
            <Text className="text-[11px] text-slate-400 font-medium">
              Welcome back,
            </Text>
            <Text className="text-sm font-bold text-slate-800">
              {user?.name}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* MIDDLE CENTERED TITLE: Conditional layout engine */}
      {!isHomeScreen ? (
        <View className="flex-1 justify-center items-center px-2">
          <Text
            className="text-base font-black text-slate-800 tracking-tight text-center"
            numberOfLines={1}
          >
            {currentTabTitle}
          </Text>
        </View>
      ) : (
        // Flex spacer pushing right-side controls to the edge when on Home Screen
        <View className="flex-1" />
      )}

      {/* RIGHT SIDE: Action Utilities Panel */}
      <View className="flex-row items-center space-x-3">
        <TouchableOpacity
          onPress={() => router.push("/modal")}
          className="w-9 h-9 bg-slate-50 rounded-full items-center justify-center"
        >
          <MaterialCommunityIcons name="headset" size={18} color="#334155" />
        </TouchableOpacity>

        <TouchableOpacity className="w-9 h-9 bg-slate-50 rounded-full items-center justify-center">
          <Ionicons name="scan-outline" size={18} color="#334155" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/modal")}
          className="w-9 h-9 bg-slate-50 rounded-full items-center justify-center relative"
        >
          <Ionicons name="notifications-outline" size={18} color="#334155" />
          <View className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </TouchableOpacity>
      </View>

      {/* Visual layout counterweight to keep text perfectly centered on alternative tabs */}
      {!isHomeScreen && (
        <View
          className="w-10"
          style={{ marginLeft: -40, opacity: 0 }}
          pointerEvents="none"
        />
      )}
    </View>
  );
}
