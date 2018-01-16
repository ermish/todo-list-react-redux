import logo from '../logo.svg'
import React from 'react'

import Todo from '~/components/Todo'

import './todoListPage.scss'

const TodoListPage = () => {
  return (
    <div id="todo-page">
      <img src={logo} className="app-logo" alt="logo" />
      <Todo id="todo-list" />
    </div>
  )
}

export default TodoListPage
