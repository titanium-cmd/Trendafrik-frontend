import NewQuizIcon from '@mui/icons-material/Quiz'
import { Button, Grid, Paper } from '@mui/material'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import CustomizedTable from 'src/components/Table'
import { useAppSelector } from 'src/hooks/redux'
import { getUser } from 'src/store/asyncConfig'

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigator = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

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
      <Grid item xs={12} p={10}>
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
          <CustomizedTable
            tableCells={[
              { key: "mark", label: 'Mark Scored' },
              { key: "mark", label: 'Answered On' },
            ]}
            data={[]}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Dashboard
