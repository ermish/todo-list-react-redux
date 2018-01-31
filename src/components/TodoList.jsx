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
        title: 'lol',
        notes: 'this is a note',
        subtasks: [
          { id: '8be4bdf2-692c-4aac-91a8-537bae8aff21', title: 'do this' },
          { id: '8be4bdf2-692c-4aac-91a8-537bae8aff22', title: 'then this' }
        ]
      },
      {
        id: '3be4bdf2-692c-4aac-91a8-537bae7aff21',
        title: 'lawl',
        notes: 'this is a description'
      },
      {
        id: '4be4bdf2-692c-4aac-91a8-537bae7aff22',
        title: 'teehee',
        notes: 'this is some detailed stuff'
      }
    ],
    activeTodoIndex: null
  }

  componentDidMount = () => {
    this.doubleClick = {
      delay: 300,
      clicks: 0,
      timer: null
    }
  }

  addTodo = () => {
    const newId = uuid()

    this.setState(prevState => {
      const newTodo = {
        id: newId,
        title: '',
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

  openTodo = id => {
    this.setState(() => ({
      activeTodoIndex: id
    }))
  }

  closeTodos = () => {
    this.setState(() => ({
      activeTodoIndex: null
    }))
  }

  onTitleClick = index => e => {
    this.setState(() => ({
      activeTodoIndex: index
    }))
    e.stopPropagation()
  }

  onTodoClick = id => e => {
    if (this.state.activeTodoIndex == id) {
      e.stopPropagation()
      return
    }

    this.doubleClick.clicks++

    const self = this

    if (self.doubleClick.clicks === 1) {
      self.doubleClick.timer = setTimeout(() => {
        self.doubleClick.clicks = 0
      }, self.doubleClick.delay)
    } else {
      e.stopPropagation()
      clearTimeout(self.doubleClick.timer)
      self.doubleClick.clicks = 0
      self.state.activeTodoIndex == null ? self.openTodo(id) : self.closeTodos()
    }
  }

  onTitleInputChanged = id => childEvent => {
    const newTitle = childEvent.target.value

    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id !== id) {
          return todo
        }

        return {
          ...todo,
          title: newTitle
        }
      })
    }))
  }

  onTodoCompleted = id => () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id !== id) {
          return todo
        }

        return {
          ...todo,
          isCompleted: true
        }
      })
    }))

    this.removeTodo(id)
  }

  onTodoListClicked = () => {
    this.closeTodos()
  }

  onAddTodo = e => {
    e.stopPropagation()
    this.addTodo()
  }

  render = () => {
    const { todos, activeTodoIndex } = this.state
    const {
      onTodoCompleted,
      onTodoListClicked,
      onAddTodo,
      onTitleClick,
      onTitleInputChanged,
      onTodoClick
    } = this

    const todoItems = todos.map((todo, i) => (
      <Fade key={todo.id}>
        <Todo title={todo.title}
          notes={todo.notes}
          subtasks={todo.subtasks}
          onTitleClick={onTitleClick(i)}
          onTitleInputChanged={onTitleInputChanged(todo.id)}
          onTodoClick={onTodoClick(i)}
          onTodoCompleted={onTodoCompleted(todo.id)}
          onEnterPressed={onAddTodo}
          isCollapsed={i !== activeTodoIndex} />
      </Fade>
    ))

    return (
      <div className='todo-list' onClick={onTodoListClicked}>
        <TransitionGroup className='todo-list-items todo-list-animation'>
          {todoItems}
        </TransitionGroup>
        <div className='add-todo-container'>
          <a className='add-todo-button' href='javascript:void(0)' onClick={onAddTodo}>
            <span className='add-todo-icon'>+</span> Add todo
          </a>
        </div>
      </div>
    )
  }
}
