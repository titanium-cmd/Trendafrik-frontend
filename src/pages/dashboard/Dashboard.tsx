import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { notify } from 'reapop'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { getUser } from 'src/store/asyncConfig'
import { clearAuthState, clearUser } from 'src/store/auth/authSlice'
import SidebarLink from './SidebarLink'
import { Grid } from '@mui/material'

const Dashboard: React.FC = () => {
  const location = useLocation();
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (user) {
      if (location.pathname === '/') {
        navigator('/users')
      } else {
        navigator(location.pathname);
      }
    } else {
      navigator('/auth/login');
    }
    // eslint-disable-next-line
  }, [location.pathname, user]);

  return (
    <Grid container xs={12}>
      <Grid item md={2}>

      </Grid>
      <Grid item md={10} xs={12}>

      </Grid>
    </Grid>
  )
}

export default Dashboard
