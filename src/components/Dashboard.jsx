import React from 'react';
import { Button } from '@mui/material';
import { useUserContext } from '../context/userContext';

function Dashboard() {
  const { user, signOutUser } = useUserContext();
  const { REACT_APP_FIREBASE_API_KEY } = process.env;
  console.log(REACT_APP_FIREBASE_API_KEY);

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
