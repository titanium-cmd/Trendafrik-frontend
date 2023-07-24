import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import axios from '../axios';
import { QuizResults } from "src/models/quiz";

export const saveQuizResult = createAsyncThunk(
  'quiz/saveQuizResult',
  async (result: QuizResults, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.post('/quiz/results', result);
      return fulfillWithValue(data);
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getAllQuestions = createAsyncThunk(
  'quiz/getQuestions',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get('/quiz/questions');
      return fulfillWithValue(data);
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getAllResults = createAsyncThunk(
  'quiz/getAllResults',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get('/quiz/questions');
      return fulfillWithValue(data);
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);