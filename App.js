import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View, FlatList, Animated } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import LottieView from "lottie-react-native";

const DATA = [
  {
    title: "Travel the world",
    description: "Loren ipsum is simply dummy text of the printing and typesetting industry.",
    lottie: require("./assets/lottie-1.json"),
  },
  {
    title: "Let's travel",
    description: "Loren ipsum is simply dummy text of the printing and typesetting industry.",
    lottie: require("./assets/lottie-2.json"),
  },
  {
    title: "Play a trip",
    description: "Loren ipsum is simply dummy text of the printing and typesetting industry.",
    lottie: require("./assets/lottie-3.json"),
  },
];

export default function App() {
  const scrollX = new Animated.Value(0);
  const animation = React.useRef(null);
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ width: wp(100), height: hp(100), backgroundColor: "#ddd", paddingTop: hp(10) }}>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: hp(40),
            height: hp(40),
            alignSelf: "center",
          }}
          source={item.lottie}
        />
        <Text style={{ textAlign: "center", marginTop: hp(5), fontSize: hp(5), fontWeight: "bold" }}>{item.title}</Text>
        <Text style={{ width: wp(70), alignSelf: "center", textAlign: "center", marginTop: hp(2), fontSize: hp(2), color: "#aaa" }}>{item.description}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      />
      <View style={{ position: "absolute", bottom: hp(10), flexDirection: "row" }}>
        {DATA.map((item, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [(index - 1) * wp(100), index * wp(100), (index + 1) * wp(100)],
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp",
          });
          const scale = scrollX.interpolate({
            inputRange: [(index - 1) * wp(100), index * wp(100), (index + 1) * wp(100)],
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={index}
              style={{
                width: hp(2),
                height: hp(2),
                marginHorizontal: wp(5),
                backgroundColor:"#fff",
                borderRadius: 100,
                opacity: opacity,
                transform: [
                  {
                    scale: scale,
                  },
                ],
              }}
            />
          );
        })}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
