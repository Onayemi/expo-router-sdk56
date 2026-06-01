import { useAuthStore } from "@/store/useAuthStore";
import { Stack, useRouter, useSegments } from "expo-router"; // Slot
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

// 1. Prevent the splash screen from auto-hiding automatically at boot
SplashScreen.preventAutoHideAsync().catch(() => {
  /* Fail silently if called repeatedly during hot reloads */
});

export default function RootLayout() {
  const segments = useSegments();
  const { isAuthenticated, isHydrated, hydrateAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    hydrateAuth();
  }, []);

  useEffect(() => {
    // Exit early if the SecureStore check is still running in the background
    if (!isHydrated) return;

    // 2. Hide Splash Screen cleanly now that credentials state is fully loaded
    SplashScreen.hideAsync().catch(() => {});

    // Checks if the user is currently inside a route group named "(protected)"
    const inProtectedGroup = segments[0] === "(tabs)";

    if (isAuthenticated && !inProtectedGroup) {
      // User is authenticated but on an onboarding/auth screen -> Redirect to Dashboard
      router.replace("/(tabs)");
    } else if (!isAuthenticated && inProtectedGroup) {
      // User is unauthenticated but trying to access protected screens -> Redirect to Login
      router.replace("/login");
    }
  }, [isHydrated, isAuthenticated, segments]);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      {/* <Slot /> */}
    </SafeAreaProvider>
  );
}
