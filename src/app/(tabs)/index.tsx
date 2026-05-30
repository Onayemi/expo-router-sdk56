import AutoScrollList from "@/components/AutoScrollList";
import { openWhatsApp } from "@/utils/whatsapp";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  Button,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const products = [
  { id: 1, name: "Product A" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
  { id: 4, name: "Product D" },
];

export default function Index() {
  const insets = useSafeAreaInsets();
  const handleSupportChat = () => {
    openWhatsApp({
      phoneNumber: "+2348061313253",
      message: "Hi Support, I need help with my account.",
    });
  };
  return (
    <View
      className="flex-1 px-5 gap-2 relative"
      // style={{
      //   // Dynamically apply exact status bar padding height across iOS & Android
      //   paddingTop: insets.top,
      // }}
    >
      <StatusBar barStyle={"dark-content"} />

      {/* <AppHeader /> */}
      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
        className="flex-1 px-4 pt-4"
      > */}
      <View className="mt-10">
        <AutoScrollList
          data={products}
          itemWidth={200} // Matches the width of your item container
          renderItem={(item) => (
            <View className="w-[150px] h-40 bg-red-500 m-2 rounded-lg justify-center items-center">
              <Text className="text-white font-bold">{item.name}</Text>
            </View>
          )}
        />
      </View>
      <Text className="text-3xl text-red-500 font-bold">Home</Text>
      {/* <Link href="/modal" >Go to Splash</Link> */}
      <Link asChild push href={"/modal"}>
        <Button title="Open Modal" />
      </Link>
      <Link asChild push href={"/splash"}>
        <Button title="Go to SplashScreen" />
      </Link>

      {/* Floating Button utilizing the reusable function */}
      <Pressable
        onPress={handleSupportChat}
        className="absolute bottom-6 right-6 bg-[#25D366] p-4 rounded-full shadow-lg active:opacity-70 elevation-5"
      >
        <FontAwesome name="whatsapp" size={32} color="white" />
      </Pressable>
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({});
