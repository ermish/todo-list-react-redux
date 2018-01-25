import logo from '../logo.svg'
import React from 'react'
import { createPolyfills } from '~/utils/polyfills'

import TodoList from '~/components/TodoList'

import './todoListPage.scss'

const TodoListPage = () => {
  createPolyfills()

  return (
    <div id='todo-page'>
      <img src={logo} className='app-logo' alt='logo' />
      <TodoList />
    </div>
  )
}

export default TodoListPage
