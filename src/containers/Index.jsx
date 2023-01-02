import React, { useState } from 'react';
import { Tabs, Tab, Paper, Box, Typography } from '@mui/material';
import Login from '../components/authentication/Login';
import Signup from '../components/authentication/Signup';

const paperStyle = { width: '340px', margin: '20px auto' };

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component='span'>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function SignInOutContainer() {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper elevation={20} style={paperStyle}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label='disabled tabs example'
        variant='fullWidth'
      >
        <Tab label='Sign in' />
        <Tab label='Sign up' />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Login handleChange={handleChange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Signup />
      </TabPanel>
    </Paper>
  );
}

export default SignInOutContainer;
