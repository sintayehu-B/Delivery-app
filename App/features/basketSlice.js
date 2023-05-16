import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove Product (id : ${action.payload.id} ) as its not in basket!`
        );
      }
      state.items = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;
export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);

/**
 * This function calculates the total price of items in a shopping basket.
 * @param state - The state parameter is the current state of the Redux store. It contains all the data
 * that has been stored in the store, including the basket items.
 */
export const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => (total += Number(item.price)), 0);
export default basketSlice.reducer;
