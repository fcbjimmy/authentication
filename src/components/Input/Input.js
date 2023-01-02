import React, { useState } from 'react';
import { Button, TextField, FormControl } from '@mui/material';

function Input({ edit, onSubmit, onAddtodo }) {
  const [todo, setTodo] = useState(edit ? edit.value : '');
  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const data = {
      task: todo,
      id: Date.now(),
      isCompleted: false,
    };
    edit ? onSubmit(todo) : onAddtodo(data);
    setTodo('');
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl fullWidth>
        <label htmlFor='todo'></label>
        {edit ? (
          <>
            <TextField
              label=''
              value={todo}
              onChange={handleInputChange}
              size='small'
              sx={{ mt: 2 }}
            />
            <Button sx={{ mt: 1.5 }} color='primary' variant='contained' type='submit'>
              Update
            </Button>
          </>
        ) : (
          <>
            <TextField
              value={todo}
              placeholder='Enter to do'
              type='text'
              onChange={handleInputChange}
              required
            ></TextField>
            <Button sx={{ mt: 1.5 }} color='primary' variant='contained' type='submit'>
              Add
            </Button>
          </>
        )}
      </FormControl>
    </form>
  );
}

export default Input;
