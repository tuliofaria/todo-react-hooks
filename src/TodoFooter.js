import React from 'react'
import { Link } from 'react-router-dom'

const pluralize = (count, word) => {
  return count === 1 ? word : word + 's'
}

const TodoFooter = (props) => {
  const activeTodoWord = pluralize(props.count, 'item')

  const nowShowing = props.nowShowing || ''
  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{props.count}</strong> {activeTodoWord} left
      </span>
      <ul className='filters'>
        <li>
          <Link to='/'
            className={nowShowing === '' ? 'selected' : null}>
              All
          </Link>
        </li>
        {' '}
        <li>
          <Link to='/active'
            className={nowShowing === 'active' ? 'selected' : null}>
              Active
          </Link>
        </li>
        {' '}
        <li>
          <Link to='/completed'
            className={nowShowing === 'completed' ? 'selected' : null}>
              Completed
          </Link>
        </li>
      </ul>
      {
        (props.completedCount > 0) &&
          <button
            className='clear-completed'
            onClick={props.onClearCompleted}>
            Clear completed
          </button>
      }
    </footer>
  )
}

export default TodoFooter
