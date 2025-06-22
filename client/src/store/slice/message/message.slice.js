import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "./message.thunk";

const initialState = {
 
  buttonLoading: false,
  messages:[],
  screenLoading:true


};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
   setNewMessage:(state,action)=>{
    const oldMessage = state.messages??[];
    state.messages=[...oldMessage,action.payload]
   }
  },
  extraReducers: (builder) => {

    // send message thunk
    builder.addCase(sendMessageThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
       const newMsg = action.payload.data;
  state.messages = [...(state.messages ?? []), newMsg];
  state.buttonLoading = false;

      console.log(action.payload, "SDGSDGDFGDS");
    });
    builder.addCase(sendMessageThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });

     // get message thunk
    builder.addCase(getMessageThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(getMessageThunk.fulfilled, (state, action) => {
      state.messages = action.payload.data?.messages;
      state.buttonLoading = false;

      console.log(action.payload, "mmmmmmm");
    });
    builder.addCase(getMessageThunk.rejected, (state, action) => {
      state.buttonLoading = false;
    });


    
  },
});

export const { setNewMessage } = messageSlice.actions;
export default messageSlice.reducer;
