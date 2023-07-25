import { TimeStamp } from "./common";

export interface Question extends TimeStamp {
  question_title: string,
  correct_answer: string,
  selected_answer: string,
  possible_answers: string[],
}

export interface QuizResults extends TimeStamp {
  questions: readonly Question[]
  mark?: number,
}