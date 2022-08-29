import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { toast } from "materialize-css";

type userItem = {
  email: string;
  _id: string;
  brithDay: string;
  img: string;
  male: Boolean;
  nickName: string;
};
export enum Status {
  LOADING = "loading",
  SUCCES = "succes",
  ERROR = "rejected",
}
interface userSliceState {
  items: userItem[];
  item: userItem | null;
  status: Status;
}
const initialState: userSliceState = {
  items: [],
  item: null,
  status: Status.LOADING,
};
export const userFetch = createAsyncThunk<userItem[]>(
  "user/fetchUsersStatus",
  async () => {
    const { data } = await axios.get<userItem[]>(
      `http://localhost:5000/user/users`
    );

    return data;
  }
);
export const addImage = createAsyncThunk(
  "add/image",
  //@ts-ignore
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      //@ts-ignore
      formData.append("avatar", data.file);
      //@ts-ignore
      const res = await fetch( `http://localhost:5000/user/img/${data.usersId}`,
        {
          method: "PATCH",
          headers: {
            //@ts-ignore
            authorization: `Bearer ${data.token}`,
          },
          body: formData,
        }
      );
            //@ts-ignore
      const json = await res.json();

      if (json.error) {
        return thunkAPI.rejectWithValue(json.error);
      }
      return json;
    } catch (e) {
      toast({html: "Размер или формат не верны", classes: "error"})
    }
  }
);
export const getUserById = createAsyncThunk(
  "idUser/get",
  //@ts-ignore
  async (data, thunkAPI) => {
    try {
      //@ts-ignore
      const user = await fetch(`http://localhost:5000/user/user/${data.user}`, {
        headers: {
          "Content-Type": "application/json",
          //@ts-ignore
          Authorization: `Bearer ${data.token}`,
        },
      });
      const dates = user.json();
          //@ts-ignore
      console.log(data);
      
      return dates;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);
export const changePassNick = createAsyncThunk(
  "change/passNick",
  async (data, thunkAPI) => {
    try {
      
      //@ts-ignore
      const res = await fetch(`http://localhost:5000/user/pass/${data.usersId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
      //@ts-ignore
          Authorization: `Bearer ${data.token}`,
        },
      //@ts-ignore
        body: JSON.stringify(data),
      });
   
      const json = await res.json();
     

      return json 
    } catch (e) {
      toast({html: "Пароль введен не правильно", classes: "error"})
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userFetch.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(userFetch.fulfilled, (state, action) => {
      state.status = Status.SUCCES;
      state.items = action.payload;
    });
    builder.addCase(userFetch.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
    builder.addCase(addImage.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(addImage.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
    builder.addCase(addImage.fulfilled, (state, action) => {
      state.status = Status.SUCCES;
      //@ts-ignore
      state.items = [state.item, action.payload];
    });
    builder.addCase(getUserById.fulfilled, (state, action: any) => {
      state.status = Status.SUCCES;
      state.item = action.payload;
    });
    builder.addCase(getUserById.pending, (state, action: any) => {
      state.status = Status.LOADING;
      state.item = null;
    });
    builder.addCase(getUserById.rejected, (state, action: any) => {
      state.status = Status.ERROR;
      state.item = null;
    });
    builder.addCase(changePassNick.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(changePassNick.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
    builder.addCase(changePassNick.fulfilled, (state, action) => {
      state.status = Status.SUCCES;
      //@ts-ignore
      state.items = [state.item, action.payload];
    });
  },
});
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserItems = (state: RootState) => state.user.items;

export const { setItems } = userSlice.actions;

export default userSlice.reducer;

// для getFindByIdUser

// const res = await fetch(`http://localhost:5000/user/users${id}`, {
//   headers: {
//     authorization: `Bearer ${thunkAPI.getState().auth.token}`
//   }
// })
