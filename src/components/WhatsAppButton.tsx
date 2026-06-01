// src/components/WhatsAppButton.tsx
import { useWhatsApp } from "@/hooks/useWhatsApp";
// import { MessageSquareText } from "lucide-react-native";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { MessageSquareText } from 'lucide-react-native';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message: string;
  label?: string; // Optional button text label
  className?: string; // NativeWind styling support overriding layout structures
  iconSize?: number;
}

export default function WhatsAppButton({
  phoneNumber,
  message,
  label,
  className = "",
  iconSize = 20,
}: WhatsAppButtonProps) {
  const { sendWhatsAppMessage, isLaunching } = useWhatsApp();

  return (
    <TouchableOpacity
      onPress={() => sendWhatsAppMessage({ phoneNumber, message })}
      disabled={isLaunching}
      className={`bg-emerald-50 border border-emerald-100 rounded-xl items-center justify-center active:scale-95 flex-row ${
        label ? "px-4 py-3" : "w-12 h-12"
      } ${className}`}
    >
      {isLaunching ? (
        <ActivityIndicator size="small" color="#059669" />
      ) : (
        <>
        <MessageSquareText size={iconSize} color="#059669" strokeWidth={2.2} />
          {/* <LucideIcon name="message-square" size={iconSize} color="#059669" strokeWidth={2.2} /> */}
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
