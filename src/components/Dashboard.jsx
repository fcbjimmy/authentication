import React from 'react';
import { Button } from '@mui/material';
import { useUserContext } from '../context/userContext';

function Dashboard() {
  const { user, signOutUser } = useUserContext();

  return (
    <>
      <div>Welcome! {user.displayName}</div>
      <Button variant='contained' onClick={signOutUser}>
        Log out
      </Button>
    </>
  );
}

export default Dashboard;
