// src/app/(protected)/products/checkout.tsx
import api from "@/services/api"; // Path to your central Axios api file module
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "expo-router";
import { ArrowLeft, Trash2 } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CheckoutScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bind cart values directly from store hooks
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } =
    useCartStore();

  const handleCheckoutSubmit = async () => {
    if (cart.length === 0) return;

    try {
      setIsSubmitting(true);

      // Structure transaction records safely to match Laravel controller requests
      const payload = {
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
        })),
        total_amount: getCartTotal(),
        timestamp: new Date().toISOString(),
      };

      // POST request to your Laravel server endpoint route (e.g. Route::post('/orders', ...))
      const response = await api.post("/orders", payload);

      if (response.status === 200 || response.status === 201) {
        Alert.alert(
          "Success",
          "Transaction authenticated and logged successfully!",
        );
        clearCart(); // Clean out local memory state array bounds
        router.replace("/(tabs)"); // Bounce user safely to base hub view
      }
    } catch (error: any) {
      console.error("API Gateway processing failure:", error);
      Alert.alert(
        "Checkout Failed",
        error?.response?.data?.message ||
          "Internal transaction transmission node failure.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={{ paddingTop: insets.top }} className="flex-1 bg-white">
      {/* NAVBAR */}
      <View className="px-6 py-4 border-b border-slate-100 flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 bg-slate-50 border border-slate-100 rounded-xl"
        >
          <ArrowLeft size={18} color="#002244" />
        </TouchableOpacity>
        <Text className="text-lg font-black text-[#002244] ml-4">
          Selected Items
        </Text>
      </View>

      {/* ITEMS LIST AREA */}
      <ScrollView
        className="flex-1 px-6 pt-4"
        showsVerticalScrollIndicator={false}
      >
        {cart.length === 0 ? (
          <Text className="text-slate-400 text-center text-sm font-medium mt-12">
            Your cart is empty.
          </Text>
        ) : (
          cart.map((item) => (
            <View
              key={item.id}
              className="border border-slate-100 rounded-2xl p-4 mb-3 flex-row justify-between items-center bg-slate-50"
            >
              <View className="flex-1 pr-2">
                <Text
                  className="text-slate-800 font-bold text-sm"
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                <Text className="text-slate-500 text-xs mt-0.5">
                  ₦{item.price.toLocaleString()} x {item.quantity}
                </Text>
              </View>

              {/* INCREMENT / DECREMENT QUANTITY CONTAINER CONTROLS */}
              <View className="flex-row items-center space-x-3 bg-white border border-slate-200 rounded-xl p-1">
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, -1)}
                  className="w-7 h-7 items-center justify-center rounded-lg bg-slate-50"
                >
                  <Text className="text-slate-600 font-bold text-sm">-</Text>
                </TouchableOpacity>
                <Text className="text-slate-800 font-bold text-sm px-1">
                  {item.quantity}
                </Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, 1)}
                  className="w-7 h-7 items-center justify-center rounded-lg bg-slate-50"
                >
                  <Text className="text-slate-600 font-bold text-sm">+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => removeFromCart(item.id)}
                className="ml-3 p-2 rounded-lg bg-rose-50 border border-rose-100"
              >
                <Trash2 size={16} color="#f43f5e" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* FOOTER TOTAL CALCULATION TRAY */}
      {cart.length > 0 && (
        <View
          style={{ paddingBottom: insets.bottom + 16 }}
          className="border-t border-slate-100 p-6 bg-slate-50/50"
        >
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-slate-500 text-sm font-bold">
              Payable Balance
            </Text>
            <Text className="text-[#002244] text-xl font-black">
              ₦{getCartTotal().toLocaleString()}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleCheckoutSubmit}
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl items-center justify-center shadow-md ${
              isSubmitting
                ? "bg-slate-400"
                : "bg-emerald-600 shadow-emerald-700/10"
            }`}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text className="text-white font-bold text-sm uppercase tracking-wider">
                Process Order Invoice
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
