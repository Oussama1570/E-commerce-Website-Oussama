import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000"; // or import.meta.env.VITE_API_URL

const initialState = {
  productList: [],
  isLoading: false,
};

/* Add product */
export const addNewProduct = createAsyncThunk(
  "products/addNew",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API}/api/admin/products/add`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || { success: false });
    }
  }
);

/* Fetch all */
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/api/admin/products/get`);
      return data; // { success, data: [...] }
    } catch (err) {
      return rejectWithValue(err?.response?.data || { success: false });
    }
  }
);

/* Edit */
export const editProduct = createAsyncThunk(
  "products/edit",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${API}/api/admin/products/edit/${id}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || { success: false });
    }
  }
);

/* Delete — FIXED */
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${API}/api/admin/products/delete/${id}`
      );
      return data; // { success: true, message: ... }
    } catch (err) {
      return rejectWithValue(err?.response?.data || { success: false });
    }
  }
);

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
        state.isLoading = false;
        state.productList = action.payload?.data || [];
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default adminProductsSlice.reducer;
