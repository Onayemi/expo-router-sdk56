import { Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
};

export default function Button({ title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-primary py-3 rounded-full items-center"
    >
      <Text className="text-white">{title}</Text>
    </TouchableOpacity>
  );
}
