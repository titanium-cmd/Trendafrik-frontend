import { LoadingButton } from '@mui/lab';
import { Box, Link, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React, { FormEvent } from 'react';
import { AsyncState } from 'src/models/store';
import { User } from 'src/models/user';

interface CreateAccountFormProps {
  info: User,
  status: AsyncState
  onSubmit: (e: FormEvent) => void
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const CreateAccountForm: React.FC<CreateAccountFormProps> = ({ onChange, info, onSubmit, status }) => {
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
        <Typography component="h1" variant="h1">
          Create Account
        </Typography>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            value={info.username}
            fullWidth
            name='username'
            onChange={onChange}
            label="Full Name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            value={info.email_address}
            fullWidth
            name='email_address'
            onChange={onChange}
            label="Email Address"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={info.password}
            onChange={onChange}
            name="password"
            label="Password"
            type="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={info.confirm_password}
            onChange={onChange}
            name="confirm_password"
            label="Confirm Password"
            type="password"
          />
          <LoadingButton
            type="submit"
            fullWidth
            loading={status === 'pending'}
            loadingPosition="start"
            variant="contained"
            sx={{ mt: 3, mb: 2, p: 1.3 }}
          >
            CREATE ACCOUNT
          </LoadingButton>
        </Box>
        <Typography color={'GrayText'} align='center' mt={1}>
          Already have account?
          <Link ml={0.5} href="/auth/login" fontWeight={600} underline="none" variant="body2">
            login
          </Link>
        </Typography>
      </Box>
    </motion.div>
  )
}

export default CreateAccountForm
