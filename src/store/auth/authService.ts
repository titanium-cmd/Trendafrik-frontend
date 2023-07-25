import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { User, UserCredentials } from "src/models/user";
import axios from '../axios';
import { clearUser, setUser } from "./authSlice";

export const createUserAccount = createAsyncThunk(
  'auth/createAccount',
  async (details: User, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users', details);
      return fulfillWithValue(data);
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateUserAccount = createAsyncThunk(
  'auth/updateAccount',
  async (details: User, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.put('/users', details);
      dispatch(setUser(data.data));
      return fulfillWithValue(data);
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const userPasswordReset = createAsyncThunk(
  'auth/userPasswordReset',
  async ({ password, email }: { password: string, email: string }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.post('/agent/change-password', { password, email }, {
        headers: { "Content-type": "application/json" }
      });
      return fulfillWithValue({ ...data, stage: 'change-password' });
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/login',
  async (credentials: UserCredentials, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post('/users/login', credentials);
      dispatch(setUser(data));
      return fulfillWithValue(data);
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const userLogout = createAsyncThunk(
  'auth/logout',
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      dispatch(clearUser())
      return fulfillWithValue({ success: true, message: 'Logged out successful' });
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);