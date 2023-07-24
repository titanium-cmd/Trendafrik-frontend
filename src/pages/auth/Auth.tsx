import { Grid, Hidden, Typography, styled } from "@mui/material";
import { Outlet } from "react-router";

const CustomGrid = styled(Grid)(({ theme }) => ({
  height: '100vh',
}));


const ColoredCard = styled(Grid)(({ theme }) => ({
  backgroundImage: 'url(/auth_bg.png)',
  padding: theme.spacing(2),
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  margin: theme.spacing(2),
  borderRadius: '20px',
  width: '100%',
}));

const Auth: React.FC = () => {
  return (
    <Grid container xs={12} height={'100vh'}>
      <Hidden smDown>
        <CustomGrid container item md={3} lg={8}>
          <ColoredCard item>
            <Typography variant="h4" color={'white'} component="h1" gutterBottom>
              QUIZZY
            </Typography>
          </ColoredCard>
        </CustomGrid>
      </Hidden>
      <Grid item md={9} lg={4}>
        <Outlet />
      </Grid>
    </Grid>
  )
}

export default Auth
