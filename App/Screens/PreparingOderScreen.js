import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";

import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);
  return (
    <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/images/deliveroodribbbble.gif")}
        animation="slideInUp"
        iterationCount={1}
        className=" h-96 w-96"
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for Restaurant to accept your Order
      </Animatable.Text>

      <Progress.Bar
        indeterminate={true}
        width={300}
        progress={0.3}
        color="white"
        animated={true}
      />
    </SafeAreaView>
  );
};

export default PreparingOderScreen;
