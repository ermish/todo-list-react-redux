import React from 'react'
import Todo from './Todo'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { uuid } from '~/utils/utils'

import './todoList.scss'

const Fade = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={1000} classNames='fade'>
    {children}
  </CSSTransition>
)

export default class TodoList extends React.Component {
  state = {
    todos: [
      {
        id: '8be4bdf2-692c-4aac-91a8-537bae7aff20',
        text: 'lol',
        notes: 'this is a note'
      },
      {
        id: '3be4bdf2-692c-4aac-91a8-537bae7aff21',
        text: 'lawl',
        notes: 'this is a description'
      },
      {
        id: '4be4bdf2-692c-4aac-91a8-537bae7aff22',
        text: 'teehee',
        notes: 'this is some detailed stuff'
      }
    ],
    activeTodoIndex: null
  }

  addTodo = () => {
    const newId = uuid()
    this.setState(prevState => {
      var newTodo = {
        id: newId,
        text: '',
        notes: 'new todo notes'
      }

      return {
        todos: [...prevState.todos, newTodo],
        activeTodoIndex: prevState.todos.length
      }
    })
  }

  removeTodo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
      activeTodoIndex: null
    }))
  }

  closeTodos = () => {
    this.setState(() => ({
      activeTodoIndex: null
    }))
  }

  onTodoCompleted = id => () => {
    this.setState(prevState => {
      const todoToUpdateIndex = prevState.todos.findIndex(todo => {
        todo.id === id
      })

      const todToUpdate = prevState.todos[todoToUpdateIndex]


      ({
          todos: [...prevState.todos, 
            [todoToUpdateIndex] : prevState.todos[todoToUpdateIndex]
          []

      })

      todoToUpdate({ isCompleted: !prevState.isCompleted })
    })

    this.removeTodo(id)
  }

  onTodoListClicked = () => {
    this.closeTodos()
  }

  onAddTodo = e => {
    e.stopPropagation()
    this.addTodo(e)
  }

  render = () => {
    const { todos, activeTodoIndex } = this.state
    const { onTodoCompleted, onTodoListClicked, onAddTodo } = this

    var todoItems = todos.map((todo, i) => (
      <Fade key={todo.id}>
        <Todo
          title={todo.text}
          notes={todo.notes}
          onCompleted={onTodoCompleted(todo.id)}
          // ref={element => (this.todoRefs[i] = element)}
          isCollapsed={i !== activeTodoIndex}
        />
      </Fade>
    ))

    return (
      <div className='todo-list' onClick={onTodoListClicked}>
        <TransitionGroup className='todo-list-items todo-list-animation'>
          {todoItems}
        </TransitionGroup>
        <div className='add-todo-container'>
          <a
            className='add-todo-button'
            href='javascript:void(0)'
            onClick={onAddTodo}
          >
            <span className='add-todo-icon'>+</span> Add todo
          </a>
        </div>
      </div>
    )
  }
}
