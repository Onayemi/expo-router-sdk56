import WelcomeLottie from "@/assets/lottie/Weather.json";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
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
