import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: false,
  role: "",
  email: "",
 tok:'',
 code:''
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("state issued");
      
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
  },
});


// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
