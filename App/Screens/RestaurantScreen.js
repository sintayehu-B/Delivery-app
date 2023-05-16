import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { urlFor } from "../utils/sanity";
import { Entypo } from "@expo/vector-icons";
import colors from "../constants/colors";
import DishRow from "../components/DishRow";
import BasketIcons from "../components/BasketIcons";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    params: {
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
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
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
      })
    );
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <BasketIcons />
      <ScrollView>
        <View className="relative">
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className="w-full h-56 bg-gray-300 p-4"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          >
            <Entypo name="arrow-long-left" size={20} color={colors.Icon} />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <Entypo
                  name="star"
                  opacity={0.5}
                  size={20}
                  color={colors.Icon}
                />
                <Text className="text-xs text-gray-500">
                  <Text className="text-gray-500">{rating}</Text> . {genre}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <Entypo
                  name="location"
                  opacity={0.5}
                  size={20}
                  color={colors.Icons_gray}
                />
                <Text className="text-xs text-gray-500">
                  <Text className="text-gray-500">Nearby . {address} </Text>
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-gray-300">
            <Entypo
              name="help-with-circle"
              size={20}
              color={colors.Icons_gray}
              opacity={0.6}
            />
            <Text className="pl-2 flex-1 text-md font-bold">
              Have a food allergy?
            </Text>
            <Entypo name="chevron-right" size={20} color={colors.Icon} />
          </TouchableOpacity>
        </View>
        <View className="pb-36">
          <Text className="px-4 pt-4 font-bold text-xl mb-3">Menu</Text>

          {/* Dishes Rows */}
          {dishes?.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
