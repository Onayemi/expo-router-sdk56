import AutoScrollList from "@/components/AutoScrollList";
import { Link } from "expo-router";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";

const products = [
  { id: 1, name: "Product A" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
  { id: 4, name: "Product D" },
];

export default function Index() {
  return (
    <View className="flex-1 px-5 mt-10 gap-2">
      <StatusBar barStyle={"dark-content"} />

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
    </View>
  );
}

const styles = StyleSheet.create({});
