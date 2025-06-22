import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const initialState = {
    socket:null,
    onlineUsers:null
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    initilizeSocket: (state, action) => {
      const socket = io(import.meta.env.VITE_DB_Url,{
        query:{
          userId:action.payload
        }
      });
      state.socket = socket;
   
    },
    setOnlineUsers:(state,action)=>{
      state.onlineUsers = action.payload
    }
  },
});

export const { initilizeSocket, setOnlineUsers} = socketSlice.actions;
export default socketSlice.reducer;
