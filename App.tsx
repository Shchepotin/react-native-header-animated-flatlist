import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView, Animated } from "react-native";

type DataType = {
  id: number;
  text: string;
};

const data: DataType[] = [
  {
    id: 1,
    text: "Hello",
  },
  {
    id: 2,
    text: "World",
  },
  {
    id: 3,
    text: "Simple",
  },
  {
    id: 4,
    text: "Animated",
  },
  {
    id: 5,
    text: "FlatList",
  },
  {
    id: 6,
    text: "🎉",
  },
];

const PROFILE_CONTAINDER_HEIGHT = 440;
const TAB_CONTAINDER_HEIGHT = 60;

export default function App() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const topOffset = scrollY.interpolate({
    inputRange: [0, PROFILE_CONTAINDER_HEIGHT, PROFILE_CONTAINDER_HEIGHT * 2], // [0, 440, 880]
    outputRange: [PROFILE_CONTAINDER_HEIGHT, PROFILE_CONTAINDER_HEIGHT, PROFILE_CONTAINDER_HEIGHT * 2], // [440, 440, 880]
    extrapolateLeft: "clamp",
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <View style={styles.scrollContainerViewStyle}>
        <Animated.FlatList
          style={styles.scrollViewStyle}
          ListHeaderComponentStyle={styles.listHeaderComponentStyle}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <View style={styles.profileContainer}>
                <Text style={styles.textStyle}>Profile info</Text>
              </View>
              <Animated.View
                style={[
                  styles.tabContainer,
                  { transform: [{ translateY: topOffset }] },
                ]}
              >
                <Text style={styles.textStyle}>Tabs</Text>
              </Animated.View>
            </View>
          }
          data={data}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.textStyle}>{item.text}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            {
              useNativeDriver: true,
            }
          )}
          scrollEventThrottle={1}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    height: PROFILE_CONTAINDER_HEIGHT + TAB_CONTAINDER_HEIGHT,
  },
  listHeaderComponentStyle: {
    zIndex: 99, // important!
  },
  profileContainer: {
    height: PROFILE_CONTAINDER_HEIGHT,
    backgroundColor: "#dddddd",
    alignItems: "center",
    justifyContent: "center",
  },
  tabContainer: {
    position: "absolute", // important!
    left: 0,
    right: 0,
    height: TAB_CONTAINDER_HEIGHT,
    backgroundColor: "#444444",
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    height: 220,
    backgroundColor: "#eeeeee",
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: "#808080",
    fontSize: 30,
  },
  scrollContainerViewStyle: {
    flex: 1,
  },
  scrollViewStyle: {
    flexGrow: 1,
  },
});
