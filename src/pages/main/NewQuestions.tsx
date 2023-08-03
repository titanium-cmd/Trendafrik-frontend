import { Box, Button, CircularProgress, Grid, Paper, RadioGroup, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { notify } from 'reapop';
import CustomDialog from 'src/components/CustomDialog';
import OptionBox from 'src/components/OptionBox';
import QuestionBar from 'src/components/QuestionBar';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { Question, QuizResults } from 'src/models/quiz';
import { getAllQuestions, saveQuizResult } from 'src/store/quiz/quizService';
import { clearQuizState } from 'src/store/quiz/quizSlice';

const NewQuestions: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, message, questions, mark } = useAppSelector((state) => state.quiz)
  const [systemQuestions, setSystemQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  const paperWidth = isSmallScreen
    ? '100%' // Width for small screens
    : isMediumScreen
      ? '80%' // Width for medium screens
      : '80%'; // Default width for larger screens

  const styles = {
    paper: {
      width: paperWidth,
      padding: 20,
      margin: '0 auto', // Centers the paper horizontally
    },
  };

  useEffect(() => {
    dispatch(getAllQuestions());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (questions && questions.length > 0) {
      setSystemQuestions([...questions]);
    }
  }, [questions]);

  useEffect(() => {
    if (status === 'rejected') {
      dispatch(notify(message, 'error'))
    } else if (status === 'fulfilled') {
      dispatch(notify(message, 'success'))
      setShowSuccessDialog(true);
      dispatch(clearQuizState());
    }
    // eslint-disable-next-line
  }, [status])

  return (
    <>
      <CustomDialog
        open={showSuccessDialog}
        body={<>
          <Typography>Quiz has been submitted. Your score is {mark}.</Typography>
        </>}
        onProceed={() => navigate('/')}
        onClose={() => setShowSuccessDialog(false)}
      />
      <Grid display={'flex'} sx={{ p: { xs: 5, sm: 8, md: 8, lg: 10 } }} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} height={'100vh'} width={'100%'}>
        <Paper elevation={3} style={styles.paper}>
          {status === 'pending' ? <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <CircularProgress size={64} disableShrink thickness={3} />
            </Grid>
          </Grid> :
            <>
              <Box width={'100%'} height={'30px'} display={'flex'} justifyContent={'space-between'}>
                {systemQuestions.map((_, index) =>
                  <QuestionBar isActive={index === currentQuestionIndex} />
                )}
              </Box>
              <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                {systemQuestions.map((question, index) =>
                  (index === currentQuestionIndex) ? <>
                    <br />
                    <br />
                    <Typography align='center' fontWeight={'600'} color={'primary'}>
                      Question {index + 1}/{systemQuestions.length}
                    </Typography>
                    <Typography textAlign={'center'} variant='h1'>{question.question_title}</Typography>
                    <br />
                    <br />
                    <RadioGroup
                      name="options"
                      value={question.selected_answer}
                      onChange={(e) => {
                        const updatedQuestions = systemQuestions.map((question, i) => {
                          if (i === index) {
                            return { ...question, selected_answer: e.target.value };
                          }
                          return question;
                        });
                        setSystemQuestions(updatedQuestions);
                      }}
                    >
                      {question.possible_answers.map(opt => <OptionBox value={opt} />)}
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
                  onClick={() => {
                    if (currentQuestionIndex < systemQuestions.length - 1) {
                      setCurrentQuestionIndex((preValue) => preValue + 1);
                    } else {
                      const unAnswered = systemQuestions.filter(question => question.selected_answer === '')[0];
                      if (unAnswered) {
                        return dispatch(notify('Please make sure all questions are answered', 'error'));
                      }
                      const result = { questions: systemQuestions } as QuizResults;
                      dispatch(saveQuizResult(result));
                    }
                  }}>
                  {currentQuestionIndex === systemQuestions.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </Box>
            </>
          }
        </Paper>
      </Grid>
    </>
  )
}

export default NewQuestions
