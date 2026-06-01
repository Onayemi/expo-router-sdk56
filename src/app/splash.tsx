import WelcomeLottie from "@/assets/lottie/Weather.json";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const logo = require("@/assets/images/remlex_logo.png");

export default function Splash() {
  const router = useRouter();
  // const hydrateAuth = useAuthStore((state) => state.hydrateAuth);

  useEffect(() => {
    const checkSessionAndRedirect = async () => {
      // const [isLoggedIn2] = await Promise.all([
      //   hydrateAuth(),
      //   new Promise((resolve) => setTimeout(resolve, 2000)), // Simulate splash screen delay
      //   // useAuthStore.getState().isAuthenticated,
      // ]);
      const isLoggedIn = useAuthStore();

      if (isLoggedIn) {
        router.replace("/(tabs)");
      } else {
        router.replace("/login");
      }
    };
    // Start the authentication hydration process
    // hydrateAuth();
    checkSessionAndRedirect();
  }, []);
  return (
    <View className="flex-1 px-5 my-10 gap-2">
      <View className="w-full h-64 rounded-full mt-40 bg-gray-200 justify-center items-center mx-auto">
        {/* Logo */}
        <Image source={logo} className="w-64 h-45" resizeMode="contain" />
        {/* Lottie Animation */}
        <LottieView
          source={WelcomeLottie}
          autoPlay
          loop={false}
          speed={1}
          onAnimationFinish={() => {
            router.replace("/login");
          }}
        />
      </View>
      {/* <Text className="text-2xl font-bold text-red-600">Splash</Text> */}
      <Button title="Go to Tabs" onPress={() => router.push("/(tabs)")} />
      <Button title="Go to Login" onPress={() => router.push("/login")} />
      <TouchableOpacity onPress={() => router.push("/modal")}>
        <Text>Open Modal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
