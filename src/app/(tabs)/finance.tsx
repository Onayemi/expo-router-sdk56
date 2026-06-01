import { ActionTile } from "@/components/ActionTile";
import { ProfileHeader } from "@/components/ProfileHeader";
import { StatCard } from "@/components/Statcard";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// Import JSON manifest record data
import dashboardData from "@/data/dashboardData.json";
import { useRouter } from "expo-router";

export default function Finance() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { profile, stats, menuItems } = dashboardData;
  return (
    <ScrollView
      style={{ paddingTop: insets.top }}
      className="flex-1 bg-[#FAFAFA]"
      showsVerticalScrollIndicator={false}
    >
      {/* Header Layout Module */}
      <ProfileHeader
        name={profile.name}
        avatarUrl={profile.avatarUrl}
        cartCount={profile.cartCount}
      />

      {/* Financial/Stat Overlay Layout Module */}
      <View className="bg-[#635BFF] mx-5 -mt-8 p-5 rounded-[30px] flex-row justify-between shadow-lg shadow-indigo-200">
        {stats.map((stat) => (
          <>
            <StatCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              badge={stat.badge}
              onPress={() => console.log("Stat Card click")}
            />
            {/* <StatCard
              label="Pending Orders"
              value="12"
              badge={3}
              onPress={() => console.log("Stat Card click")}
              // onPress={() => router.navigate("/(protected)/products/checkout")}
            /> */}
          </>
        ))}
      </View>

      {/* 3-Column Flex Grid Wrapper */}
      <View className="flex-row flex-wrap justify-between px-5 mt-8">
        {menuItems.map((item) => (
          <ActionTile
            key={item.id}
            title={item.title}
            iconName={item.icon}
            iconColor={item.iconColor}
            badge={item.badge}
            // Pass dynamic router action downstream
            onPress={() =>
              router.navigate({
                pathname: "/(tabs)/(dynamic)/analytics/[id]",
                params: { id: item.id },
              })
            }
          />
        ))}
      </View>
    </ScrollView>
  );
}
