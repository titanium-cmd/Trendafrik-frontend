import { LoadingButton } from '@mui/lab';
import { Box, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React, { ChangeEvent, FormEvent } from 'react';
import { AsyncState } from 'src/models/store';
import { UserCredentials } from 'src/models/user';

interface LoginFormProps {
  onSubmit: (e: FormEvent) => void
  credentials: UserCredentials,
  onForgetPassword: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  status: AsyncState
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, credentials, onChange, status, onForgetPassword }) => {
  return (
    <motion.div
      key={'loginForm'}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <br />
        <br />
        <br />
        <Typography variant="h1">
          Hi, Welcome back!
        </Typography>
        <Typography color={'GrayText'}>
          Enter you credentials to access a wide range of questions
        </Typography>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            value={credentials.email_address}
            fullWidth
            label="Email Address"
            name='email_address'
            onChange={onChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            value={credentials.password}
            onChange={onChange}
            name="password"
            type="password"
          />
          <Grid my={1} component={'div'} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={<Typography variant="body2" style={{
                fontWeight: 500
              }} color='GrayText'>Remember Me</Typography>}
            />
            <Typography component={'p'}>
              <Link href="/forget-password" underline="none" fontWeight={'600'} variant="body2">
                Forgot password?
              </Link>
            </Typography>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            color='primary'
            loading={status === 'pending'}
            loadingPosition="start"
            variant="contained"
            sx={{ p: 1.3 }}
          >
            LOGIN
          </LoadingButton>
        </Box>
        <Typography color={'GrayText'} align='center' mt={2}>
          Don't have an account?
          <Link ml={0.5} href="/auth/create-account" fontWeight={600} underline="none" variant="body2">
            Register
          </Link>
        </Typography>
      </Box>
    </motion.div>
  )
}

export default LoginForm
