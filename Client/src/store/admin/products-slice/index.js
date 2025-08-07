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
            "Content-Type" : "application/json",
        },
      }
    );
    return result?.data;
  }
);


export const fetchAllProducts = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:5000/api/admin/products/get", 
      
    );
    return result?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editproduct",
  async (id, formData) => {
    const result = await axios.post(
      "http://localhost:5000/api/admin/products/add", 
      formData,
      {
        headers: {
            "Content-Type" : "application/json",
        },
      }
    );
    return result?.data;
  }
);

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:5000/api/admin/products/add", 
      formData,
      {
        headers: {
            "Content-Type" : "application/json",
        },
      }
    );
    return result?.data;
  }
);

// ✅ Create slice
const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addNewProduct.fulfilled, (state, action) => {
      state.productList.push(action.payload);
    });
  },
});

export default AdminProductsSlice.reducer;
