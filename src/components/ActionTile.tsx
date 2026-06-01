import * as LucideIcons from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ActionTileProps {
  title: string;
  iconName: string;
  iconColor: string;
  badge?: number;
  onPress?: () => void;
}

export const ActionTile: React.FC<ActionTileProps> = ({
  title,
  iconName,
  iconColor,
  badge,
  onPress,
}) => {
  // Dynamic Component Resolver Function
  const renderIcon = () => {
    const IconComponent = (LucideIcons as any)[iconName];
    if (!IconComponent) {
      return (
        <LucideIcons.HelpCircle
          size={28}
          color={iconColor}
          strokeWidth={1.75}
        />
      );
    }
    return <IconComponent size={28} color={iconColor} strokeWidth={1.75} />;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="bg-white p-3 rounded-2xl w-[30%] mb-4 items-center justify-center shadow-sm border border-gray-50 relative"
    >
      {badge !== undefined && badge > 0 && (
        <View className="absolute -top-1.5 -right-1.5 bg-[#FF5A36] rounded-full w-5 h-5 items-center justify-center border border-white">
          <Text className="text-white text-[9px] font-bold">{badge}</Text>
        </View>
      )}
      <View className="mb-2 bg-gray-50 p-2.5 rounded-xl">
        {/* Render the icon through the wrapper function safely */}
        {renderIcon()}
      </View>
      <Text
        className="text-[#2D3142] font-semibold text-center text-[11px] leading-tight"
        numberOfLines={2}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
