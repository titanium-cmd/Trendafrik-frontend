import { Grid } from '@mui/material'
import React from 'react'
import { UserCredentials } from 'src/models/user'

interface ForgetPasswordModalBodyProps {
  info: UserCredentials,
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const ForgetPasswordModalBody: React.FC<ForgetPasswordModalBodyProps> = ({onChange, info}) => {
  return (
    <Grid>
      
    </Grid>
  )
}

export default ForgetPasswordModalBody
