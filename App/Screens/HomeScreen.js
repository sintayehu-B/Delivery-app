import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import "react-native-url-polyfill/auto";
import colors from "../constants/colors";
import Categories from "../components/Categories";

import FeaturedRow from "../components/Featured";
import sanityClient from "../utils/sanity";
const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured"] {
        ..., restaurants[]-> {
          ...,
          dishes[]->
          
        }
      }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-3">
      {/* Header */}
      <View className="flex-row items-center pb-3 mx-4 space-x-2">
        <Image
          source={{
            uri: "https://i.pinimg.com/236x/91/97/46/919746beae906982f5a9ea99606e3045.jpg",
          }}
          className=" h-7 w-7 bg-gray-300  p-4 rounded-full"
        />
        <View className="flex-1 ">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
          <Text className=" font-bold text-xl">
            Current Location
            <Entypo name="chevron-down" size={20} color={colors.Icon} />
          </Text>
        </View>

        <Entypo
          className="justify-end"
          name="user"
          size={28}
          color={colors.Icon}
        />
      </View>
      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4 ">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <Entypo name="magnifying-glass" size={20} color={colors.Icon} />
          <TextInput
            placeholder="Restaurant's and Cuisines"
            keyboardType="default"
          />
        </View>
        <Entypo name="flow-parallel" size={20} color={colors.Icon} />
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {/* Categories */}
        <Categories />

        {/* Featured */}

        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category?._id}
            id={category?._id}
            title={category?.name}
            description={category?.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
