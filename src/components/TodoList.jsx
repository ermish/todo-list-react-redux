import React from 'react'
import Todo from './Todo'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import './todoList.scss'

const Fade = ({ children, ...props }) => (
  <CSSTransition {...props} timeout={1000} classNames="fade">
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
    ]
  }

  todoRefs = []

  // ...mapActions([
  //   'addTodo',
  //   'removeTodo'
  // ]),

  addTodo = () => {}

  removeTodo = id => {
    return id
  }

  onTodoCompleted = id => () => {
    var self = this
    setTimeout(() => {
      self.removeTodo(id)
    }, 1000)
  }

  onTodoListClicked = () => {
    this.closeTodos()
  }

  onAddTodo = () => {
    var self = this
    self.addTodo()
    setTimeout(() => {
      self.todoRefs.last().expand()
    }, 300)
  }

  closeTodos = () => {
    for (var todo of this.todoRefs) {
      todo.collapse()
    }
  }

  render = () => {
    const { todos } = this.state
    const { onTodoCompleted, onTodoListClicked, onAddTodo } = this

    var todoItems = todos.map((todo, i) => (
      <Fade key={todo.id}>
        <Todo
          title={todo.text}
          notes={todo.notes}
          onCompleted={onTodoCompleted(todo.id)}
          ref={element => (this.todoRefs[i] = element)}
        />
      </Fade>
    ))

    return (
      <div className="todo-list" onClick={onTodoListClicked}>
        <TransitionGroup className="todo-list-items todo-list-animation">
          {todoItems}
        </TransitionGroup>
        <div className="add-todo-container">
          <a
            className="add-todo-button"
            href="javascript:void(0)"
            onClick={onAddTodo}
          >
            <span className="add-todo-icon">+</span> Add todo
          </a>
        </div>
      </div>
    )
  }
}
