import React from "react";
import Todo from "../Todo/Todo";

function TodosList(props) {
  console.log(props.todos);

  return (
    <div>
      {props.todos.map((todo) => (
        <Todo
          updateToDo={props.onUpdateToDo}
          deleteToDo={props.onDeleteToDo}
          key={todo.id}
          id={todo.id}
          todo={todo.task}
          isCompleted={todo.isCompleted}
          CheckToDo={props.onCheckToDo}
        />
      ))}
    </div>
  );
}

export default TodosList;
