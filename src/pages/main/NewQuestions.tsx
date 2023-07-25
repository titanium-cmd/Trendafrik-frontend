import { Box, Button, Grid, Paper, RadioGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import OptionBox from 'src/components/OptionBox';
import QuestionBar from 'src/components/QuestionBar';
import { Question } from 'src/models/quiz';

const NewQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      questionTitle: 'How is the color of the book', correctAnswer: 'Red', selectedAnswer: '', possibleAnswers: ['Red', 'Blue', 'Green']
    },
    {
      questionTitle: 'Why are you so annoying', correctAnswer: 'Nothing', selectedAnswer: '', possibleAnswers: ['Nothing', 'No reason', 'Eat']
    },
    {
      questionTitle: 'What makes you happy?', correctAnswer: 'Food', selectedAnswer: '', possibleAnswers: ['Food', 'Showing love', 'Being good']
    },
    {
      questionTitle: 'How many years of experience do you have?', correctAnswer: '3', selectedAnswer: '', possibleAnswers: ['5', '20', '3']
    },
    {
      questionTitle: 'How come you dont look sad nor happy?', correctAnswer: 'Am a trader', selectedAnswer: '', possibleAnswers: ['Am a trader', 'Am broken', 'Other']
    },
    {
      questionTitle: 'You have to keep the faith, not just in you about everyone', correctAnswer: 'Not Easy', selectedAnswer: '', possibleAnswers: ['Not Easy', "Depends"]
    },
    {
      questionTitle: 'What is your fav song and why?', correctAnswer: 'Aseda', selectedAnswer: '', possibleAnswers: ['Zongo', 'Aseda']
    },
    {
      questionTitle: '____________________?', correctAnswer: '', selectedAnswer: '', possibleAnswers: ['']
    },
    {
      questionTitle: '____________________?', correctAnswer: '', selectedAnswer: '', possibleAnswers: ['']
    },
    {
      questionTitle: '____________________?', correctAnswer: '', selectedAnswer: '', possibleAnswers: ['']
    }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
            disabled={currentQuestionIndex === 0}
            onClick={() => {
              if (currentQuestionIndex > 0) {
                setCurrentQuestionIndex((preValue) => preValue - 1);
              }
            }}>
            Previous
          </Button>
          <Button
            disabled={currentQuestionIndex >= questions.length - 1}
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
