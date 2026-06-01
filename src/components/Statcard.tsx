import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface StatCardProps {
  label: string;
  value: string;
  badge?: number;
  // 🚀 ACTION: Add an optional click handler property
  onPress?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  badge,
  onPress,
}) => {
  return (
    <TouchableOpacity
      // Trigger the optional function, or fall back to an empty return if not provided
      onPress={onPress}
      // Disable interaction visually if no onPress method is assigned
      disabled={!onPress}
      // Give visual feedback on tap (only if interactive)
      activeOpacity={onPress ? 0.75 : 1}
      // 💡 Added active:scale-95 to give it a modern, tactical tactile push-down effect when clicked
      className={`bg-white/20 p-4 rounded-2xl flex-1 mx-1 items-center justify-center relative ${
        onPress ? "active:scale-95" : ""
      }`}
    >
      {badge !== undefined && badge > 0 && (
        <View className="absolute -top-1 -right-1 bg-[#FF5A36] rounded-full w-5 h-5 items-center justify-center border-2 border-[#635BFF]">
          <Text className="text-white text-[10px] font-bold">{badge}</Text>
        </View>
      )}
      <Text className="text-white text-2xl font-bold">{value}</Text>
      <Text className="text-white/70 text-xs mt-1 font-medium">{label}</Text>
    </TouchableOpacity>
  );
};
