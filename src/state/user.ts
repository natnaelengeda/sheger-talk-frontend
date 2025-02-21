
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  userId: string;
  socketId: string;
  isLoggedIn: boolean;
}

export const initialState: UserState = {
  userId: "",
  socketId: "",
  isLoggedIn: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.userId = action.payload.userId;
      state.socketId = action.payload.socketId;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.userId = "";
      state.socketId = "";
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user;
export default userSlice.reducer;
