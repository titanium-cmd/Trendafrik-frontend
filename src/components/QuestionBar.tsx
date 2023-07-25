import { Box } from '@mui/material'
import React from 'react'

interface QuestionBarProps {
  isActive: boolean
}

const QuestionBar: React.FC<QuestionBarProps> = ({ isActive }) => {
  return (
    <Box bgcolor={isActive ? '#5732F8' : 'rgba(191, 191, 191, 0.5)'} height={'3px'} width={'50px'}></Box>
  )
}

export default QuestionBar
