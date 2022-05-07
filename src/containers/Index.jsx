import React, { useState } from 'react';
import { Tabs, Tab, Paper, Box, Typography } from '@mui/material';
import Login from '../components/Login';
import Signup from '../components/Signup';

const paperStyle = { width: '340px', margin: '20px auto' };

function TabPanel(props) {
  // eslint-disable-next-line react/prop-types
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
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
  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  console.log({ value });

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
