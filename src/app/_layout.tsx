import { useAuthStore } from "@/store/useAuthStore";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  const { isAuthenticated, isHydrated, hydrateAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    hydrateAuth();
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      router.replace("/login");
    } else {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, isHydrated]);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaProvider>
  );
}
