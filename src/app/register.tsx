import AnimateIn from "@/components/AnimatedIn";
import InputField from "@/components/InputField";
import SocialButton from "@/components/SocialButton";
import { registerSchema } from "@/schemas/authSchema";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const logo = require("@/assets/images/remlex_logo.png");

export default function Register() {
  const register = useAuthStore((state) => state.register);
  const router = useRouter();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  const handleRegister = async () => {
    setErrors({});
    setServerError("");

    const validation = registerSchema.safeParse(form);
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
      await register(form);
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
    <View className="flex-1 justify-center px-10 gap-4">
      <Image
        source={logo}
        className="w-64 h-30 self-center"
        resizeMode="contain"
      />
      <InputField
        icon="person"
        placeholder="Enter your Name"
        // value={name}
        // onChangeText={setName}
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
        keyboardType="default" //
        inputMode="text"
      />
      {errors.name ? <Text className="text-red-500">{errors.name}</Text> : null}
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

      <InputField
        icon="lock-closed"
        placeholder="Enter your Password"
        value={form.password_confirmation}
        keyboardType="numeric"
        inputMode="numeric"
        onChangeText={(text) =>
          setForm({ ...form, password_confirmation: text })
        }
        secureTextEntry
      />
      {errors.password_confirmation ? (
        <Text className="text-red-500">{errors.password_confirmation}</Text>
      ) : null}

      <View className="flex flex-row justify-between mt-5">
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
      <AnimateIn type="right" className="mb-4">
        <Button title="Register" onPress={handleRegister} />
      </AnimateIn>
      {/* <Button title="Login" onPress={() => console.log("Button pressed")} /> */}

      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Text className="text-base font-bold text-gray-500 items-center mx-auto">
          Already have an account? Login
        </Text>
      </TouchableOpacity>

      <View className="flex-row justify-center items-center">
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
  );
}

const styles = StyleSheet.create({});
