import { useEffect, useRef } from "react";
import { FlatList } from "react-native";

interface Props {
  data: any[];
  renderItem: (item: any) => JSX.Element;
  itemWidth: number; // Width of each item
}

export default function AutoScrollList({ data, renderItem, itemWidth }: Props) {
  const flatListRef = useRef<FlatList>(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex.current < data.length - 1) {
        currentIndex.current += 1;
      } else {
        currentIndex.current = 0; // Loop back to start
      }

      flatListRef.current?.scrollToOffset({
        offset: currentIndex.current * itemWidth,
        animated: true,
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [data, itemWidth]);

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={({ item }) => renderItem(item)}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      // Optimization props
      getItemLayout={(_, index) => ({
        length: itemWidth,
        offset: itemWidth * index,
        index,
      })}
    />
  );
}
