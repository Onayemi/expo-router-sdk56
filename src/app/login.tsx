import AnimateIn from "@/components/AnimatedIn";
import InputField from "@/components/InputField";
import SocialButton from "@/components/SocialButton";
import { loginSchema } from "@/schemas/authSchema";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const logo = require("@/assets/images/remlex_logo.png");

export default function Login() {
  const login_test = useAuthStore((state) => state.login_test);
  // const login = useAuthStore((state) => state.login);
  // const login = useAuthStore((state) => state.login);
  const router = useRouter();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setErrors({});
    setServerError("");

    const validation = loginSchema.safeParse(form);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0])
          fieldErrors[issue.path[0].toString()] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await login_test(form);
      // await login(form);
    } catch (err: any) {
      if (err.response?.data?.errors) {
        // Handle Laravel Backend Validation Errors Array Structure Map
        const apiErrors: Record<string, string> = {};
        Object.keys(err.response.data.errors).forEach((key) => {
          apiErrors[key] = err.response.data.errors[key][0];
        });
        setErrors(apiErrors);
      } else {
        setServerError(err.response?.data?.message || "Registration failed");
      }
    }
  };

  const handleLoginTest = async () => {
    setErrors({});
    setServerError("");

    // 1. Client-side Zod validation check
    const validation = loginSchema.safeParse(form);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0])
          fieldErrors[issue.path[0].toString()] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    // 2. Perform Mock Request Execution
    setIsLoading(true);
    try {
      await login_test(form);
      router.replace("/(tabs)");
    } catch (err: any) {
      if (err.response?.data?.errors) {
        // Handle Laravel Backend Validation Errors Array Structure Map
        const apiErrors: Record<string, string> = {};
        Object.keys(err.response.data.errors).forEach((key) => {
          apiErrors[key] = err.response.data.errors[key][0];
        });
        setErrors(apiErrors);
      } else {
        setServerError(err.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600",
      }}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1 justify-center px-10 gap-4">
        <Image
          source={logo}
          className="w-64 h-30 self-center"
          resizeMode="contain"
        />
        <InputField
          icon="mail"
          placeholder="Enter your Email"
          // value={email}
          // onChangeText={setEmail}
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
          keyboardType="email-address" //
          inputMode="email"
        />
        {errors.email ? (
          <Text className="text-red-500">{errors.email}</Text>
        ) : null}
        <InputField
          icon="lock-closed"
          placeholder="Enter your Password"
          value={form.password}
          keyboardType="numeric"
          inputMode="numeric"
          onChangeText={(text) => setForm({ ...form, password: text })}
          secureTextEntry
        />
        {errors.password ? (
          <Text className="text-red-500">{errors.password}</Text>
        ) : null}

        <View className="flex flex-row justify-end">
          <TouchableOpacity onPress={() => console.log("Forgot password")}>
            <Text className="text-base font-bold text-accent">
              Forgot Password?
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
          <Text className="text-base font-bold text-accent">Dashboard</Text>
        </TouchableOpacity> */}
        </View>
        {/* Button */}
        <AnimateIn type="right" className="mb-1">
          <Button title="Login" onPress={handleLogin} />
        </AnimateIn>
        <AnimateIn type="right" className="mb-1">
          <Button title="Test Login" onPress={handleLoginTest} />
        </AnimateIn>
        {/* <Button title="Login" onPress={() => console.log("Button pressed")} /> */}

        <TouchableOpacity onPress={() => router.replace("/register")}>
          <Text className="text-base font-bold text-gray-500 items-center mx-auto">
            Don't have an account? Register
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center items-center mt-5">
          <View className="flex-1 h-[1px] bg-gray-300" />
          <Text className="text-base text-gray-700 mx-4">
            Or Continue Login With
          </Text>
          <View className="flex-1 h-[1px] bg-gray-300" />
        </View>

        <SocialButton
          // className="bg-primary"
          title="Google"
          onPress={() => console.log("Google login")}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
