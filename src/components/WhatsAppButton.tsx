// src/components/WhatsAppButton.tsx
import { FontAwesome } from "@expo/vector-icons";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { useWhatsApp } from "../hooks/useWhatsApp";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message: string;
  label?: string;
  className?: string; // Expects standard utility strings only
  iconSize?: number;
}

export default function WhatsAppButton({
  phoneNumber,
  message,
  label,
  className = "", // Defaults to clean string
  iconSize = 20,
}: WhatsAppButtonProps) {
  const { sendWhatsAppMessage, isLaunching } = useWhatsApp();

  return (
    <TouchableOpacity
      onPress={() => sendWhatsAppMessage({ phoneNumber, message })}
      disabled={isLaunching}
      // ⚠️ Notice: We removed the active:scale helper completely to avoid native engine conflicts
      className={`bg-emerald-50 border border-emerald-100 rounded-xl items-center justify-center flex-row ${
        label ? "px-4 py-3" : "w-12 h-12"
      } ${className}`}
    >
      {isLaunching ? (
        <ActivityIndicator size="small" color="#059669" />
      ) : (
        <>
          {/* <MessageSquareText
            size={iconSize}
            color="#059669"
            strokeWidth={2.2}
          /> */}
          <FontAwesome name="whatsapp" size={30} color="#ccccc" />
          {label && (
            <Text className="text-emerald-700 font-bold ml-2 text-sm">
              {label}
            </Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
}
