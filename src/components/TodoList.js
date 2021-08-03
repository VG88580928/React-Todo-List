import React from 'react';
// import components
import Todo from './Todo';

function TodoList({ todos, setTodos, filterdTodos }) {
    return (
      <div className="todo-container">
      {todos.length ? (<ul className="todo-list">
        {
          filterdTodos.map(todo => {
            return (
              <Todo 
              key={todo.id}
              text={todo.text}
              setTodos={setTodos}
              todo={todo}
              todos={todos}
              />
            )
          })
        }
        </ul>) : (
          <div className="no-todos">No Tasks!</div>
        )}      
      </div>
    )
}

export default TodoList;