import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import colors from "../constants/colors";
import { urlFor } from "../utils/sanity";
import { formatNumber } from "react-native-currency-input";
const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();
  const [groupedItemsInBasket, setGroupedItemsOutBasket] = useState([]);
  /* `useMemo` is a hook in React that memoizes the result of a function and returns the cached result
when the dependencies of the function have not changed. In this code, `useMemo` is used to group the
items in the basket by their `id` using the `reduce` method. The resulting object is then set as the
state of `groupedItemsInBasket` using the `setGroupedItemsOutBasket` function. The `items` array is
passed as a dependency to `useMemo`, so the function will only be re-executed if the `items` array
changes. This helps to optimize performance by avoiding unnecessary re-renders. */
  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsOutBasket(groupedItems);
  }, [items]);
  // console.log(groupedItemsInBasket);
  // const DeliverFee = ()=>{
  //   Object.entries(groupedItemsInBasket).map(([key, items]) =>{
  //     if(key=key){
  //       items[0]?.price +
  //     }
  //   })
  // }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center to-gray-400">{restaurant.title}</Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <Entypo
              name="circle-with-cross"
              size={35}
              opacity={0.6}
              color={colors.Icon}
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 bg-white py-3 my-5">
          <Image
            source={{
              uri: "https://i.pinimg.com/564x/d8/c8/19/d8c8195f1f852b3678a8bba9cbc6bc27.jpg",
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center  bg-white space-x-3 py-2 px-5"
            >
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                {formatNumber(items[0].price, {
                  separator: ",",
                  unit: ".",
                  prefix: "Br ",
                  delimiter: ",",
                  suffix: ".00",
                  ignoreNegative: true,
                })}
              </Text>

              <TouchableOpacity className="">
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 bg-white mt-5  space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              {formatNumber(basketTotal, {
                separator: ",",
                unit: ".",
                prefix: "Br ",
                delimiter: ",",
                suffix: ".00",
                ignoreNegative: true,
              })}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Deliver Fee</Text>
            <Text className="text-gray-400">
              {formatNumber(5.99, {
                separator: ",",
                unit: ".",
                prefix: "Br ",
                delimiter: ",",
                suffix: ".00",
                ignoreNegative: true,
              })}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">
              {formatNumber(basketTotal + 5.99, {
                separator: ",",
                unit: ".",
                prefix: "Br ",
                delimiter: ",",
                suffix: ".00",
                ignoreNegative: true,
              })}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrder")}
            className="rounded-lg bg-[#00CCBB] p-4"
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
