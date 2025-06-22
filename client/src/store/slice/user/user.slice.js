import { createSlice } from "@reduxjs/toolkit";
import { getOtherUsers, getUserProfileThunk, loginUserThunk, logoutUserThunk, registerUserThunk } from "./user.thunk";

const initialState = {
  isAuthenticated: false,
  userProfile: null,
  buttonLoading: false,
  screenLoading: true,
  otherUsers:null,
  selectedUser:JSON.parse(localStorage.getItem("setSelectedUser"))
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {

      localStorage.setItem("setSelectedUser",JSON.stringify(action.payload))
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {

    // login thunk
    builder.addCase(loginUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload.data;
      state.buttonLoading = false;
      state.isAuthenticated=true;

      console.log(action.payload, "SDGSDGDFGDS");
    });
    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    // Register thunk

    builder.addCase(registerUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.userProfile = action.payload.data;
      state.buttonLoading = false;
            state.isAuthenticated=true;


      console.log(action.payload, "SDGSDGDFGDS");
    });
    builder.addCase(registerUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

    // logout thunk
      builder.addCase(logoutUserThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      state.userProfile = null;
      state.buttonLoading = false;
      state.isAuthenticated=false
      state.selectedUser=null,
      state.otherUsers=null,
      state.userProfile=null,
      localStorage.clear()

    });
    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

       // get profile thunk
      builder.addCase(getUserProfileThunk.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.userProfile = action?.payload?.data;
      state.screenLoading = false;
      state.isAuthenticated=true

      console.log(action.payload);
      

    });
    builder.addCase(getUserProfileThunk.rejected, (state, action) => {
      state.screenLoading = false;
    });

       // get other users thunk
      builder.addCase(getOtherUsers.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(getOtherUsers.fulfilled, (state, action) => {
      state.otherUsers = action?.payload?.data;
      state.screenLoading = false;
      state.isAuthenticated=true
     
      

    });
    builder.addCase(getOtherUsers.rejected, (state, action) => {
      state.screenLoading = false;
    });
  },
});

export const { setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
