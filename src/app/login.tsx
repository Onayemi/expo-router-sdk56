import InputField from "@/components/InputField";
import SocialButton from "@/components/SocialButton";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const logo = require("@/assets/images/remlex_logo.png");

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // console.log("Login Success");
    router.replace("/(tabs)");
    Alert.alert("Login Success");
  };
  return (
    <View className="flex-1 justify-center px-4 gap-4">
      <Image
        source={logo}
        className="w-64 h-30 self-center"
        resizeMode="contain"
      />
      <InputField
        icon="mail"
        placeholder="Enter your Email"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        icon="lock-closed"
        placeholder="Enter your Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View className="flex flex-row justify-between">
        <TouchableOpacity onPress={() => console.log("Forgot password")}>
          <Text className="text-base font-bold text-accent">
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
          <Text className="text-base font-bold text-accent">Dashboard</Text>
        </TouchableOpacity>
      </View>
      {/* Button */}
      <Button title="Login" onPress={handleSubmit} />
      {/* <Button title="Login" onPress={() => console.log("Button pressed")} /> */}

      <View className="flex-row justify-center items-center">
        <View className="flex-1 h-[1px] bg-gray-300" />
        <Text className="text-base text-gray-700 mx-4">Or Continue With</Text>
        <View className="flex-1 h-[1px] bg-gray-300" />
      </View>

      <SocialButton
        // className="bg-primary"
        title="Google"
        onPress={() => console.log("Google login")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
