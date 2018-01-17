import React from 'react'
import classNames from 'classnames'

import './todo.scss'

class Todo extends React.Component {
  state = {
    title_: this.props.title,
    notes_: this.props.notes,
    boxId: 'box' + Math.ceil(Math.random() * 10000),
    isCollapsed: true,
    isCompleted: false,
    inTitleEditMode: false,
    subtasks: [
      { id: 1, text: 'lol' },
      { id: 2, text: 'lawl' },
      { id: 3, text: 'teehee' }
    ]
  }

  expand = () => {
    this.setState({ isCollapsed: false })
    this.titleinput.focus()
  }
  collapse = () => {
    this.setState({ isCollapsed: true })
  }
  onTodoCompleted = () => {
    this.setState(prevState => ({ isCompleted: !prevState.isCompleted }))

    if (this.state.isCompleted) {
      this.props.onCompleted()
    }
  }
  onTitleClick = e => {
    this.expand()
    e.stopPropagation()
  }
  onTodoClick = e => {
    this.doubleClick = {
      delay: 300,
      clicks: 0,
      timer: null
    }

    if (this.state.isCompleted) {
      return
    }

    if (!this.state.isCollapsed) {
      e.stopPropagation()
    }

    this.setState(prevState => ({ doubleClick: prevState.doubleClick + 1 }))

    var self = this
    if (self.doubleClick.clicks === 1) {
      self.doubleClick.timer = setTimeout(function() {
        self.doubleClick.clicks = 0
      }, self.doubleClick.delay)
    } else {
      clearTimeout(self.doubleClick.timer)
      self.doubleClick.clicks = 0
      self.state.isCollapsed ? self.expand() : self.collapse()
      event.stopPropagation()
    }
  }
  onTitleInputChanged = e => {
    this.setState({ title_: e.target.value })
  }

  render() {
    const {
      isCollapsed,
      isCompleted,
      boxId,
      title_,
      notes_,
      subtasks
    } = this.state

    const {
      onTodoClick,
      onTodoCompleted,
      onTitleClick,
      onTitleInputChanged
    } = this

    return (
      <div
        className={classNames('todo', { iscollapsed: isCollapsed })}
        onClick={onTodoClick}
      >
        <div className="todo-header">
          <input type="checkbox" id={boxId} checked={isCompleted} />
          <label
            htmlFor={boxId}
            className="todo-checkbox"
            onClick={onTodoCompleted}
          />
          <div className="todo-title" onClick={onTitleClick}>
            {isCollapsed ? (
              <h1 className="title-fixed">{title_}</h1>
            ) : (
              <input
                className="title-editable"
                placeholder="drink some water..."
                ref={input => {
                  this.titleinput = input
                }}
                value={title_}
                onChange={onTitleInputChanged}
              />
            )}
          </div>
        </div>
        <div className="todo-details">
          <div className="todo-notes">{notes_}</div>
          <div className="todo-subtasks">
            <ol>
              {subtasks.map(subtask => {
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
