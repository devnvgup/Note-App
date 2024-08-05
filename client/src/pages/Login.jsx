import React from 'react'
import {Button, Typography} from '@mui/material'
function Login() {
  return (
    <div>
      <Typography variant='h5' sx={{marginBottom:'10px'}}>Welcome to Note App</Typography>
      <Button variant='outlined'>
        Login With Google
      </Button>
    </div>
  )
}

export default Login
