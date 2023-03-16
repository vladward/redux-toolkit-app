import React, { useEffect, useState } from 'react'
import './App.css'
import { TodoList } from './components/TodoList'
import { InputField } from './components/InputField'
import { addNewTodo, fetchTodos } from './store/todoSlice'
import { useAppDispatch, useAppSelector } from './store'

export interface TodoType {
  id: string
  title: string
  completed: boolean
}

function App () {
  const [text, setText] = useState('')
  const { loading, error } = useAppSelector((state) => state.todos)
  const dispatch = useAppDispatch()

  const handleSubmit = () => {
    dispatch(addNewTodo(text))
    setText('')
  }

  useEffect(() => {
    dispatch(fetchTodos(10))
  }, [dispatch])
  return (
    <div className="App">
      <InputField
        text={text}
        handleInput={setText}
        handleSubmit={handleSubmit}
      />

      {loading ? <h2>Loading</h2> : <TodoList />}
      {error && <h2>{error}</h2>}
    </div>
  )
}

export default App
