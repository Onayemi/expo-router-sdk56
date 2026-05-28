import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function CustomHeader({ title }: { title: string }) {
  const navigation = useNavigation();

  return (
    <View className="flex-row justify-between h-60 px-15 border border-gray-200 items-center pt-10 bg-white">
      {/* LEFT SIDE: Open Drawer Layout */}
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Ionicons name="menu-outline" size={26} color="#002244" />
      </TouchableOpacity>

      {/* CENTER: Title */}
      <Text className="text-lg font-bold text-blue-900">{title}</Text>

      {/* RIGHT SIDE: Page History Action */}
      <TouchableOpacity
        onPress={() => console.log("Open navigation history logs/modals")}
      >
        <Ionicons name="time-outline" size={24} color="#002244" />
      </TouchableOpacity>
    </View>
  );
}

// const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     height: 60,
//     backgroundColor: '#fff',
//     paddingHorizontal: 15,
//     borderBottomWidth: 1,
//     borderColor: '#eee',
//     paddingTop: 10,
//   },
//   headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#002244' },
// });
