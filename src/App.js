import React, { useState, useEffect } from 'react';
import './App.css';
// import components
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  const [ inputText, setInputText ] = useState("")
  const [ todos, setTodos ] = useState([])
  const [ status, setStatus ] = useState("all")
  const [ filterdTodos, setFilterdTodos ] = useState([])
  const [ warning, setWarning ] = useState("")

  useEffect(() => {getLocalTotos()},[])
  useEffect(() => {filterdTodosHandler()},[todos, status])
  useEffect(() => {saveLocalTotos()},[todos, status])

  const filterdTodosHandler = () => {
    switch (status) {
      case "completed":
        setFilterdTodos(todos.filter(item => item.complete === true))
        break;
      case "uncompleted":
        setFilterdTodos(todos.filter(item => item.complete === false))  
        break;
      default:
        setFilterdTodos(todos)
        break;
    }
  }

// localStorage
  const saveLocalTotos = () => {
      localStorage.setItem('todos', JSON.stringify(todos))
  }

  const getLocalTotos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
      let localTodos = JSON.parse(localStorage.getItem('todos'))
      setTodos(localTodos)
    }
  }
  
  return (
    <div className="App">
      <header>
        <h1>Ethan's Todo List</h1>
      </header>
      <Form 
      inputText={inputText} 
      setInputText={setInputText}
      todos={todos} 
      setTodos={setTodos}  
      warning={warning} 
      setWarning={setWarning}
      setStatus={setStatus}  
      />
      <TodoList 
      todos={todos} 
      setTodos={setTodos} 
      filterdTodos={filterdTodos}
      />
    </div>
  );
}

export default App;
