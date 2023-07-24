import { Question, QuizResults } from "./quiz";
import { User } from "./user";

export type AsyncState = 'fulfilled' | 'rejected' | 'pending' | null;

export interface BaseState {
  status: AsyncState,
  message: string,
  stage?: any;
}

export interface AuthState extends BaseState {
  user: User | null,
}

export interface QuizState extends BaseState {
  questions: [Question] | [],
  results: QuizResults | [],
  mark: number
}
