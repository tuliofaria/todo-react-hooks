import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import TodoItem from './TodoItem'
import TodoFooter from './TodoFooter'

const app = {
  ALL_TODOS: '',
  ACTIVE_TODOS: 'active',
  COMPLETED_TODOS: 'completed'
}
const ENTER_KEY = 13

class App extends Component {
  state = {
    newTodo: '',
    todos: [],
    editing: ''
  }

  handleChange = (event) => {
    this.setState({ newTodo: event.target.value });
  }

  handleNewTodoKeyDown = (event) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault()

    const val = this.state.newTodo.trim();

    if (val) {
      this.setState({
        todos: [
          ...this.state.todos, 
          {
            id: new Date().getTime(),
            title: val,
            completed: false      
          }
        ],
        newTodo: ''
      })
    }
  }

  toggleAll = (event) => {
    const checked = event.target.checked
    const newTodosList = this.state.todos.map(todo => {
      return {...todo, completed: checked }
    })
    this.setState({ todos: newTodosList })
  }

  toggle = (todoToToggle) => {
    const newTodoList = this.state.todos.map(todo => {
			return todo !== todoToToggle ?
        todo :
        {
          ...todo,
          completed: !todo.completed
        }
    })
    this.setState({
      todos: newTodoList
    })
  }

  destroy = todo => () => {
    const newTodoList = this.state.todos.filter(candidate => {
			return candidate !== todo;
    })
    this.setState({
      todos: newTodoList
    })
  }

  edit = todo => () => {
    console.log('onediting')
    this.setState({ editing: todo.id });
  }

  save = todoToSave => text => {
    const newTodosList = this.state.todos.map(todo => {
			return todo !== todoToSave ? todo : {...todo, title: text }
		})
    this.setState({ editing: null, todos: newTodosList });
  }

  cancel = () => {
    this.setState({ editing: null });
  }

  clearCompleted = () => {
    const newTodosList = this.state.todos.filter(todo => {
      return !todo.completed
    })
    this.setState({
      todos: newTodosList
    })
  }
  render () {
    let main;
    let todos = this.state.todos
    const nowShowing = this.props.match.params.nowShowing || app.ALL_TODOS
    let shownTodos = todos.filter(todo => {
      switch (nowShowing) {
      case app.ACTIVE_TODOS:
        return !todo.completed;
      case app.COMPLETED_TODOS:
        return todo.completed;
      default:
        return true;
      }
    }, this)

    var todoItems = shownTodos.map(todo => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={this.toggle.bind(this, todo)}
          onDestroy={this.destroy(todo)}
          onEdit={this.edit(todo)}
          editing={this.state.editing === todo.id}
          onSave={this.save(todo)}
          onCancel={this.cancel}
        />
      );
    }, this)

    const activeTodoCount = todos.reduce(function (accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);

    const completedCount = todos.length - activeTodoCount;

    if (todos.length) {
      main = (
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={this.toggleAll}
            checked={activeTodoCount === 0}
          />
          <label
            htmlFor="toggle-all"
          />
          <ul className="todo-list">
            {todoItems}
          </ul>
        </section>
      );
    }
    return (
      <div>
        <header className='header'>
          <h1>todos</h1>
          <input
            className='new-todo'
            placeholder='What needs to be done?'
            value={this.state.newTodo}
            onKeyDown={this.handleNewTodoKeyDown}
            onChange={this.handleChange}
            autoFocus
          />
        </header>
        {main}
        {(activeTodoCount || completedCount) ?
            <TodoFooter
              count={activeTodoCount}
              completedCount={completedCount}
              nowShowing={nowShowing}
              onClearCompleted={this.clearCompleted}
            /> : null
        }
      </div>
    )
  }
}

const AppWrapper = props => {
  return (
    <Router>
      <div>
        <Route path='/:nowShowing?' component={App} />
      </div>
    </Router>
  )
}

export default AppWrapper
