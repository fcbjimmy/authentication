import { useState, useEffect } from 'react';
import Input from '../Input/Input';
import TodosList from '../TodosList/TodosList';
import { Paper, Typography } from '@mui/material';

const paperStyle = {
  padding: '50px',
  width: '500px',
  height: 'auto',
  margin: '0 auto',
};

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo(newtodo) {
    if (!newtodo.task || /^\s*$/.test(newtodo.task)) {
      return;
    }
    setTodos((prevtodo) => {
      const array = [...prevtodo, newtodo];
      return array;
    });
  }

  function updateTodoHandler(todoId, editedTodo) {
    if (!editedTodo || /^\s*$/.test(editedTodo)) {
      return;
    }

    const updatedtodo = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.task = editedTodo;
      }
      return todo;
    });
    console.log(updatedtodo);
    setTodos(updatedtodo);
  }

  function deleteHandler(id) {
    console.log(id);
    const test = todos.filter((todo) => todo.id !== id);
    setTodos(test);
  }

  function checkToDo(id) {
    console.log(id);

    const todoCheck = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
        console.log(todo.isCompleted);
      }
      return todo;
    });
    setTodos(todoCheck);
  }

  return (
    <Paper style={paperStyle} elevation='1'>
      <Typography variant='h5' align='center' gutterBottom color='primary'>
        TO DO's
      </Typography>
      <Input onAddtodo={addTodo} />
      <TodosList
        todos={todos}
        onUpdateToDo={updateTodoHandler}
        onDeleteToDo={deleteHandler}
        onCheckToDo={checkToDo}
      />
    </Paper>
  );
}

export default TodoApp;
