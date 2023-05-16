import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import colors from "../constants/colors";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../utils/sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurant] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "featured" && _id == $id] {
      ..., 
      restaurants[]-> {
        ...,
        dishes[]->,
        type-> {name},
        }
    }[0]`,
        { id }
      )
      .then((data) => {
        setRestaurant(data?.restaurants);
      })
      .catch((error) => {
        console.long(error);
      });
  }, [id]);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <Entypo name="arrow-long-right" size={20} color={colors.Icon} />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Restaurant Cards */}
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            short_description={restaurant.short_description}
            long={restaurant.long}
            title={restaurant.name}
            genre={restaurant.type?.name}
            lat={restaurant.lat}
            address={restaurant.address}
            imgUrl={restaurant?.image}
            dishes={restaurant.dishes}
            rating={restaurant.rating}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
