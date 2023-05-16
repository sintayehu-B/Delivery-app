import { TouchableOpacity, View, Text, Image } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import colors from "../constants/colors";
import { urlFor } from "../utils/sanity";
import { useNavigation } from "@react-navigation/native";
const RestaurantCard = ({
  id,
  short_description,
  imgUrl,
  title,
  rating,
  genre,
  address,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="bg-white mr-3 shadow"
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
          short_description,
          imgUrl,
          title,
          rating,
          genre,
          address,
          dishes,
          long,
          lat,
        });
      }}
    >
      <Image
        source={{
          uri: urlFor(imgUrl).url(),
        }}
        className="h-36 w-64 rounded-sm"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <Entypo
            name="star"
            size={17}
            color={colors.Icons_green}
            opacity={0.5}
          />
          <Text className="text-xs text-gray-500">
            <Text className="text-gray-500">{rating}</Text> . {genre}
          </Text>
        </View>
        <View className="flex-row space-x-1 items-center">
          <Entypo
            name="location"
            opacity={0.4}
            size={17}
            color={colors.Icons_gray}
          />
          <Text className="text-xs text-gray-500"> Nearby . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
