import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 🔒 Initial State
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

// ✅ REGISTER USER
export const registerUser = createAsyncThunk("/auth/register", async (formData) => {
  const response = await axios.post("http://localhost:5000/api/auth/register", formData, {
    withCredentials: true,
  });
  return response.data;
});



// ✅ LOGIN USER
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post("http://localhost:5000/api/auth/login", formData, {
    withCredentials: true,
  });
  return response.data;
});

export const checkAuth = createAsyncThunk(
  "/auth/checkauth",

  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/auth/check-auth",
      {
        withCredentials: true,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );

    return response.data;
  }
);


// 🔧 AUTH SLICE
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  setUser: (state, action) => {
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  logoutUser: (state) => {
    state.user = null;
    state.isAuthenticated = false;
  },
},

  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null; // No auto-login on register
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
  state.isLoading = false;
  if (action.payload && action.payload.success) {
    state.user = action.payload.user;
    state.isAuthenticated = true;
  } else {
    state.user = null;
    state.isAuthenticated = false;
  }
})

      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;

