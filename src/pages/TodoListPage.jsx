import logo from '../logo.svg'
import React from 'react'

import TodoList from '~/components/TodoList'

import './todoListPage.scss'

const TodoListPage = () => {
  return (
    <div id="todo-page">
      <img src={logo} className="app-logo" alt="logo" />
      <TodoList />
    </div>
  )
}

export default TodoListPage
