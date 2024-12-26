import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: false,
  role: "",
  email: "",
  tok: "",
  code: "",
  sidebarExpanded: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.auth = true;
      state.tok = action.payload.token;
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.email = action.payload.email;
      state.code = action.payload.code;
    },
    logout: (state) => {
      state.auth = false;
      // console.log("logged out");
      state.tok = "";
      state.role = "";
      state.email = "";
      state.code = "";
    },
    toggleSidebar: (state, action) => {
      state.sidebarExpanded = !state.sidebarExpanded;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, toggleSidebar } = userSlice.actions;

export default userSlice.reducer;
