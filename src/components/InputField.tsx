import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

type InputFieldProps = {
  icon?: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
};

export default function InputField({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}: InputFieldProps) {
  const [hidePassword, setHidePassword] = useState<boolean>(secureTextEntry);
  return (
    <View className="flex-row px-4 items-center justify-center border border-gray-300 rounded-full">
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color="gray"
          style={{ marginRight: 10 }}
        />
      )}
      <TextInput
        className="flex-1 text-base text-gray-700"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && hidePassword}
      />
      {secureTextEntry && (
        <TouchableOpacity
          onPress={() => setHidePassword((prev) => !prev)}
          className="px-3"
        >
          <Ionicons
            name={hidePassword ? "eye" : "eye-off"}
            size={22}
            color="#ccc"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
