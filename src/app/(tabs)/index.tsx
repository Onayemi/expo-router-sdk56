import AutoScrollList from "@/components/AutoScrollList";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useAuthStore } from "@/store/useAuthStore";
import { Link, useRouter } from "expo-router";
import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
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
  const router = useRouter();
  // const logout = useAuthStore((state) => state.logout);
  const { user, logout } = useAuthStore();

  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: insets.bottom }}
    >
      <View className="flex-1 px-5 gap-2 relative">
        <StatusBar barStyle={"dark-content"} />
        <View className="mt-3">
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

        {/* Whatsapp Icon */}
        <WhatsAppButton
          phoneNumber="+2348027819593"
          message="Hello, I have a question about my recent transaction on CoreApp. Can you assist me with the details?"
          label="Message Support"
          className="w-full mt-4"
        />
        {/* List Data */}
        {Array.from({ length: 4 }).map((_, idx) => {
          const productId = idx + 201;

          return (
            <TouchableOpacity
              key={idx}
              onPress={() =>
                router.navigate({
                  pathname: "/profile/[id]",
                  params: { id: productId },
                })
              }
              activeOpacity={0.7}
              // 3. MOTION STYLING: Add active:scale-98 for a modern premium tactile click feel
              className="p-5 bg-white border border-slate-100 rounded-2xl mt-1 shadow-sm active:scale-[0.98]"
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-1 pr-2">
                  <Text className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                    System Analytics Ledger
                  </Text>
                  <Text className="text-slate-800 font-bold text-sm mt-1">
                    Data Pipeline Node Reference #{productId}
                  </Text>
                </View>

                {/* Visual structural chevron cue to signal interactiveness */}
                <View className="w-10 h-10 bg-slate-20 border border-slate-100 rounded-lg items-center justify-center">
                  <Text className="text-slate-400 text-2xl font-bold">→</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        <View className="my-2" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
