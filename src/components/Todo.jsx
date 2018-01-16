// @flow

import React from 'react'
import classNames from 'classnames'

import './todo.scss'

class Todo extends React.Component<Props> {
  constructor(props) {
    super(props)

    const { title, notes } = this.props
    this.state = {
      title_: title,
      notes_: notes,
      boxId: 'box' + Math.ceil(Math.random() * 10000),
      isCollapsed: true,
      isCompleted: false,
      inTitleEditMode: false,
      subtasks: [
        { id: 1, text: 'lol' },
        { id: 2, text: 'lawl' },
        { id: 3, text: 'teehee' }
      ],
      doubleClick: {
        delay: 300,
        clicks: 0,
        timer: null
      }
    }

    this.expand = this.expand.bind(this)
    this.collapse = this.collapse.bind(this)
    this.onTodoCompleted = this.onTodoCompleted.bind(this)
    this.onTitleClick = this.onTitleClick.bind(this)
    this.onTodoClick = this.onTodoClick.bind(this)
  }

  expand() {
    this.setState({ isCollapsed: false })
  }
  collapse() {
    this.setState({ isCollapsed: true })
  }
  onTodoCompleted() {
    this.setState({ isCompleted: !this.isCompleted })

    if (this.isCompleted) {
      //this.$emit('completed')
    }
  }
  onTitleClick(event) {
    this.expand()
    event.stopPropagation()
  }
  onTodoClick(event) {
    var self = this

    if (self.isCompleted) {
      return
    }

    if (!self.isCollapsed) {
      event.stopPropagation()
    }

    self.setState(prevState => ({ doubleClick: prevState.doubleClick + 1 }))

    if (self.doubleClick.clicks === 1) {
      //     self.setState((prevState) => {
      //       doubleClick: { ...prevState.doubleClick,
      //       timer : setTimeout(function () {
      //         self.setState({ doubleClick: { ...prevStatedoubleClick, clicks: 0 } })
      //       }, self.doubleClick.delay)
      //            }
      // })

      self.doubleClick.timer = setTimeout(function() {
        self.doubleClick.clicks = 0
      }, self.doubleClick.delay)
    } else {
      clearTimeout(self.doubleClick.timer)
      self.doubleClick.clicks = 0
      self.isCollapsed ? self.expand() : self.collapse()
      event.stopPropagation()
    }
  }

  render() {
    return (
      <div
        className={classNames('todo-list', {
          iscollapsed: this.state.isCollapsed
        })}
        onClick={this.state.onTodoClick}
      >
        <div className="todo-header">
          <input
            type="checkbox"
            id={this.state.boxId}
            checked={this.state.isCompleted}
          />
          <label
            htmlFor={this.state.boxId}
            className="todo-checkbox"
            onClick={this.state.onTodoCompleted}
          />
          <div className="todo-title" onClick={this.state.onTitleClick}>
            {this.state.isCollapsed ? (
              <h1 className="title-fixed">{this.state.title_}</h1>
            ) : (
              <input
                className="title-editable"
                placeholder="drink some water..."
                ref={input => {
                  this.titleInput = input
                }}
                value={this.state.title_}
              />
            )}
          </div>
        </div>
        <div className="todo-details">
          <div className="todo-notes">{this.state.notes_}</div>
          <div className="todo-subtasks">
            <ol>
              {this.state.subtasks.map(subtask => {
                return <li key={subtask.id}>{subtask.text}</li>
              })}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default Todo
