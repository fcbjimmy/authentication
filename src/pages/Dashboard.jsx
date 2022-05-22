import React from 'react';
import TodoApp from '../components/TodoApp/TodoApp';
import { Button, Typography, Box, InputAdornment } from '@mui/material';
import { useUserContext } from '../context/userContext';
import '../App.css';
import { top } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import Clock from '../components/Clock/Clock';

function Dashboard() {
  const { user, signOutUser } = useUserContext();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
        }}
      >
        <Typography>{''}</Typography>
        <Typography sx={{ ml: 10 }}>Welcome! {user.displayName}</Typography>
        <Button variant='contained' onClick={signOutUser}>
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
