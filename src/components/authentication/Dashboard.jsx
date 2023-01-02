import React, { useEffect, useState } from 'react';
import TodoApp from '../todoapp/TodoApp';
import { Button, Typography, Box, InputAdornment } from '@mui/material';
import { useUserContext } from '../../context/userContext';
import '../../App.css';
import Clock from '../clock/Clock';
import Welcome from './Welcome';

function Dashboard() {
  const { user, signOutUser } = useUserContext();

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Welcome />
        <Button
          variant='contained'
          style={{ position: 'absolute', top: '0', right: '0' }}
          onClick={signOutUser}
        >
          Log out
        </Button>
      </Box>
      <TodoApp />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
        <Clock />
      </Box>
    </>
  );
}

export default Dashboard;
