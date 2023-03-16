import {
  type AnyAction,
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit'
import { type TodoType } from '../App'

export interface InitialState {
  todos: TodoType[]
  status: 'loading' | 'resolved' | 'rejected' | null
  error: string | null
  loading: boolean
}

export const fetchTodos = createAsyncThunk<
TodoType[],
number,
{ rejectValue: string }
>('todos/fetchTodos', async (limit, { rejectWithValue }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
  )

  if (!response.ok) {
    return rejectWithValue('Server error')
  }

  return await response.json()
})

export const deleteTodo = createAsyncThunk<
string,
string,
{ rejectValue: string }
>('todos/deleteTodo', async (id, { rejectWithValue }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: 'DELETE'
    }
  )

  if (!response.ok) {
    return rejectWithValue('Something went wrong when delete todo')
  }

  return id
})

export const toggleStatus = createAsyncThunk<
TodoType,
string,
{ rejectValue: string, state: { todos: InitialState } }
>('todos/toggleStatus', async (id, { rejectWithValue, getState }) => {
  const todo = getState().todos.todos.find((el) => el.id === id)

  if (todo != null) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed })
      }
    )
    if (!response.ok) {
      return rejectWithValue('Something went wrong')
    }

    return (await response.json()) as TodoType
  }
  return rejectWithValue('No such todo ih the list')
})

export const addNewTodo = createAsyncThunk<
TodoType,
string,
{ rejectValue: string }
>('todos/addNewTodo', async (text, { rejectWithValue }) => {
  const todo = {
    title: text,
    userId: 1,
    completed: false
  }
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
  })

  if (!response.ok) {
    return rejectWithValue('Something went wrong when add todo')
  }

  return (await response.json()) as TodoType
})

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: null,
    error: null,
    loading: false
  } as InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload
        state.loading = false
      })
      .addCase(addNewTodo.pending, (state) => {
        state.error = null
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload)
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        const toggledTodo = state.todos.find(
          (el) => el.id === action.payload.id
        )
        if (toggledTodo != null) {
          toggledTodo.completed = !toggledTodo.completed
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((el) => el.id !== action.payload)
      })
      .addMatcher(hasError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.loading = false
      })
  }
})

export const hasError = (action: AnyAction) => {
  return action.type.endsWith('rejected')
}

export default todoSlice.reducer
