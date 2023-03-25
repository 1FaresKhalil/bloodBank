import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  email: null,
  name: null,
  userID: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      // console.log(action.payload);
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.userID = action.payload.userID;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
