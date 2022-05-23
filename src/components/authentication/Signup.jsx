import React, { useState } from 'react';
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useUserContext } from '../../context/userContext';

const paperStyle = {
  padding: '20px',
  width: '100%',
  height: '60vh',
  margin: '0 auto',
};
const headerStyle = { margin: 0 };
const avatarStyle = { backgroundColor: '#1bbd7e' };
const btnStyle = { margin: '20px 0' };

function Signup() {
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const { registerUser, setError } = useUserContext();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (confirmPassword === '') {
      setPasswordError(false);
    }

    if (registerPassword !== confirmPassword) {
      setPasswordError(true);
    } else if (registerName && registerEmail && registerPassword && confirmPassword)
      registerUser(registerName, registerEmail, registerPassword, confirmPassword);
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}>
            <AccountCircleOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign up</h2>
          <Typography variant='caption'>Please fill this form to create an account</Typography>
        </Grid>
        <form onSubmit={onSubmitHandler}>
          <TextField
            required
            variant='standard'
            fullWidth
            label='Name'
            onChange={(e) => {
              setRegisterName(e.target.value);
            }}
          />
          <TextField
            required
            variant='standard'
            fullWidth
            label='Email'
            onChange={(e) => {
              setRegisterEmail(e.target.value);
            }}
            value={registerEmail}
          />
          <TextField
            required
            variant='standard'
            fullWidth
            label='Password'
            type='password'
            onChange={(e) => setRegisterPassword(e.target.value)}
            value={registerPassword}
          />
          <TextField
            required
            variant='standard'
            fullWidth
            label='Confirm Password'
            type='password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            {...(passwordError && { error: true, helperText: 'passwords do not match' })}
          />
          <Button type='submit' variant='contained' color='primary' style={btnStyle} fullWidth>
            Sign up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}

export default Signup;
