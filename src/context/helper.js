import React, { useState } from 'react';
import { useUserContext } from './userContext';

export const errorCode = (code) => {
  switch (code) {
    case 'auth/wrong-password':
      return 'Invalid Password';
      break;
    case 'auth/email-already-in-use':
      return 'Email address is already in use';
      break;
    case 'auth/user-not-found':
      return 'Email Address not found';
      break;
    case 'auth/invalid-email':
      return 'Invalid Emaill address';
      break;
    case 'auth/weak-password':
      return 'Weak password';
      break;
    case 'auth/user-disabled':
      return 'The given email has been disabled';
      break;
    case 'auth/account-exists-with-different-credential':
      return 'This account already exists';
      break;
    default:
      return code;
  }
};
