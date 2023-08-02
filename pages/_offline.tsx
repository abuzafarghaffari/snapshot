
import FormHeader from '@/components/Form/FormHeader';

import { Box, Typography } from '@mui/material';
import React from 'react'

const offline = () => {
  return (
    <>
    <FormHeader />
    <Box>
        <Typography variant='h3'>
You are offline
        </Typography>
    </Box>
    </>
  )
}

export default offline;