import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { formatNumber } from "react-native-currency-input";

import { urlFor } from "../utils/sanity";
import colors from "../constants/colors";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../features/basketSlice";
const DishRow = ({ id, name, price, description, image }) => {
  const [isPressed, setPressed] = useState([]);
  const dispatch = useDispatch();
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, price, description, image }));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setPressed(!isPressed);
        }}
        className={`bg-white border p-4 border-gray-200 ${
          !isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className=" text-gray-400"> {description} </Text>
            <Text className="text-gray-400 mt-2">
              {formatNumber(price, {
                separator: ",",
                unit: ".",
                prefix: "Br ",
                delimiter: ",",
                suffix: ".00",
                ignoreNegative: true,
              })}
            </Text>
          </View>
          <View>
            <Image
              style={{ borderWidth: 1, borderColor: colors.border }}
              source={{
                uri: urlFor(image).url(),
              }}
              className="h-20 w-20 bg-gray-300 p-4 "
            />
          </View>
        </View>
      </TouchableOpacity>

      {!isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity
              disabled={!items.length}
              onPress={removeItemFromBasket}
            >
              <Entypo
                name="circle-with-minus"
                opacity={0.6}
                color={items.length > 0 ? colors.Icon : colors.Icons_gray}
                size={40}
              />
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={addItemToBasket}>
              <Entypo
                name="circle-with-plus"
                opacity={0.6}
                color={colors.Icon}
                size={40}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
