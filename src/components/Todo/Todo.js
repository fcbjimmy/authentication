import { useState } from 'react';
import Input from '../input/Input';
import { Box, Paper } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import todoCSS from './styles.module.css';

function Todo({ id, deleteToDo, todo, updateToDo, CheckToDo, isCompleted }) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    isCompleted: null,
  });

  function handleTodoIdClick(e) {
    deleteToDo(id);
  }

  function submitUpdateHandler(value) {
    updateToDo(edit.id, value);
    setEdit({
      id: null,
      value: '',
    });
  }

  function handleCheckClick(e) {
    e.preventDefault();
    CheckToDo(id);
  }

  if (edit.id) {
    return (
      <Box>
        <Input edit={edit} onSubmit={submitUpdateHandler} />
      </Box>
    );
  }

  return (
    <Paper>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 2,
          py: 1,
          width: 1,
          flex: 1,
        }}
      >
        {isCompleted ? (
          <s className={todoCSS.todo}>{todo}</s>
        ) : (
          <div className={todoCSS.todo}>{todo}</div>
        )}
        <div>
          <CheckCircleOutlineIcon onClick={handleCheckClick} />
          <DeleteOutlineIcon onClick={handleTodoIdClick} />
          <ModeEditIcon
            onClick={() =>
              setEdit({
                id: id,
                value: todo,
                isCompleted: isCompleted,
              })
            }
          />
        </div>
      </Box>
    </Paper>
  );
}

export default Todo;
