import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
export const API_URL = "http://localhost:5000/user";
interface auth {
  signinUp: boolean;
  signinIn: boolean;
  token: any;
  userId: any;
  error: any;
}

const initialState: auth = {
  signinUp: false,
  signinIn: false,
  error: null,
  token: localStorage.getItem("token"),
  userId: localStorage.getItem("userId"),
};

export type dataReg = {
  email: string;
  password: string;
  male: boolean;
  nickName: string;
  brithDay: string;
};

export const authSingUp = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const token = await res.json();

      if (token.error) {
        return thunkAPI.rejectWithValue(token.error);
      }

      if (res.status === 200) {

        //@ts-ignore
        data.navigate("/signIn");
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const authSingIn = createAsyncThunk(
  "auth/signin",
  async (data, thunkAPI) => {
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const token = await res.json();

      if (token.error) {
        return thunkAPI.rejectWithValue(token.error);
      }
      localStorage.setItem("userId", token._id);
      localStorage.setItem("token", token.token);
      window.location.reload();
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authSingUp.pending, (state) => {
      state.signinUp = true;
      state.error = null;
    });
    builder.addCase(authSingUp.rejected, (state, action) => {
      state.signinUp = false;
      state.error = action.payload;
    });
    builder.addCase(authSingUp.fulfilled, (state, action) => {
      state.signinUp = false;
      state.error = null;
      state.token = action.payload;
    });
    builder.addCase(authSingIn.pending, (state, action) => {
      state.signinIn = true;
      state.error = null;
    });
    builder.addCase(authSingIn.rejected, (state, action) => {
      state.signinIn = false;
      state.error = action.payload;
    });
    builder.addCase(authSingIn.fulfilled, (state, action) => {
      state.signinIn = false;
      state.error = null;
      state.token = action.payload;
    });
  },
});

export const authSelector = (state: RootState) => state.auth.error;
export const userId = (state: RootState) => state.auth.userId;
export const tokenus = (state: RootState) => state.auth.token;

export const {} = authSlice.actions;

export default authSlice.reducer;
