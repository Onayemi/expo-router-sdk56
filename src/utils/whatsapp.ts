import * as Linking from "expo-linking";
import { Alert } from "react-native";

interface WhatsAppOptions {
  phoneNumber: string;
  message?: string;
}

/**
 * Opens WhatsApp chat with a specified phone number and optional pre-filled message.
 * @param phoneNumber International format: country code + number (no spaces, dashes, or +)
 * @param message Optional text to pre-fill the chat with
 */
export const openWhatsApp = async ({
  phoneNumber,
  message = "",
}: WhatsAppOptions): Promise<void> => {
  // Clean up the phone number just in case (removes +, spaces, dashes)
  const cleanedPhone = phoneNumber.replace(/[^\d]/g, "");

  const url = `https://wa.me/${cleanedPhone}?text=${encodeURIComponent(message)}`;

  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "WhatsApp is not installed on this device");
    }
  } catch (error) {
    Alert.alert("Error", "Could not open WhatsApp");
  }
};
