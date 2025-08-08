import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  productList: [],
};

// ✅ Add new product
export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:5000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

// ✅ get all products
export const fetchAllProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const result = await axios.get(
      "http://localhost:5000/api/admin/products/get"
    );

    return result?.data;
  }
);

// ✅ edit product
export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:5000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

// ✅ Delete product
export const deleteProduct = createAsyncThunk(
  "/products/deleteproduct",
  async (formData) => {
    const result = await axios.delete(
      `http://localhost:5000/api/admin/products/delete${id}`, 
      );
    return result?.data;
  }
);

// ✅ Create slice
const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        // exactly like in the video: payload.data holds the array
        console.log(action.payload);
        state.isLoading = false;
        state.productList = action.payload.data; // 👈 key line from the video
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default adminProductsSlice.reducer;
