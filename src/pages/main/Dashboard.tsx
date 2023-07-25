import NewQuizIcon from '@mui/icons-material/Quiz'
import { Button, CircularProgress, Grid, Paper } from '@mui/material'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import CustomizedTable from 'src/components/Table'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { QuizResults } from 'src/models/quiz'
import { getUser } from 'src/store/asyncConfig'
import { getAllResults } from 'src/store/quiz/quizService'

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const [userQuizResults, setUserQuizResults] = useState<QuizResults[]>([])
  const { user } = useAppSelector((state) => state.auth);
  const { results, status} = useAppSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(getAllResults());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const _results = results.map((result) => ({ ...result, createdAt: moment(result.createdAt).format('LLL') }) as QuizResults);
    setUserQuizResults(_results)
  }, [results]);

  useEffect(() => {
    const user = getUser();
    if (user) {
      if (location.pathname === '/') {
        navigator('/')
      } else {
        navigator(location.pathname);
      }
    } else {
      navigator('/auth/login');
    }
    // eslint-disable-next-line
  }, [location.pathname, user]);

  return (
    <Grid container xs={12} bgcolor={'InfoBackground'} height={'100vh'} width={'100%'}>
      <Grid>

      </Grid>
      <Grid item display={'flex'} justifyContent={'center'} alignContent={'center'} xs={12} sx={{ p: { xs: 3, sm: 8, md: 8, lg: 10 } }}>
        <Paper
          elevation={3}
          style={{ padding: 15, width: '100%' }}
        >
          <Button
            sx={{
              mt: { xs: 2, sm: 0 },
              mb: { xs: 1 }
            }}
            onClick={() => navigator('new')}
            variant="contained"
            startIcon={<NewQuizIcon fontSize="small" />}
          >
            {('Try New Quiz')}
          </Button>
          {status === 'pending' ? <Grid container justifyContent="center" alignItems="center">
            <Grid item>
              <CircularProgress size={64} disableShrink thickness={3} />
            </Grid>
          </Grid> : <CustomizedTable
            tableCells={[
              { key: "score", label: 'Mark Scored' },
              { key: "createdAt", label: 'Date Taken' },
            ]}
            data={userQuizResults}
          />}
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Dashboard
