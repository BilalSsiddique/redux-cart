
'use client'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PayloadAction } from "@reduxjs/toolkit";


export type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity:number;
  calculatedPrice: number;
};


type InitialState = {
  loading: boolean;
  products: Product[];
  error: string;
};
const initialState: InitialState = {
  loading: false,
  products: [],
  error: "",
};

console.log(initialState)

// Thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return axios
      .get("https://fakestoreapi.com/products")
      .then((res) => res.data);
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default productSlice.reducer;
