import React, { useState, useRef, useEffect } from 'react'

const ESCAPE_KEY = 27
const ENTER_KEY = 13

const TodoItem = (props) => {
  const inputRef = useRef()
  const [editText, setEditText] = useState(props.todo.title)

  useEffect(() => {
    inputRef.current.focus()
  }, [props.editing])

  const handleChange = event => {
    if (props.editing) {
      setEditText(event.target.value)
    }
  }
  const handleSubmit = event => {
    const val = editText.trim()
    if (val) {
      props.onSave(val)
      setEditText(val)
    } else {
      props.onDestroy()
    }
  }
  const handleKeyDown = event => {
    if (event.which === ESCAPE_KEY) {
      setEditText(props.todo.title)
      props.onCancel(event)
    } else if (event.which === ENTER_KEY) {
      handleSubmit(event)
    }
  }
  const handleEdit = () => {
    props.onEdit()
  }
  let className = ''
  if (props.todo.completed) {
    className += ' completed'
  }
  if (props.editing) {
    className += ' editing'
  }
  return (
    <li className={className}>
      <div className='view'>
        <input
          className='toggle'
          type='checkbox'
          checked={props.todo.completed}
          onChange={props.onToggle}
        />
        <label onDoubleClick={handleEdit}>
          {props.todo.title}
        </label>
        <button className='destroy' onClick={props.onDestroy} />
      </div>
      <input
        ref={inputRef}
        className='edit'
        value={editText}
        onBlur={handleSubmit}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </li>
  )
}

export default TodoItem
