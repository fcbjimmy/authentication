import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useUserContext } from '../../context/userContext';

const capitalize = (name) => {
  const array = name.trim().split(' ');
  console.log(array);
  const cap = array.map((word) => `${word[0].toUpperCase()}${word.substring(1).toLowerCase()}`);
  const fullname = cap.join(' ');
  return fullname;
};

function Welcome() {
  const [username, setUsername] = useState('');
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      const obj = JSON.stringify(user.displayName).replace(/\"/g, '');
      const name = capitalize(obj);
      console.log(obj);
      setUsername(name);
    }
  }, [user.displayName]);

  return (
    <Typography sx={{ ml: 10 }}>
      Welcome! {user?.displayName === null ? 'Loading...' : username}
    </Typography>
  );
}

export default Welcome;
