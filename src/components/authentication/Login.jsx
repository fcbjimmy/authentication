import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useUserContext, signInWithGmail } from '../../context/userContext';
import IconButton from '@mui/material/IconButton';
import '../../App.css';

const paperStyle = {
  padding: 20,
  height: '60vh',
  width: '100%',
  margin: '0 auto',
};
const avatarStyle = { backgroundColor: '#1bbd7e' };
const btnStyle = { margin: '0.5rem 0' };

function Login({ handleChange }) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleChangePass = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { loginUser, forgotPassword, signInWithGmail } = useUserContext();

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
            required
            placeholder='Enter email'
            fullWidth
            variant='standard'
            value={loginEmail}
            onChange={(e) => {
              setLoginEmail(e.target.value);
            }}
          />
          <TextField
            label='Password'
            required
            placeholder='Enter password'
            fullWidth
            type={!values.showPassword ? 'password' : 'text'}
            variant='standard'
            value={loginPassword}
            onChange={(e) => {
              setLoginPassword(e.target.value);
              handleChangePass('password');
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {!values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
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
