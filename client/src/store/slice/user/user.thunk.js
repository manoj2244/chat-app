// src/redux/thunks/userThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../components/utilities/axiosInstance"; // your Axios instance
import toast from "react-hot-toast";

export const loginUserThunk = createAsyncThunk(
  "user/loginUserThunk",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/login", {
        username,
        password,
      });
      toast.success("Login Sucessfully");

      // this returen returns to the login thunk in fulfilled status otherwise show undefined
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message);
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);
export const registerUserThunk = createAsyncThunk(
  "user/registerUserThunk",
  async ({ username, password, fullName, gender }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/register", {
       username, password, fullName, gender
      });
      toast.success("Account Created Sucessfully");

      // this returen returns to the login thunk in fulfilled status otherwise show undefined
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message);
      return rejectWithValue(err.response?.data?.message || "Register failed");
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "user/logoutUserThunk",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/logout");
      toast.success("Logout Sucessfully!!");

      // this returen returns to the login thunk in fulfilled status otherwise show undefined
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message);
      return rejectWithValue(err.response?.data?.message || "logout failed");
    }
  }
);

export const getUserProfileThunk = createAsyncThunk(
  "user/getUserProfileThunk",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/user/get-profile");
    

      // this returen returns to the login thunk in fulfilled status otherwise show undefined
      return res.data;
    } catch (err) {

      return rejectWithValue(err.response?.data?.message || "logout failed");
    }
  }
);
export const getOtherUsers = createAsyncThunk(
  "user/getOtherUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/user/get-other-users");
    

      // this returen returns to the login thunk in fulfilled status otherwise show undefined
      return res.data;
    } catch (err) {

      return rejectWithValue(err.response?.data?.message || "logout failed");
    }
  }
);
