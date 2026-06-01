import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "expo-router";
import { Plus, ShoppingBag } from "lucide-react-native";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Mock list matching your backend schema shape
const MOCK_PRODUCTS = [
  {
    id: "101",
    name: "Premium Full-Stack Course",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=300",
  },
  {
    id: "102",
    name: "Driving Practical Module",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=300",
  },
  {
    id: "103",
    name: "Cybersecurity BootCamp Access",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=300",
  },
];

export default function Settings() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Connect to Zustand cart hooks
  const addToCart = useCartStore((state) => state.addToCart);
  const cartCount = useCartStore((state) => state.getCartCount());

  return (
    <View className="flex-1 bg-slate-50 relative">
      {/* SCROLLABLE CATALOG AREA */}
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-2xl font-black text-[#002244]">
          Store Catalog
        </Text>
        <Text className="text-slate-500 text-xs font-medium mb-4">
          Select items to build your core profile toolkit
        </Text>

        {/* Dynamic Product Row Mapping */}
        {MOCK_PRODUCTS.map((product) => (
          <View
            key={product.id}
            className="bg-white border border-slate-100 rounded-2xl p-4 mb-4 shadow-sm flex-row items-center"
          >
            <Image
              source={{ uri: product.image }}
              className="w-20 h-20 rounded-xl bg-slate-100"
              resizeMode="cover"
            />

            <View className="flex-1 ml-4 pr-2">
              <Text
                className="text-slate-800 font-bold text-sm"
                numberOfLines={1}
              >
                {product.name}
              </Text>
              <Text className="text-emerald-600 font-black text-sm mt-1">
                ₦{product.price.toLocaleString()}
              </Text>
            </View>

            {/* Tap to append item inside Zustand store array */}
            <TouchableOpacity
              onPress={() => addToCart(product)}
              className="w-10 h-10 bg-sky-50 rounded-full items-center justify-center active:scale-90"
            >
              <Plus size={18} color="#0284c7" strokeWidth={3} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* FLOATING ACTION CART TRAY FAB (Conditionally visible if count > 0) */}
      {cartCount > 0 && (
        <TouchableOpacity
          onPress={() => router.navigate("/(tabs)/(dynamic)/checkout")}
          style={{ bottom: insets.bottom + 80, right: 20 }}
          className="absolute z-50 bg-[#002244] px-5 py-3.5 rounded-full flex-row items-center shadow-lg shadow-slate-900/40"
        >
          <ShoppingBag size={18} color="#ffffff" />
          <Text className="text-white font-black text-xs ml-2 tracking-wide uppercase">
            View Basket ({cartCount})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
