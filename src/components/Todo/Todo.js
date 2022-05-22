import { useState } from 'react';
import Input from '../Input/Input';
import { Box, Paper } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import './Styles.css';

function Todo(props) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
    isCompleted: null,
  });

  function handleTodoIdClick(e) {
    console.log(props.id);
    props.deleteToDo(props.id);
  }

  function submitUpdateHandler(value) {
    props.updateToDo(edit.id, value);
    console.log(value);
    setEdit({
      id: null,
      value: '',
    });
  }

  function handleCheckClick(e) {
    e.preventDefault();
    props.CheckToDo(props.id);
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
        {props.isCompleted ? (
          <s className='todo'>{props.todo}</s>
        ) : (
          <div className='todo'>{props.todo}</div>
        )}
        <div>
          <CheckCircleOutlineIcon onClick={handleCheckClick} />
          <DeleteOutlineIcon onClick={handleTodoIdClick} />
          <ModeEditIcon
            onClick={() =>
              setEdit({
                id: props.id,
                value: props.todo,
                isCompleted: props.isCompleted,
              })
            }
          />
        </div>
      </Box>
    </Paper>
  );
}

export default Todo;
