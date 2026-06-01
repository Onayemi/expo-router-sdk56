// src/hooks/useWhatsApp.ts
import * as Linking from "expo-linking";
import { useState } from "react";
import { Alert } from "react-native";

interface SendMessageOptions {
  phoneNumber: string;
  message: string;
}

export function useWhatsApp() {
  const [isLaunching, setIsLaunching] = useState(false);

  const sendWhatsAppMessage = async ({
    phoneNumber,
    message,
  }: SendMessageOptions) => {
    if (!phoneNumber) {
      Alert.alert("Missing Info", "A valid phone number is required.");
      return;
    }

    setIsLaunching(true);

    // Remove any special characters, brackets, or spacing from the string
    const cleanPhone = phoneNumber.replace(/[^\d]/g, "");
    const encodedMsg = encodeURIComponent(message);

    const nativeUrl = `whatsapp://send?phone=${cleanPhone}&text=${encodedMsg}`;
    const webFallbackUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

    try {
      // Use your app.config.js queries to securely check native client layout availability
      const isSupported = await Linking.canOpenURL(nativeUrl);

      if (isSupported) {
        await Linking.openURL(nativeUrl);
      } else {
        // Fallback safely to web browser interface on failure
        await Linking.openURL(webFallbackUrl);
      }
    } catch (error) {
      Alert.alert(
        "Redirect Blocked",
        "Could not establish a secure connection channel to WhatsApp.",
      );
    } finally {
      setIsLaunching(false);
    }
  };

  return { sendWhatsAppMessage, isLaunching };
}
