import { useAuthStore } from "@/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomHeader from "./CustomHeader";

interface WrapperProps {
  screenName: string;
  children: React.ReactNode;
}

export default function TabDrawerWrapper({
  screenName,
  children,
}: WrapperProps) {
  const logout = useAuthStore((state) => state.logout);

  return (
    <Drawer
      screenOptions={{
        header: () => <CustomHeader title={screenName} />, // Attaches Left Menu & Right History globally
        drawerActiveTintColor: "#002244",
      }}
    >
      {/* 1. Main View Context Frame */}
      <Drawer.Screen
        name="main"
        options={{
          drawerLabel: "Dashboard Workspace",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="desktop-outline" size={size} color={color} />
          ),
        }}
      >
        {() => children}
      </Drawer.Screen>

      {/* 2. Drawer Navigation Target: Products Management */}
      <Drawer.Screen
        name="products"
        options={{
          drawerLabel: "Our Products",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" size={size} color={color} />
          ),
        }}
      >
        {() => (
          <View className="flex-1 justify-center items-center bg-white">
            <Text>Products CRUD Matrix Flow Shell</Text>
          </View>
        )}
      </Drawer.Screen>

      {/* 3. Drawer Navigation Target: About */}
      <Drawer.Screen
        name="about"
        options={{
          drawerLabel: "About Corporate",
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      >
        {() => (
          <View style={styles.center}>
            <Text>App Release Version 13.0.0 (2026)</Text>
          </View>
        )}
      </Drawer.Screen>

      {/* 4. Action Element: Logout */}
      <Drawer.Screen
        name="logout_process"
        options={{
          drawerLabel: "Logout Account",
          drawerIcon: () => (
            <Ionicons name="log-out-outline" size={22} color="red" />
          ),
        }}
      >
        {() => (
          <View style={styles.center}>
            <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Confirm Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Drawer.Screen>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logoutBtn: { backgroundColor: "red", padding: 15, borderRadius: 8 },
});
