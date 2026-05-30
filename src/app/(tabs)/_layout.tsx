import AppHeader from "@/components/AppHeader";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  const PRIMARY_GREEN = "#00B875";

  return (
    <Tabs
      screenOptions={{
        // 🚀 Registers your working AppHeader globally across all tab instances
        header: (props) => <AppHeader {...props} />,
        headerShown: true,

        // Customizing the Bottom Navigation Bar Style
        tabBarActiveTintColor: PRIMARY_GREEN,
        tabBarInactiveTintColor: "#64748B",
        // tabBarStyle: {
        //   backgroundColor: "#FFFFFF",
        //   borderTopWidth: 1,
        //   borderTopColor: "#F1F5F9",
        //   height: 65,
        //   paddingBottom: 10,
        //   paddingTop: 8,
        // },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarLabel: "Index",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-city-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="gear" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: "Info me",
          headerShown: false,
          tabBarLabel: "me",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="gear" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
