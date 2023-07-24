import { configureStore } from '@reduxjs/toolkit'
import { reducer as notificationsReducer } from 'reapop'
import authSlice from './auth/authSlice'
import quizSlice from './quiz/quizSlice'

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer(),
    auth: authSlice,
    quiz: quizSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch