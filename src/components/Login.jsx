/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import GoogleIcon from '@mui/icons-material/Google';
import { useUserContext, signInWithGmail } from '../context/userContext';
import '../App.css';

const paperStyle = {
  padding: 20,
  height: '60vh',
  width: '300px',
  margin: '0 auto',
};
const avatarStyle = { backgroundColor: '#1bbd7e' };
const btnStyle = { margin: '0.5rem 0' };

// eslint-disable-next-line react/prop-types
function Login({ handleChange }) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const { loginUser, forgotPassword } = useUserContext();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (loginEmail && loginPassword) loginUser(loginEmail, loginPassword);
  };

  const handleForgotPassword = () => {
    if (loginEmail) {
      forgotPassword(loginEmail).then(() => setLoginEmail(''));
    }
  };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign in</h2>
        </Grid>
        <form onSubmit={onSubmitHandler}>
          <TextField
            label='Email'
            placeholder='Enter email'
            fullWidth
            required
            variant='standard'
            value={loginEmail}
            onChange={(e) => {
              setLoginEmail(e.target.value);
            }}
          />
          <TextField
            label='Password'
            placeholder='Enter password'
            fullWidth
            required
            type='password'
            variant='standard'
            value={loginPassword}
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
          />
          <FormControlLabel
            control={<Checkbox name='checkedB' color='primary' />}
            label='Remember me'
          />
          <Button type='submit' color='primary' fullWidth variant='contained' style={btnStyle}>
            Sign in
          </Button>
          <Button
            type='submit'
            color='primary'
            fullWidth
            variant='contained'
            style={btnStyle}
            onClick={signInWithGmail}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <GoogleIcon sx={{ marginRight: '2px' }} fontSize='small' />
            <span className='google'>Sign in with Google</span>
          </Button>
        </form>
        <Typography>
          <Link href='#' onClick={handleForgotPassword}>
            Forgot password?
          </Link>
        </Typography>
        <Typography>
          Do you have an account?
          <Link href='#' onClick={() => handleChange('event', 1)}>
            Sign up!
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Login;
