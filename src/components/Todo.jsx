import React from 'react'
import classNames from 'classnames'
import { focusAtEnd } from '~/utils/reactUtils'

import './todo.scss'

class Todo extends React.Component {
  // state = {
  //   title_: this.props.title,
  //   notes_: this.props.notes,
  //   isCollapsed: this.props.isCollapsed,
  //   isCompleted: false,
  //   subtasks: [
  //     { id: 1, text: 'lol' },
  //     { id: 2, text: 'lawl' },
  //     { id: 3, text: 'teehee' }
  //   ]
  // }

  componentDidMount = () => {
    this.doubleClick = {
      delay: 300,
      clicks: 0,
      timer: null
    }
  }

  componentDidUpdate = () => {
    if (!this.state.isCollapsed) {
      focusAtEnd(this.titleinput)
    }
  }

  expand = () => {
    this.setState({ isCollapsed: false })
  }
  collapse = () => {
    this.setState({ isCollapsed: true })
  }
  onTodoCompleted = () => {
    if (!this.state.isCompleted) {
      this.props.onCompleted()
    }

    // this.setState(prevState => ({ isCompleted: !prevState.isCompleted }))
  }
  onTitleClick = e => {
    this.expand()
    e.stopPropagation()
  }
  onTodoClick = e => {
    if (this.state.isCompleted) {
      return
    }

    if (!this.state.isCollapsed) {
      e.stopPropagation()
    }

    this.doubleClick.clicks++

    var self = this
    if (self.doubleClick.clicks === 1) {
      self.doubleClick.timer = setTimeout(function() {
        self.doubleClick.clicks = 0
      }, self.doubleClick.delay)
    } else {
      e.stopPropagation()
      clearTimeout(self.doubleClick.timer)
      self.doubleClick.clicks = 0
      self.state.isCollapsed ? self.expand() : self.collapse()
    }
  }
  onTitleInputChanged = e => {
    this.setState({ title_: e.target.value })
  }

  render() {
    const { isCollapsed, isCompleted, title_, notes_, subtasks } = this.state

    const { isCollapsed, isCompleted, title, notes, subtasks } = this.props

    const {
      onTodoClick,
      onTodoCompleted,
      onTitleClick,
      onTitleInputChanged
    } = this

    const checkboxId = 'box' + Math.ceil(Math.random() * 10000)

    return (
      <div
        className={classNames('todo', { iscollapsed: isCollapsed })}
        onClick={onTodoClick}
      >
        <div className='todo-header'>
          <input type='checkbox' id={checkboxId} checked={isCompleted} />
          <label
            htmlFor={checkboxId}
            className='todo-checkbox'
            onClick={onTodoCompleted}
          />
          <div className='todo-title' onClick={onTitleClick}>
            {isCollapsed ? (
              <h1 className='title-fixed'>{title_}</h1>
            ) : (
              <input
                className='title-editable'
                placeholder='drink some water...'
                ref={ref => {
                  this.titleinput = ref
                }}
                value={title_}
                onChange={onTitleInputChanged}
              />
            )}
          </div>
        </div>
        <div className='todo-details'>
          <div className='todo-notes'>{notes_}</div>
          <div className='todo-subtasks'>
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
