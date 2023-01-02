import React from 'react';
import Todo from '../todo/Todo';

function TodosList({ todos, onUpdateToDo, onDeleteToDo, onCheckToDo }) {
  return (
    <div>
      {todos.map((todo) => (
        <Todo
          updateToDo={onUpdateToDo}
          deleteToDo={onDeleteToDo}
          key={todo.id}
          id={todo.id}
          todo={todo.task}
          isCompleted={todo.isCompleted}
          CheckToDo={onCheckToDo}
        />
      ))}
    </div>
  );
}

export default TodosList;
