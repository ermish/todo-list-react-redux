import React from 'react'
import classNames from 'classnames'
import { focusAtEnd } from '~/utils/reactUtils'

import './todo.scss'

class Todo extends React.Component {
  componentDidUpdate = () => {
    if (!this.props.isCollapsed) {
      focusAtEnd(this.titleinput)
    }
  }

  onKeyDown = e => {
    if (e.key.toLowerCase() !== 'enter') {
      return
    }

    this.props.onEnterPressed(e)
  }

  render = () => {
    const {
      isCollapsed,
      isCompleted,
      notes,
      subtasks = [],
      title,
      onTodoClick,
      onTodoCompleted,
      onTitleClick,
      onTitleInputChanged
    } = this.props

    const { onKeyDown } = this

    const checkboxId = `box${Math.ceil(Math.random() * 10000)}`

    return (
      <div className={classNames('todo', { iscollapsed: isCollapsed })} onClick={onTodoClick}>
        <div className='todo-header'>
          <input type='checkbox' id={checkboxId} checked={isCompleted} />
          <label htmlFor={checkboxId} className='todo-checkbox' onClick={onTodoCompleted} />
          <div className='todo-title' onClick={onTitleClick}>
            {isCollapsed ? (
              <h1 className='title-fixed'>{title}</h1>
            ) : (
              <input className='title-editable'
                placeholder='walk around...'
                value={title}
                ref={ref => {
                  this.titleinput = ref
                }}
                onKeyDown={onKeyDown}
                onChange={e => onTitleInputChanged(e)} />
            )}
          </div>
        </div>
        <div className='todo-details'>
          <div className='todo-notes'>{notes}</div>
          <div className='todo-subtasks'>
            <ol>{subtasks.map(subtask => <li key={subtask.id}>{subtask.title}</li>)}</ol>
          </div>
        </div>
      </div>
    )
  }
}

export default Todo
