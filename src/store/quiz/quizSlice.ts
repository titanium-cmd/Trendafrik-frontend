import { createSlice } from '@reduxjs/toolkit';
import { Question } from 'src/models/quiz';
import { QuizState } from 'src/models/store';
import { asyncIsPending, asyncIsRejected } from '../asyncConfig';
import { getAllQuestions, getAllResults, saveQuizResult } from './quizService';

const initialState: QuizState = {
  message: '',
  questions: [],
  mark: 0,
  results: [],
  status: null,
}

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    clearQuizState: (state) => {
      state.status = null;
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllQuestions.pending, asyncIsPending)
    builder.addCase(getAllQuestions.rejected, asyncIsRejected)
    builder.addCase(getAllQuestions.fulfilled, (state, action) => {
      state.status = null;
      state.questions = action.payload.questions.map((question: Question) => ({
        ...question,
        selected_answer: '',
      }));
    })
    builder.addCase(getAllResults.pending, asyncIsPending)
    builder.addCase(getAllResults.rejected, asyncIsRejected)
    builder.addCase(getAllResults.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.results = action.payload.results;
    })
    builder.addCase(saveQuizResult.pending, asyncIsPending)
    builder.addCase(saveQuizResult.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.message = action.payload.message;
      state.mark = action.payload.score;
    })
    builder.addCase(saveQuizResult.rejected, asyncIsRejected)
  }
});

export const { clearQuizState } = quizSlice.actions;
export default quizSlice.reducer;