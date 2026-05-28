import "../global.css"
import { useAuthStore } from "@/store/useAuthStore";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

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
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
