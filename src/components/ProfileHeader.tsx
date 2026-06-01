import { ChevronLeft, Menu, ShoppingCart } from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ProfileHeaderProps {
  name: string;
  avatarUrl: string;
  cartCount?: number;
  onBackPress?: () => void;
  onMenuPress?: () => void;
  onCartPress?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  avatarUrl,
  cartCount = 0,
  onBackPress,
  onMenuPress,
  onCartPress,
}) => {
  return (
    <View className="bg-[#F4F7FF] px-6 pt-4 pb-14 rounded-b-[40px]">
      {/* Navbar Row */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity onPress={onBackPress} className="p-2 -ml-2">
          <ChevronLeft color="#1A1D1E" size={26} />
        </TouchableOpacity>

        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={onCartPress}
            className="relative border border-green-300 p-2.5 rounded-full bg-white"
          >
            <ShoppingCart color="#22C55E" size={22} />
            {cartCount > 0 && (
              <View className="absolute -top-1 -right-1 bg-green-500 rounded-full w-5 h-5 items-center justify-center border-2 border-white">
                <Text className="text-white text-[9px] font-bold">
                  {cartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onMenuPress}
            className="bg-white border border-gray-100 p-2.5 rounded-full shadow-sm"
          >
            <Menu color="#1A1D1E" size={22} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Identity Row */}
      <View className="flex-row items-center mt-2">
        <Image
          source={{ uri: avatarUrl }}
          className="w-16 h-16 rounded-full border-2 border-white shadow-md bg-gray-200"
        />
        <Text className="ml-4 text-2xl font-bold text-[#0A0E27] tracking-tight">
          {name}
        </Text>
      </View>
    </View>
  );
};
