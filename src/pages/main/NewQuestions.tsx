import { Box, Button, Grid, Paper, RadioGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { notify } from 'reapop';
import OptionBox from 'src/components/OptionBox';
import QuestionBar from 'src/components/QuestionBar';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { Question, QuizResults } from 'src/models/quiz';
import { saveQuizResult } from 'src/store/quiz/quizService';
import { clearQuizState } from 'src/store/quiz/quizSlice';

const NewQuestions: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, message } = useAppSelector((state) => state.quiz)
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (status === 'rejected') {
      dispatch(notify(message, 'error'))
    } else if (status === 'fulfilled') {
      dispatch(notify(message, 'success'))
      dispatch(clearQuizState());
      setTimeout(() => {
        navigate('/')
      }, 300);
    }
    // eslint-disable-next-line
  }, [status])

  return (
    <Grid display={'flex'} px={10} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} height={'100vh'} width={'100%'}>
      <Paper elevation={3} style={{ width: '50%', padding: '40px' }}>
        <Box width={'100%'} height={'30px'} display={'flex'} justifyContent={'space-between'}>
          {questions.map((_, index) =>
            <QuestionBar isActive={index === currentQuestionIndex} />
          )}
        </Box>
        <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
          {questions.map((question, index) =>
            (index === currentQuestionIndex) ? <>
              <br />
              <br />
              <Typography align='center' fontWeight={'600'} color={'primary'}>
                Question {index + 1}/{questions.length}
              </Typography>
              <Typography textAlign={'center'} variant='h1'>{question.questionTitle}</Typography>
              <br />
              <br />
              <RadioGroup
                name="options"
                value={question.selectedAnswer}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index].selectedAnswer = e.target.value;
                  setQuestions(newQuestions);
                }}
              >
                {question.possibleAnswers.map(opt => <OptionBox value={opt} />)}
              </RadioGroup>
            </> : <></>
          )}
        </Box>
        <Box display={'flex'} width={'100%'} justifyContent={'space-between'} alignItems={'center'}>
          <Button
            disabled={currentQuestionIndex === 0 || status === 'pending'}
            onClick={() => {
              if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex((preValue) => preValue - 1);
              } else {
                const result = { questions } as QuizResults;
                dispatch(saveQuizResult(result));
              }
            }}>
            Previous
          </Button>
          <Button
            disabled={(currentQuestionIndex >= questions.length - 1) || status === 'pending'}
            onClick={() => {
              if (currentQuestionIndex <= questions.length) {
                setCurrentQuestionIndex((preValue) => preValue + 1);
              }
            }}>
            Next
          </Button>
        </Box>
      </Paper>
    </Grid>
  )
}

export default NewQuestions
