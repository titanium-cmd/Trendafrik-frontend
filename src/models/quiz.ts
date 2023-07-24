import { TimeStamp } from "./common";

export interface Question extends TimeStamp {
  questionTitle: string,
  correctAnswer: string,
  possibleAnswers: [string],
}

export interface QuizResults extends TimeStamp {
  questions: readonly [Question]
  mark?: number,
}