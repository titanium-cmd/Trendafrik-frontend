import { Box, FormControlLabel, Radio } from '@mui/material'
import React from 'react'

interface OptionBoxProp {
  value: string,
}

const OptionBox: React.FC<OptionBoxProp> = ({ value }) => {
  return (
    <Box display={'flex'} style={{ cursor: 'pointer' }} maxWidth={'400px'} alignItems={'center'} bgcolor={'rgba(191, 191, 191, 0.2)'} px={2} py={1} my={1}>
      <FormControlLabel
        key={value}
        value={value}
        control={<Radio />}
        label={value}
      />
    </Box>
  )
}

export default OptionBox
