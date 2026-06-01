import api from "@/services/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ProductDetails {
  id: string;
  name: string;
  category: string;
  description: string;
  status: "active" | "draft" | "archived";
}

export default function ProductDetails() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: string }>();

  // Local component states
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<ProductDetails | null>(null);

  // 🔄 Fetch product schema details from your backend API engine on mount
  useEffect(() => {
    async function loadProductData() {
      try {
        setLoading(true);
        // Communicates with your route endpoint: e.g., /api/products/201
        const response = await api.get(`/products/${type}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Failed to sync backend node ledger context:", error);
      } finally {
        setLoading(false);
      }
    }

    if (type) loadProductData();
  }, [type]);

  if (loading) {
    return (
      <View className="flex-1 bg-slate-50 justify-center items-center">
        <ActivityIndicator size="large" color="#002244" />
        <Text className="text-slate-400 font-medium text-xs mt-2">
          Syncing Data Streams...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-slate-50 px-6"
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 60 }}
    >
      <View style={{ paddingTop: insets.top }} className="flex-1 bg-white px-6">
        {/* BACK BUTTON CUSTOM ACTION NAVBAR */}
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl items-center justify-center"
          >
            <ArrowLeft size={18} color="#002244" />
          </TouchableOpacity>
          <Text className="text-lg font-black text-[#002244] ml-4">
            Back to Products
          </Text>
        </View>
        <Text>ProductDetails {type}</Text>

        <View className="mb-4">
          <Text className="text-slate-700 text-xs font-bold uppercase mb-1">
            Product Title
          </Text>
          <TextInput
            value={formData?.name}
            onChangeText={(text) =>
              setFormData((prev) => (prev ? { ...prev, name: text } : null))
            }
            placeholder="Loading product name string..."
            placeholderTextColor="#94a3b8"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm font-semibold focus:border-sky-500"
          />
        </View>

        <View className="mb-4">
          <Text className="text-slate-700 text-xs font-bold uppercase mb-1">
            Detailed Description Summary
          </Text>
          <TextInput
            value={formData?.description}
            onChangeText={(text) =>
              setFormData((prev) =>
                prev ? { ...prev, description: text } : null,
              )
            }
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-600 text-sm font-medium h-24"
          />
        </View>

        <View className="mb-6">
          <Text className="text-slate-700 text-xs font-bold uppercase mb-1.5">
            Lifecycle Status Matrix (Select)
          </Text>
          <View className="flex-row space-x-2">
            {(["active", "draft", "archived"] as const).map((statusValue) => {
              const isSelected = formData?.status === statusValue;
              return (
                <TouchableOpacity
                  key={statusValue}
                  onPress={() =>
                    setFormData((prev) =>
                      prev ? { ...prev, status: statusValue } : null,
                    )
                  }
                  activeOpacity={0.7}
                  className={`flex-1 py-2.5 rounded-xl border items-center justify-center ${
                    isSelected
                      ? "bg-sky-50 border-sky-400 shadow-sm"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <Text
                    className={`text-xs font-bold capitalize ${isSelected ? "text-sky-600" : "text-slate-500"}`}
                  >
                    {statusValue}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <TouchableOpacity
          onPress={async () => {
            await api.put(`/products/${type}`, formData);
            router.back();
          }}
          className="w-full bg-[#002244] py-3.5 rounded-xl items-center justify-center shadow-md shadow-[#002244]/10"
        >
          <Text className="text-white font-bold text-sm">
            Save Backend Changes
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
