import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useUserContext } from '../context/userContext';

const capitalize = (name) => {
  return `${name[0].toUpperCase()}${name.substring(1).toLowerCase()}`;
};

function Welcome() {
  const [username, setUsername] = useState('');
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      const obj = JSON.stringify(user.displayName).replace(/\"/g, '');
      const name = capitalize(obj);
      setUsername(name);
    }
  }, [user.displayName]);

  console.log(username);

  return <Typography sx={{ ml: 10 }}>Welcome! {username}</Typography>;
}

export default Welcome;
