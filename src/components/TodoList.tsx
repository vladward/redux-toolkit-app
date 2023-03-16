import React from 'react'
import { TodoItem } from './TodoItem'
import { useAppSelector } from '../store'

export const TodoList = (): JSX.Element => {
  const todos = useAppSelector((state) => state.todos.todos)
  return (
        <div style={{ width: '60vw', margin: '0 auto' }}>
            <ul>
                {todos?.map(({ id, title, completed }) => (
                    <TodoItem key={id} id={id} title={title} completed={completed}/>
                ))}
            </ul>
        </div>
  )
}
