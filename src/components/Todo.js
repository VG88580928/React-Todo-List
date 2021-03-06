import React,{ useState } from 'react';
import { TiEdit } from 'react-icons/ti'

let controllEdit = true

function Todo({ text, todos , setTodos, todo }) {
  const [onEdit, setOnEdit] = useState(false)
  const [editValue, setEditValue] = useState(todo.text)

  // complete
  const completeHandler = () => {
    setTodos(todos.map(item => {
      return item.id === todo.id ? { ...item, complete: !item.complete } : item
    }))
  }

  // Edit
  const onEditHandler = () => {
    if (controllEdit) {
      setOnEdit(true)
      controllEdit = false
    }
  }

  const editValueHandler = (e) => {
    setEditValue(e.target.value)
  }

  const updateHandler = () => {
    const newTodo = todos.map(item => (item.id === todo.id) ? {...item, text:editValue} : item )
    if (editValue.trim()) {
      setTodos(newTodo)
    } else {
      setEditValue(todo.text)
    }
    setOnEdit(false)
    controllEdit = true
  }

// Delete
  const animationHandler = (e) => {
    e.currentTarget.parentElement.classList.add("fall")
  }

  const deleteHandler = (e) => {
    /*  由於我們在div使用onTransitionEnd監聽有無transition,有的話確保執行完transition後才觸發deleteHandler刪除todo,
    而這塊div同時又有completeHandler會觸發transition,這樣點擊完成的勾勾後todo也會消失,此判斷式確保在class有.fall的情況才刪除todo */
    if (e.target.className === "todo fall" || e.target.className === "todo completed fall") {
      setTodos(todos.filter(item => {
        return item.id !== todo.id
      }))
    }
  }

  if (onEdit) {
    return (
      <div className="todo">
        <input onChange={(e) => editValueHandler(e)} type="text" value={editValue} id="editValue" name="editValue" className="todo-item"/>
        <button onClick={updateHandler} className="edit-btn">
          update
        </button>
      </div> 
    )
  } else {
    return (
      <div onTransitionEnd={(e) => deleteHandler(e) } className={`todo ${todo.complete ? "completed" : ""}`}>
        <li className="todo-item">{text}</li>
        <button onClick={completeHandler} className="complete-btn">
          <i className="fas fa-check"></i>
        </button>
        <button onClick={onEditHandler} className="edit-btn">
          <TiEdit/>
        </button>
        <button onClick={(e) => animationHandler(e)} className="trash-btn">
          <i className="fas fa-trash"></i>
        </button>
      </div> 
    )
  }
}

export default Todo;