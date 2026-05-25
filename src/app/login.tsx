import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Login() {
  return (
    <View>
      <Text>Login</Text>
      <Link href="/splash">Go to Modal</Link>
    </View>
  );
}

const styles = StyleSheet.create({});
