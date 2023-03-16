import React from 'react'
import { type TodoType } from '../App'
import { deleteTodo, toggleStatus } from '../store/todoSlice'
import { useAppDispatch } from '../store'

export const TodoItem = ({ id, title, completed }: TodoType) => {
  const dispatch = useAppDispatch()

  const handleToggle = async () => await dispatch(toggleStatus(id))
  const handleRemove = async () => await dispatch(deleteTodo(id))
  return (
    <li
      style={{
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <input type="checkbox" checked={completed} onChange={handleToggle} />
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {title}
      </span>
      <span style={{ color: 'red', cursor: 'pointer' }} onClick={handleRemove}>
        &times;
      </span>
    </li>
  )
}
