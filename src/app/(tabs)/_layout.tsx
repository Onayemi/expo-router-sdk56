import AppHeader from "@/components/AppHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs, useSegments } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const WHATSAPP_NUMBER =
  process.env.EXPO_PUBLIC_WHATSAPP_NUMBER || "+2348027819593"; // Fallback to hardcoded number if env variable is missing
export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  // 1. DYNAMIC STEP: Grab current path components as an array
  const segments = useSegments();

  // 2. LOGIC CONDITIONS: Check if the last path segment matches your news route
  const isNewsTabActive = segments[segments.length - 1] === "me";
  const PRIMARY_GREEN = "#00B875";

  return (
    <View className="flex-1 relative">
      <Tabs
        screenOptions={{
          // 🚀 Registers your working AppHeader globally across all tab instances
          header: (props) => <AppHeader {...props} />,
          headerShown: true,

          // Customizing the Bottom Navigation Bar Style
          tabBarActiveTintColor: PRIMARY_GREEN,
          tabBarInactiveTintColor: "#64748B",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarLabel: "Index",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile/index"
          options={{
            title: "Profile",
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="user" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile/[id]"
          options={{
            title: "Profile Details",
            href: null,
          }}
        />
        <Tabs.Screen
          name="(dynamic)/products/[type]"
          options={{
            title: "Product Details",
            href: null,
          }}
        />
        <Tabs.Screen
          name="(dynamic)/analytics/[id]"
          options={{
            title: "Analytics Details",
            href: null,
          }}
        />
        <Tabs.Screen
          name="(dynamic)/checkout"
          options={{
            title: "Checkout Details",
            href: null,
          }}
        />
        <Tabs.Screen
          name="finance"
          options={{
            title: "Finance",
            headerShown: false,
            tabBarLabel: "Finance",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="money" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="gear" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="me"
          options={{
            title: "Info me",
            headerShown: false,
            tabBarLabel: "me",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="comment" size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      {/* THE FLOATING WHATSAPP LAYER (Mounted once globally over all tabs) */}
      {isNewsTabActive && (
        <View
          style={{
            // Bumps the floating button right above the tab bar height boundary safely
            bottom: insets.bottom + 76,
            right: 20,
          }}
          pointerEvents="box-none"
          className="absolute z-50 items-end"
        >
          <WhatsAppButton
            phoneNumber={WHATSAPP_NUMBER}
            message="Hello, I have a question about my recent transaction on CoreApp. Can you assist me with the details?"
            iconSize={24}
            className="w-14 h-14 bg-emerald-100 border border-emerald-200 rounded-full shadow-lg shadow-emerald-900/10 items-center justify-center"
          />
        </View>
      )}
    </View>
  );
}
