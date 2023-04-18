import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { Product } from "./productSlice";
import { useAppSelector } from "../hook";

// type Initial State

type InitialState = {
  products: Product[];
};

const initialState: InitialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action: PayloadAction<Product>) {
      const newItem = action.payload;
      console.log('checkprice',newItem)
      const itemToUpdate = state.products.find(
        (item) => item.id === newItem.id
      );
      if (itemToUpdate) {
        itemToUpdate.quantity += 1;
        itemToUpdate.calculatedPrice = itemToUpdate.quantity * newItem.price  
      } else {
        state.products.push({ ...newItem, quantity: 1,calculatedPrice:newItem.price });
      }
    },
    remove(state, action: PayloadAction<Product>) {
      const index = state.products.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
    updateQuantity(state,action:PayloadAction<Product>){
      const newItem = action.payload;
      if (newItem.quantity===1) return
      const itemToUpdate = state.products.find(
        (item) => item.id === newItem.id
      );
      if (itemToUpdate) {
        itemToUpdate.quantity -= 1;
        itemToUpdate.calculatedPrice = itemToUpdate.quantity * itemToUpdate.price;
      } 
      
    }
  }
});

export const { add, remove,updateQuantity } = cartSlice.actions;

export const totalProductsCount = (state: RootState) =>
  state.cart.products.length;
export const selectedProducts = (state: RootState) => state.cart.products;
// export const
export default cartSlice.reducer;
