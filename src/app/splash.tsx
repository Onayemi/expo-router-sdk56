import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Splash() {
  const router = useRouter();
  return (
    <View className="flex-1 px-5 my-10 gap-2">
      <Text className="text-2xl font-bold text-red-600">Splash</Text>
      <Button title="Go to Tabs" onPress={() => router.push("/(tabs)")} />
      <Button title="Go to Login" onPress={() => router.push("/login")} />
    </View>
  );
}

const styles = StyleSheet.create({});
