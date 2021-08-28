import React from 'react';

function Form({ inputText, setInputText, todos, setTodos, warning, setWarning, setStatus }) {
  const inputValueHandler = (e) => {
    setInputText(e.target.value)
  }

  const warningHandler = () => {
    let trimInputText = inputText.trim()
    if (!trimInputText) {
      setWarning("請輸入待辦事項")
    } else {
      setWarning("")
    }
  }

  const submitTodoHandler = (e) => {
    e.preventDefault()
    let trimInputText = inputText.trim()
    if (trimInputText) {
      setTodos([
      ...todos,
      {
        id: Math.random(),
        text: trimInputText,
        complete: false
      }
    ])
    }
    setInputText("")
  }

  const statusHandler = (e) => {
    setStatus(e.target.value)
  }

    return (
    <form>
      <input autoFocus value={inputText} onChange={inputValueHandler} placeholder={warning} type="text" className="todo-input"/>
      <button onClick={(e) => {submitTodoHandler(e); warningHandler()}} className="todo-button" type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value="all">全部</option>
          <option value="completed">已完成</option>
          <option value="uncompleted">未完成</option>
        </select>
      </div>
    </form>
    )
}

export default Form;