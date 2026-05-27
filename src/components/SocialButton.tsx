import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
} from "react-native";

type SocialButtonProps = {
  title: string;
  image?: ImageSourcePropType;
  onPress: () => void;
};
export default function SocialButton({
  title,
  image,
  onPress,
}: SocialButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full px-4 py-3 border border-gray-200 rounded-full flex-row items-center justify-center gap-3"
    >
      <Image source={image} className="w-6 h-6" resizeMode="contain" />
      <Text className="text-base font-medium text-gray-700">
        Sign In With {title}
      </Text>
    </TouchableOpacity>
  );
}
