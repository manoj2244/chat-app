// src/redux/thunks/userThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../components/utilities/axiosInstance"; // your Axios instance
import toast from "react-hot-toast";

export const sendMessageThunk = createAsyncThunk(
  "message/sendMessageThunk",
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {

        
      const res = await axiosInstance.post(`message/send/${receiverId}`, {
     message
      });

      // this returen returns to the login thunk in fulfilled status otherwise show undefined
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message);
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const getMessageThunk = createAsyncThunk(
  "message/getMessageThunk",
  async (receiverId, { rejectWithValue }) => {
    try {
        
        
      const res = await axiosInstance.get(`/message/get-message/${receiverId}`);

      // this returen returns to the login thunk in fulfilled status otherwise show undefined
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);
